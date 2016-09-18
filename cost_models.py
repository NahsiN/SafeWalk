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
            print('Crime cost for road {0} of {1}'.format(i, num_of_gids))
            precinct_num = df[df.loc[:, 'gid'] == gid].head(1).Precinct.iloc[0]
            # alpha = num of crimes of road / total number of crimes in precinct
            alpha = gid_crime_counts[gid]/df_precinct_crime_counts[precinct_num]
            cost = 1 + alpha
            update_crime_cost0 = """
                                 UPDATE ways SET cost_crime0 = {0} WHERE gid = {1};
                                 """.format(cost, int(gid))
            cur.execute(update_crime_cost0)
            # commit is IMPORTANT TO COMMIT CHANGES
            con.commit()

        # group by the hour
    elif id_model == 1:
        group_by_hour = df.groupby('Occurrence Hour')
        for hour in group_by_hour.indices.keys():
            df_hour = group_by_hour.get_group(hour)
            df_hour_precinct_crime_counts = df_hour.groupby('Precinct').size()
            # group by gid (road id)
            group_gid = df_hour.groupby('gid')
            # number of crimes on each road
            gid_crime_counts = group_gid.size()

            # MAKE SURE ALL SQL FIELDS ARE INITIALIZED TO 1!
            i = 0
            num_of_gids = gid_crime_counts.size
            for gid in gid_crime_counts.index:
                i += 1
                print('Hour {0}: Crime cost for road {1} of {2}'.format(hour, i, num_of_gids))
                precinct_num = df_hour[df_hour.loc[:, 'gid'] == gid].head(1).Precinct.iloc[0]
                # alpha = num of crimes of road / total number of crimes in precinct
                alpha = gid_crime_counts[gid]/df_hour_precinct_crime_counts[precinct_num]
                cost = 1 + alpha
                update_crime_cost = """
                                     UPDATE ways SET cost_crime_hour_{0} = {1} WHERE gid = {2};
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
