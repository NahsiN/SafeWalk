import pandas as pd
import numpy as np
import overpass
import geopandas as gpd
import matplotlib.pyplot as plt
import psycopg2
import ipdb

def update_crime_cost_model(df, id_model):
    """
    Updates the table with a cost model for crime

    Inputs
    ------
    df :
    id_model :
    """

    con = psycopg2.connect(database='routing_db_crime', user='nishan', password='vikaspuri')
    cur = con.cursor()
    num_crimes = df.shape[0]

    if id_model == 0:
        # MAKE SURE THE COSTS ARE INITIALIZED TO 0!
        for i in range(0, num_crimes):
            # need to check that every crime has associated with a gid value
            if df.loc[i, 'gid'] != 0:
                # basic cost model
                cost = 1
                print('Crime {0} of {1}'.format(i+1, num_crimes))
                print('Updating crime cost database for road {0}'.format(int(df.loc[i, 'gid'])))
                update_crime_cost0 = """
                                     UPDATE ways SET cost_crime0 = cost_crime0 + {0} WHERE gid = {1};
                                     """.format(cost, int(df.loc[i, 'gid']))
                cur.execute(update_crime_cost0)
                # commit is IMPORTANT TO COMMIT CHANGES
                con.commit()
            else:
                print('Crime has no road associated with it. Index={0}'.df.index[i])
        # con.close()
