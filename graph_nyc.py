"""
Using road data of NYC into a map to get shortest path between 2 points
"""

import networkx as nx
import numpy as np
import pandas as pd
import json
import smopy
import matplotlib.pyplot as plt
import matplotlib as mpl
import json
import ipdb

# load road map data
# all_roads = nx.read_shp('data/nyc_imposm/new-york_new-york_osm_roads.shp')
# all_roads = nx.read_shp('data/nyc_osm2pgsql/new-york_new-york_osm_line.shp')
all_roads = nx.read_shp('data/tl_2016_36061_roads_New_York_County/tl_2016_36061_roads.shp').to_undirected()

# select largest connected subgraph of the data. assume this corresponds
# to a network of roads all connected. Some disconnected roads are excluded
roads_connected = max(nx.connected_component_subgraphs(all_roads), key=len)
roads_nodes_labelled = nx.convert_node_labels_to_integers(roads_connected)

# Adding lat,long labels to nodes with more than 1 neighbour
deg_dict = nx.degree(roads_nodes_labelled)
nodes_deg_gt_1 = [key for key in deg_dict if deg_dict[key] > 1]
# The above nodes can should have a unique lat/long point associated with them

# my attempt for getting OSM data to work
# for node in range(714,720):
# for node in nodes_deg_gt_1:
#     print(node)
#     lat_long_list = []
#     for nbr_node in roads_nodes_labelled[node]:
#         coords = json.loads(roads_nodes_labelled[node][nbr_node]['Json'])['coordinates']
#         for lat_long in coords:
#             lat_long_list.append((lat_long[0], lat_long[1]))
#     # print(lat_long_list)
#     # find duplicate lat long
#     lat_long = set()
#     for ll in lat_long_list:
#         # if lat_long_list.count(ll) > 1:
#         if lat_long_list.count(ll) > deg_dict[node]-1:
#             lat_long.add(ll)
#     print(lat_long)
#     if len(lat_long) == 0 or len(lat_long) > 1:
#         raise AssertionError('Why is this true?')


        # if len() == 1:
            # print(set(lat_long_list))
        # print(json.loads(roads_nodes_labelled[node][nbr_node]['Json'])['coordinates'])





# Given (lat, long) start and end points, give shortest walking path for
# user
pos0 = (36.6026, -121.9026)
pos1 = (34.0569, -118.2427)

def get_path(n0, n1):
    """If n0 and n1 are connected nodes in the graph, this function
    return an array of point coordinates along the road linking
    these two nodes."""
    return np.array(json.loads(sg[n0][n1]['Json'])['coordinates'])
