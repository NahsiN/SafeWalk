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
(lat_start, lon_start) = (40.7416127, -73.979633)  # 3rd and 28th
(lat_end, lon_end) = (40.739912, -73.9874349)  # lexington and 2nd

def shortest_distance_route(start_point, end_point):
    """
    Given start and end points, get shortest route based on minimum distance
    """

    lat_start = start_point[0]
    lon_start = start_point[1]
    lat_end = end_point[0]
    lon_end = end_point[1]

    con = psycopg2.connect(database='routing_db_crime', user='nishan', password='vikaspuri')
    cur = con.cursor()
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
    # cur.execute(query)
    # out = cur.fetchall()
    df = pd.read_sql_query(query, con)
    return df

def minmizie_crimes_per_unit_length_route():
    """
    By using '1D' density of crimes = total_number_of_crimes / length_of_road,
    find shortest route that minimizes 
    """

    pass

def render_route(df, con):
    """
    Given a route's dataframe, use folium to render it
    con : connection to database
    """

    cur = con.cursor()
    ipdb.set_trace()
    start_node = int(df.loc[0, 'node'])
    query = """SELECT lon, lat FROM ways_vertices_pgr WHERE id = {0};""".format(start_node)
    tmp_df = pd.read_sql_query(query, con)

    routing_map = folium.Map(location=[tmp_df.loc[0, 'lat'], tmp_df.loc[0, 'lon']], zoom_start=15)
    folium.Marker([tmp_df.loc[0, 'lat'], tmp_df.loc[0, 'lon']], popup='Start').add_to(routing_map)

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
        folium.PolyLine(lat_long_points).add_to(routing_map)

    end_node = int(df.loc[df.index[-1], 'node'])
    query = """SELECT lon, lat FROM ways_vertices_pgr WHERE id = {0};""".format(end_node)
    tmp_df = pd.read_sql_query(query, con)
    folium.Marker([tmp_df.loc[0, 'lat'], tmp_df.loc[0, 'lon']], popup='End').add_to(routing_map)

    routing_map.save('test.html')
