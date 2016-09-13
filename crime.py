"""
My initial attempts at handling crime data
"""
import pandas as pd
import numpy as np
import overpass
import geopandas as gpd
import matplotlib.pyplot as plt
import ipdb

df = pd.read_csv('NYPD_7_Major_Felony_Incidents_2010--2016.csv')
# selection by borough and then by sector
df_queens = df[df.Borough.isin(['QUEENS'])]
df_queens_D = df_queens[df_queens.Sector.isin(['D'])]

# Read shape file
gf_nypp = gpd.read_file('nypp_16c')
# select only the precints present in Queen's borough D
gf_nypp_queens_D = gf_nypp[gf_nypp.Precinct.isin(df_queens_D.Precinct.unique())]
gf_nypp_queens_D.plot()
