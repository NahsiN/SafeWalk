import pandas as pd
import numpy as np
import overpass
import geopandas as gpd
import matplotlib.pyplot as plt
import psycopg2
import ipdb

def update_crime_cost_model(df, id_model, con):
    """
    Updates the table with a cost model for crime

    Inputs
    ------
    df :
    id_model : 0, (1 + α)d
               1, (1 + α)d by the hour

    con : database connection
    """

    # con = psycopg2.connect(database='routing_db_crime', user='nishan', password='vikaspuri')
    cur = con.cursor()
    num_crimes = df.shape[0]

    # all major crime stat
    if id_model == 0:
        # returns the size of each group in this case denoting the total number of crimes in each precinct
        df_precinct_crime_counts = df.groupby('Precinct').size()

        # group by gid (road id)
        group_gid = df.groupby('gid')
        # number of crimes on each road
        gid_crime_counts = group_gid.size()

        # MAKE SURE ALL SQL FIELDS ARE INITIALIZED TO 1!
        i = 0
        num_of_gids = gid_crime_counts.size
        for gid in gid_crime_counts.index:
            i += 1
            # determine precinct the crime belongs to
            precinct_num = df[df.loc[:, 'gid'] == gid].head(1).Precinct.iloc[0]
            # alpha = num of crimes of road / total number of crimes in precinct
            alpha = gid_crime_counts[gid]/df_precinct_crime_counts[precinct_num]
            print('Precinct number {0}, road id {1}: {2} of {3}'.format(precinct_num, gid, i, num_of_gids))
            # print('Crime cost {0}'.format(alpha))
            # cost = 1 + alpha
            cost = alpha
            # Don't bother with crime that is not categorized with a valid precinct
            if not np.isnan(precinct_num):
                update_crime_cost0 = """
                                     UPDATE ways SET cost_crime0 = {0} WHERE gid = {1};
                                     """.format(cost, int(gid))
                cur.execute(update_crime_cost0)
                # commit is IMPORTANT TO COMMIT CHANGES
                con.commit()

    # group all crimes by the hour
    elif id_model == 1:
        group_by_hour = df.groupby('Occurrence Hour')
        for hour in group_by_hour.indices.keys():
            df_hour = group_by_hour.get_group(hour)
            df_hour_precinct_crime_counts = df_hour.groupby('Precinct').size()
            # group by gid (road id)
            group_gid = df_hour.groupby('gid')
            # number of crimes on each road
            gid_crime_counts = group_gid.size()

            # MAKE SURE ALL SQL FIELDS ARE INITIALIZED TO 0!
            i = 0
            num_of_gids = gid_crime_counts.size
            for gid in gid_crime_counts.index:
                i += 1
                print('Hour {0}: Crime cost for road {1} of {2}'.format(hour, i, num_of_gids))
                precinct_num = df_hour[df_hour.loc[:, 'gid'] == gid].head(1).Precinct.iloc[0]
                # alpha = num of crimes of road / total number of crimes in precinct
                alpha = gid_crime_counts[gid]/df_hour_precinct_crime_counts[precinct_num]
                # print('Crime cost {0}'.format(alpha))
                # cost = 1 + alpha
                cost = alpha
                if not np.isnan(precinct_num):
                    update_crime_cost = """
                                         UPDATE ways SET cost_crime_hour_{0} = {1} WHERE gid = {2};
                                         """.format(hour, cost, int(gid))
                cur.execute(update_crime_cost)
                # commit is IMPORTANT TO COMMIT CHANGES
                con.commit()

    # group crimes by offense type
    elif id_model == 2:
        group_by_offense = df.groupby('Offense')
        # i = 0
        # for offense in group_by_offense.indices.keys():
        #     print('id={0}, Offense={1}'.format(i, offense))
        #     i += 1

        for offense in group_by_offense.indices.keys():
            df_offense = group_by_offense.get_group(offense)
            df_offense_precinct_crime_counts = df_offense.groupby('Precinct').size()
            group_gid = df_offense.groupby('gid')
            gid_crime_counts = group_gid.size()
            num_of_gids = gid_crime_counts.size
            # NEED IF ELSE SATATEMENT
            if offense == 'GRAND LARCENY':
                col_id = 'grand_larceny'
            elif offense == 'ROBBERY':
                col_id = 'robbery'
            elif offense == 'GRAND LARCENY OF MOTOR VEHICLE':
                col_id = 'grand_larceny_of_motor_vehicle'
            elif offense == 'FELONY ASSAULT':
                col_id = 'felony_assault'
            elif offense == 'RAPE':
                col_id = 'rape'
            elif offense == 'BURGLARY':
                col_id = 'burglary'
            elif col_id == 'MURDER & NON-NEGL. MANSLAUGHTE':
                col_id = 'murder_and_manslaughter'
            # MAKE SURE ALL SQL FIELDS ARE INITIALIZED TO 1! OR 0?
            i = 0
            for gid in gid_crime_counts.index:
                print('Offense {0}:{1}. Crime cost for road {2} of {3}'.format(i, offense, i+1, num_of_gids))
                precinct_num = df_offense[df_offense.loc[:, 'gid'] == gid].head(1).Precinct.iloc[0]
                # alpha = num of crimes of road / total number of crimes in precinct
                alpha = gid_crime_counts[gid]/df_offense_precinct_crime_counts[precinct_num]
                # cost = 1 + alpha
                # print('Crime cost {0}'.format(alpha))
                cost = alpha
                if not np.isnan(precinct_num):
                    update_crime_cost = """
                                         UPDATE ways SET cost_crime_offense_{0} = {1} WHERE gid = {2};
                                         """.format(col_id, cost, int(gid))
                cur.execute(update_crime_cost)
                i += 1
                # commit is IMPORTANT TO COMMIT CHANGES
                con.commit()

    # group crimes by one of two types (`direct` bodily harm/indirect bodily harm) and hour
    elif id_model == 3:
        direct_bodily_harm_offenses = ['ROBBERY', 'FELONY ASSAULT', 'RAPE', 'MURDER & NON-NEGL. MANSLAUGHTE']
        indirect_bodily_harm_offenses = ['GRAND LARCENY', 'GRAND LARCENY OF MOTOR VEHICLE', 'BURGLARY']

        group_by_offense = df.groupby('Offense')
        # for direct bodily harm create a dataframe
        df_direct_bodily_harm = pd.concat([group_by_offense.get_group(offense) for offense in direct_bodily_harm_offenses])
        group_by_hour_direct_bodily_harm = df_direct_bodily_harm.groupby('Occurrence Hour')

        df_indirect_bodily_harm = pd.concat([group_by_offense.get_group(offense) for offense in indirect_bodily_harm_offenses])
        group_by_hour_indirect_bodily_harm = df_indirect_bodily_harm.groupby('Occurrence Hour')

        for hour in group_by_hour_direct_bodily_harm.indices.keys():
            df_hour_direct_bodily_harm = group_by_hour_direct_bodily_harm.get_group(hour)
            df_hour_indirect_bodily_harm = group_by_hour_indirect_bodily_harm.get_group(hour)

            df_hour_direct_bodily_harm_precinct_crime_counts = df_hour_direct_bodily_harm.groupby('Precinct').size()

            # group by gid (road id)
            group_gid_direct_bodily_harm = df_hour_direct_bodily_harm.groupby('gid')
            # number of crimes on each road
            gid_crime_counts_direct_bodily_harm = group_gid_direct_bodily_harm.size()

            # Loop over roads with direct and indirect bodily harm
            i = 0
            num_of_gids_direct_bodily_harm = gid_crime_counts_direct_bodily_harm.size
            for gid in gid_crime_counts_direct_bodily_harm.index:
                i += 1
                print('Hour {0}: Direct bodily harm. Crime cost for road {1} of {2}'.format(hour, i, num_of_gids_direct_bodily_harm))

                precinct_num = df_hour_direct_bodily_harm[df_hour_direct_bodily_harm.loc[:, 'gid'] == gid].head(1).Precinct.iloc[0]
                # alpha = num of crimes of road / total number of crimes in precinct
                alpha = gid_crime_counts_direct_bodily_harm[gid]/df_hour_direct_bodily_harm_precinct_crime_counts[precinct_num]
                # print('Crime cost {0}'.format(alpha))
                # cost = 1 + alpha
                cost = alpha
                if not np.isnan(precinct_num):
                    update_crime_cost = """
                                         UPDATE ways SET cost_crime_offense_class_direct_bodily_harm_hour_{0} = {1} WHERE gid = {2};
                                         """.format(hour, cost, int(gid))
                cur.execute(update_crime_cost)
                # commit is IMPORTANT TO COMMIT CHANGES
                con.commit()

            df_hour_indirect_bodily_harm_precinct_crime_counts = df_hour_indirect_bodily_harm.groupby('Precinct').size()
            # group by gid (road id)
            group_gid_indirect_bodily_harm = df_hour_indirect_bodily_harm.groupby('gid')
            # number of crimes on each road
            gid_crime_counts_indirect_bodily_harm = group_gid_indirect_bodily_harm.size()

            i = 0
            num_of_gids_indirect_bodily_harm = gid_crime_counts_indirect_bodily_harm.size
            for gid in gid_crime_counts_indirect_bodily_harm.index:
                i += 1
                print('Hour {0}: Indirect bodily harm. Crime cost for road {1} of {2}'.format(hour, i, num_of_gids_indirect_bodily_harm))
                precinct_num = df_hour_indirect_bodily_harm[df_hour_indirect_bodily_harm.loc[:, 'gid'] == gid].head(1).Precinct.iloc[0]
                # alpha = num of crimes of road / total number of crimes in precinct
                alpha = gid_crime_counts_indirect_bodily_harm[gid]/df_hour_indirect_bodily_harm_precinct_crime_counts[precinct_num]
                # print('Crime cost {0}'.format(alpha))
                # cost = 1 + alpha
                cost = alpha
                if not np.isnan(precinct_num):
                    update_crime_cost = """
                                         UPDATE ways SET cost_crime_offense_class_indirect_bodily_harm_hour_{0} = {1} WHERE gid = {2};
                                         """.format(hour, cost, int(gid))
                cur.execute(update_crime_cost)
                # commit is IMPORTANT TO COMMIT CHANGES
                con.commit()

        # # MAKE SURE THE COSTS ARE INITIALIZED TO 0!
        # for i in range(0, num_crimes):
        #     # need to check that every crime has associated with a gid value
        #     if df.loc[i, 'gid'] != 0:
        #         # basic cost model
        #         cost = 1
        #         print('Crime {0} of {1}'.format(i+1, num_crimes))
        #         print('Updating crime cost database for road {0}'.format(int(df.loc[i, 'gid'])))
        #         update_crime_cost0 = """
        #                              UPDATE ways SET cost_crime0 = cost_crime0 + {0} WHERE gid = {1};
        #                              """.format(cost, int(df.loc[i, 'gid']))
        #         cur.execute(update_crime_cost0)
        #         # commit is IMPORTANT TO COMMIT CHANGES
        #         con.commit()
        #     else:
        #         print('Crime has no road associated with it. Index={0}'.df.index[i])
        # con.close()
