"""
Overlay crime costs on roads
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
import json
import matplotlib as mpl
import folium

dbname = 'routing_db_crime_2'
username = 'nishan'
password = 'vikaspuri'
con = psycopg2.connect(database=dbname, user=username, password=password)



# Given lat, long point extract nearest roads
# values I tried 0.05: HUGE, 0.03
# brooklyn points (40.687179, -73.947494)
query = """
        SELECT *, ST_AsGeoJSON(the_geom) AS geojson_geometry FROM ways WHERE
	       ST_DWithin(the_geom, ST_GeomFromText('POINT(-73.947494 40.687179)', 4326), 0.03)
        """
df = pd.read_sql(query, con)

# color lines
# sm = mpl.cm.ScalarMappable(norm=mpl.colors.Normalize(vmin=df.cost_crime0.min(), vmax=df.cost_crime0.max()), cmap=mpl.cm.jet)
# sys.exit()
def road_crime_heat_map(df, col, percentile='75%', fname='heat_map.html'):
    """
    Describe here

    df : dataframe contaning all the relevan info. look at query above
    col : column of crime you are interested in
    """
    # col = 'cost_crime_hour_1'
    # sm = mpl.cm.ScalarMappable(norm=mpl.colors.Normalize(vmin=df.cost_crime0.min(), vmax=df.cost_crime0.describe(), cmap=mpl.cm.jet))
    # describe = df.cost_crime0.describe()
    # describe = df[col].describe()
    describe = df[col].describe(percentiles=[0.7, 0.75, 0.8, 0.85, 0.9, 0.95])
    cmap = mpl.cm.RdYlGn_r
    # cmap = mpl.cm.YlOrRd
    # cmap = mpl.cm.Reds
    # color values above the 75% percentile the same color
    # mpl.cm.jet
    sm = mpl.cm.ScalarMappable(norm=mpl.colors.Normalize(vmin=df[col].min(), vmax=describe[percentile]), cmap=cmap)

    hex_color = mpl.colors.rgb2hex(sm.to_rgba(0.0008))

    # brooklyn points
    # Brooklyn Gates Av
    # Start: (40.687179, -73.947494)
    # End: (40.681159, -73.928783)
    mymap = folium.Map(location=[40.687179, -73.947494], tiles='https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/\{z\}/\{x\}/\{y\}?access_token=pk.eyJ1IjoibmFoc2luIiwiYSI6ImNpdDdwdDV0bzA5dHkyeW13ZTh4enl0c3MifQ.iOW2JTxp_HkABm9wuTuPqA', attr='My Data Attribution')
    folium.Marker([40.687179, -73.947494], popup='Start', icon=folium.Icon(color='red')).add_to(mymap)
    folium.Marker([40.681159, -73.928783], popup='End', icon=folium.Icon(color='green')).add_to(mymap)

    # For each line in df, colour the mymap road differently
    for i in range(0, df.shape[0]):
        print(i)
        coords= json.loads(df.geojson_geometry[i])['coordinates']
        # cost = df.cost_crime0[i]
        cost = df[col][i]
        cost_hex_color =  mpl.colors.rgb2hex(sm.to_rgba(cost))
        folium.PolyLine(coords, color=cost_hex_color, weight=8, opacity=0.6, latlon=False).add_to(mymap)

    mymap.save(fname)


# Convert output to a geojson file
# This was NOT useful because folium does not automatically colour lines
# geojson = {'type':'FeatureCollection', 'features':[]}
# for _, row in df.iterrows():
#     feature = {'type':'Feature',
#                 'id': {},
#                'properties':{'name': {}},
#                'geometry':{}}
#     feature['id'] = row['gid']
#     feature['properties']['name'] = row['name']
#     feature['geometry'] = json.loads(row['geojson_geometry'])
#     geojson['features'].append(feature)
# f = open('roads.json', 'w')
# json.dump(geojson, f, indent=2)
# f.close()
