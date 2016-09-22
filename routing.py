"""
Assuming data has been parsed, start routing based on cost_models
"""

import pandas as pd
import numpy as np
import overpass
import geopandas as gpd
import matplotlib.pyplot as plt
import psycopg2
import folium
import json
import ipdb


# Basic routing given two lat/long points using shortest distance
start_point = (40.7416127, -73.979633)  # 3rd and 28th
end_point = (40.739912, -73.9874349)  # lexington and 2nd

def shortest_route(start_point, end_point, con, model=None, hour=None, personal_bias=None,
                    crime_types=None):
    """
    Given start and end points, get shortest route based on minimum distance

    model : None or 0

    Returns
    -------
    df : dataframe with shortest route info
    """

    lat_start = start_point[0]
    lon_start = start_point[1]
    lat_end = end_point[0]
    lon_end = end_point[1]
    cur = con.cursor()

    # con = psycopg2.connect(database='routing_db_crime', user='nishan', password='vikaspuri')
    # cur = con.cursor()
    if model is None:
        query = """
                SELECT * FROM pgr_dijkstra(
                -- sql edges
                'SELECT gid AS id, source, target, length_m AS cost
                            FROM ways',
                -- source
                (SELECT id FROM ways_vertices_pgr
                        ORDER BY the_geom <-> ST_SetSRID(ST_Point({0}, {1}),4326) LIMIT 1),
                -- target
                (SELECT id FROM ways_vertices_pgr
            	    ORDER BY the_geom <-> ST_SetSRID(ST_Point({2}, {3}),4326) LIMIT 1),
                        directed := false);
                """.format(lon_start, lat_start, lon_end, lat_end)

    elif model == 0:
        # ((1+beta)*alpha)*d
        # 'SELECT gid AS id, source, target, cost_crime0*length_m AS cost
        #             FROM ways',
        if personal_bias is None:
            raise AssertionError('Please specify a personal_bias between 0 and 1')
        # Example points
        # start_point = (40.7416127, -73.979633)  # 3rd and 28th
        # end_point = (40.739912, -73.9874349)  # lexington and 2nd
        cost_prefactor = '(1 + (1 + {0})*cost_crime0)'.format(personal_bias)
        query = """
                SELECT * FROM pgr_dijkstra(
                -- sql edges
                'SELECT gid AS id, source, target, {0}*length_m AS cost
                            FROM ways',
                -- source
                (SELECT id FROM ways_vertices_pgr
                        ORDER BY the_geom <-> ST_SetSRID(ST_Point({1}, {2}),4326) LIMIT 1),
                -- target
                (SELECT id FROM ways_vertices_pgr
            	    ORDER BY the_geom <-> ST_SetSRID(ST_Point({3}, {4}),4326) LIMIT 1),
                        directed := false);
                """.format(cost_prefactor, lon_start, lat_start, lon_end, lat_end)

    elif model == 1:
        if hour is None:
            raise AssertionError('hour field cannot be None')
        if personal_bias is None:
            raise AssertionError('Please specify a personal_bias between 0 and 1')
        # Example points
        # start_point = (40.7416127, -73.979633)  # 3rd and 28th
        # end_point = (40.739912, -73.9874349)  # lexington and 2nd
        cost_prefactor = '(1 + (1 + {0})*cost_crime_hour_{1})'.format(personal_bias, hour)
        query = """
                SELECT * FROM pgr_dijkstra(
                -- sql edges
                'SELECT gid AS id, source, target, {0}*length_m AS cost
                            FROM ways',
                -- source
                (SELECT id FROM ways_vertices_pgr
                        ORDER BY the_geom <-> ST_SetSRID(ST_Point({1}, {2}),4326) LIMIT 1),
                -- target
                (SELECT id FROM ways_vertices_pgr
            	    ORDER BY the_geom <-> ST_SetSRID(ST_Point({3}, {4}),4326) LIMIT 1),
                        directed := false);
                """.format(cost_prefactor, lon_start, lat_start, lon_end, lat_end)

    # group by type of crime
    elif model == 2:
        if personal_bias is None:
            raise AssertionError('Please specify a basic personal_bias between 0 and 1')

        # building cost function string. It's ugly but it gets the job done
        # cost_prefactor = '(1 + (1 + {0})*cost_crime0)'.format(personal_bias)
        cost_prefactor = '(1 + {0})*cost_crime0 '.format(personal_bias)
        # crime_types is a dictionary crime_types={'rape': 0.9} where 0.9 is the bias
        for crime in crime_types.keys():
            bias = crime_types[crime]
            cost_prefactor += '+ (1 + {0})*cost_crime_offense_{1} '.format(bias, crime)
            # cost_prefactor = '(1 + (1 + {0})*cost_crime0)'.format(personal_bias)
        cost_prefactor = '(1 + ' + cost_prefactor + ')'

        query = """
                SELECT * FROM pgr_dijkstra(
                -- sql edges
                'SELECT gid AS id, source, target, {0}*length_m AS cost
                            FROM ways',
                -- source
                (SELECT id FROM ways_vertices_pgr
                        ORDER BY the_geom <-> ST_SetSRID(ST_Point({1}, {2}),4326) LIMIT 1),
                -- target
                (SELECT id FROM ways_vertices_pgr
            	    ORDER BY the_geom <-> ST_SetSRID(ST_Point({3}, {4}),4326) LIMIT 1),
                        directed := false);
                """.format(cost_prefactor, lon_start, lat_start, lon_end, lat_end)
    else:
        raise AssertionError('Invalid model specified')

    # cur.execute(query)
    # out = cur.fetchall()
    df = pd.read_sql_query(query, con)
    return df

def prob_of_crime_on_route(df, con, model=None):
    """
    Given dataframe of route, return probablity of crime on that route given
    the crime statistics
    """

    prob_crime_type = {'grand_larceny': 1, 'robbery': 1, 'grand_larceny_of_motor_vehicle': 1,
                        'felony_assault': 1, 'rape': 1, 'burglary': 1, 'murder_and_manslaughter': 1}

    cur = con.cursor()
    if model is None or model == 0 or model == 2:
        # Deterine probability of crime on route
        # loop through gids
        prob_total_crime = 1
        for gid in df.edge[0:-1]:
            query = """SELECT cost_crime0 FROM ways WHERE gid={0}""".format(gid)
            cur.execute(query)
            out = cur.fetchone()
            # (1 - out[0]) is probablity of crime NOT happening on road
            prob_total_crime *= (1 - out[0])

            for offense in prob_crime_type.keys():
                query = 'SELECT cost_crime_offense_{0} FROM ways WHERE gid={1}'.format(offense, gid)
                cur.execute(query)
                out = cur.fetchone()
                prob_crime_type[offense] *= (1 - out[0])
            # print(out[0])
        prob_total_crime = 1 - prob_total_crime
        # print('Probablity of total crime on route {0}'.format(prob_total_crime))
        for offense in prob_crime_type.keys():
            prob_crime_type[offense] = 1 - prob_crime_type[offense]
            # print('Probablity of {0} on route {1}'.format(offense, prob_crime_type[offense]))

    return (prob_total_crime, prob_crime_type)

def render_route(df, con, fname, routing_map=None, line_color='blue'):
    """
    Given a route's dataframe, use folium to render it
    con : connection to database
    fname : filename to save html file
    """

    cur = con.cursor()
    start_node = int(df.loc[0, 'node'])
    query = """SELECT lon, lat FROM ways_vertices_pgr WHERE id = {0};""".format(start_node)
    tmp_df = pd.read_sql_query(query, con)

    # Insight office (40.7438973, -73.9909419)
    # routing_map = folium.Map(location=[tmp_df.loc[0, 'lat'], tmp_df.loc[0, 'lon']], zoom_start=15)
    # routing_map = folium.Map(location=[tmp_df.loc[0, 'lat'], tmp_df.loc[0, 'lon']], zoom_start=15,
    #                 tiles='https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/\{z\}/\{x\}/\{y\}?access_token=pk.eyJ1IjoibmFoc2luIiwiYSI6ImNpdDdwdDV0bzA5dHkyeW13ZTh4enl0c3MifQ.iOW2JTxp_HkABm9wuTuPqA', attr='My Data Attribution')
    folium.Marker([tmp_df.loc[0, 'lat'], tmp_df.loc[0, 'lon']], popup='Start', icon=folium.Icon(color='red')).add_to(routing_map)

    # Get lat, long points for each edge except last one because last edge = -1
    for edge in df.edge[0:-1]:
        query = 'SELECT ST_AsGeoJSON(the_geom) FROM ways WHERE gid = {0};'.format(edge)
        df_geojson = pd.read_sql_query(query, con)
        # Output list of (long, lat) tuples [[], [], [], etc.]
        lat_long_points = json.loads(df_geojson.loc[0, 'st_asgeojson'])['coordinates']
        # reverse (long, lat) to (lat, long)
        for point in lat_long_points:
            point.reverse()
        # print(ways_lat_long_points)
        folium.PolyLine(lat_long_points, color=line_color).add_to(routing_map)

    end_node = int(df.loc[df.index[-1], 'node'])
    query = """SELECT lon, lat FROM ways_vertices_pgr WHERE id = {0};""".format(end_node)
    tmp_df = pd.read_sql_query(query, con)
    folium.Marker([tmp_df.loc[0, 'lat'], tmp_df.loc[0, 'lon']], popup='End', icon=folium.Icon(color='green')).add_to(routing_map)

    routing_map.save(fname)
