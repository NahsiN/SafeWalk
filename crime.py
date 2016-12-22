"""
My initial attempts at handling crime data
"""

import pandas as pd
import numpy as np
import overpass
import geopandas as gpd
import matplotlib.pyplot as plt
from ast import literal_eval as make_tuple
import psycopg2
import ipdb
import sys
import cost_models
import sys

dbname = 'routing_db_crime_2'
username = 'nishan'
password = '*****'
con = psycopg2.connect(database=dbname, user=username, password=password)

def associate_roads_with_crime(fname, con):
    # STEP 1
    # Initial load in of the NYC open data set
    # fname = 'data/NYPD_7_Major_Felony_Incidents_2005--2016'
    # fname = 'data/NYPD_7_Major_Felony_Incidents_2010--2016'
    print('Initial loading from {0}'.format(fname + '.csv'))
    df = pd.read_csv(fname + '.csv')


    # The dataframe needs a gid column to associate with what road the crime
    # occured on
    # Use the lat,long to identify the geom id

    # con = psycopg2.connect(database=dbname, user=username, password=password)
    # create new column for gid which is unique for each road
    cur = con.cursor()
    num_crimes = df.shape[0]
    df['gid'] = np.zeros((num_crimes))
    # for i in range(0, 10):
    for i in range(0, num_crimes):
        # Reference http://stackoverflow.com/questions/9763116/parse-a-tuple-from-a-string
        (latitude, longitude) = make_tuple(df['Location 1'][i])
        # SQL queries to populate gid column taken from crime_to_ways.sql
        # sql_query = """
        #         SELECT gid FROM ways
        #         ORDER BY the_geom <-> ST_SetSRID(ST_Point({0}, {1}),4326) LIMIT 1;
        #         """.format(longitude, latitude)

        sql_query = """
        WITH closest_candidates AS (
        SELECT gid, the_geom,
                ST_Distance(the_geom, ST_SetSRID(ST_Point({0}, {1}),4326)) AS distance
        FROM ways
        ORDER BY the_geom <-> ST_SetSRID(ST_Point({0}, {1}),4326)
        LIMIT 100
                                    )
        SELECT gid
        FROM closest_candidates
        ORDER BY ST_Distance(the_geom, ST_SetSRID(ST_Point({0}, {1}),4326))
        LIMIT 1;""".format(longitude, latitude)
        cur.execute(sql_query)
        out = cur.fetchone()
        if len(out) == 0:
            raise AssertionError('Crime does not have a road associated with it {0}'.format(i+1))
        print('Road {0} associated with crime {1} of {2}'.format(out, i+1, num_crimes))
        # df.loc[i, 'gid'] = int(pd.read_sql_query(sql_query, con).loc[0])
        df.loc[i, 'gid'] = out[0]

    # con.close()
    fname_roads = fname + '_with_roads'
    print('Writing out to {0}'.format(fname_roads + '.csv'))
    df.to_csv( fname_roads + '.csv')

# STEP 2
# Add cost models to routing database
fname = 'data/NYPD_7_Major_Felony_Incidents_2005--2016_with_roads'
print('Initial loading from {0}'.format(fname + '.csv'))
df = pd.read_csv(fname + '.csv')
sys.exit()
cost_models.update_crime_cost_model(df, 0, con)
cost_models.update_crime_cost_model(df, 1, con)

# Dataframe queries
# selection by borough and then by sector
# df_queens = df[df.Borough.isin(['QUEENS'])]
# df_queens_D = df_queens[df_queens.Sector.isin(['D'])]

# returns the size of each group in this case total number of crimes in each precinct
df_precinct_crime_counts = df.groupby('Precinct').size()

# group by gid (road id)
group_gid = df.groupby('gid')
# number of crimes on each road
gid_crime_counts = group_gid.size()

for gid in gid_crime_counts.index:
    precinct_num = df[df.loc[:, 'gid'] == gid].head(1).Precinct.iloc[0]
    print(gid_crime_counts[gid]/df_precinct_crime_counts[precinct_num])

# Read shape file
# gf_nypp = gpd.read_file('nypp_16c')
# # select only the precints present in Queen's borough D
# gf_nypp_queens_D = gf_nypp[gf_nypp.Precinct.isin(df_queens_D.Precinct.unique())]
# gf_nypp_queens_D.plot()
