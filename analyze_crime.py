"""
Exploratory plots of crime data to justify app design
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

fname = 'data/NYPD_7_Major_Felony_Incidents_2005--2016_with_roads'
print('Initial loading from {0}'.format(fname + '.csv'))
df = pd.read_csv(fname + '.csv')

# plot crime by hour
g_hour = df.groupby('Occurrence Hour')
df_crimes_by_hour = g_hour.size()
df_crimes_by_hour.plot()

# types of crime and by the hour
direct_bodily_harm_offenses = ['ROBBERY', 'FELONY ASSAULT', 'RAPE', 'MURDER & NON-NEGL. MANSLAUGHTE']
indirect_bodily_harm_offenses = ['GRAND LARCENY', 'GRAND LARCENY OF MOTOR VEHICLE', 'BURGLARY']

# group by direct and indirect
group_by_offense = df.groupby('Offense')
# for direct bodily harm create a dataframe
df_direct_bodily_harm = pd.concat([group_by_offense.get_group(offense) for offense in direct_bodily_harm_offenses])
group_by_hour_direct_bodily_harm = df_direct_bodily_harm.groupby('Occurrence Hour')
df_direct_bodily_harm_by_hour = group_by_hour_direct_bodily_harm.size()
df_direct_bodily_harm_by_hour.plot()

df_indirect_bodily_harm = pd.concat([group_by_offense.get_group(offense) for offense in indirect_bodily_harm_offenses])
group_by_hour_indirect_bodily_harm = df_indirect_bodily_harm.groupby('Occurrence Hour')
df_indirect_bodily_harm_by_hour = group_by_hour_indirect_bodily_harm.size()
df_indirect_bodily_harm_by_hour.plot()

# within each group each one
# plot hourly crime for each of two main offense subclasses
plt.figure()
for offense in direct_bodily_harm_offenses:
    df_tmp = df[df.loc[:,'Offense'] == offense]
    df_tmp.groupby('Occurrence Hour').size().plot(logy=True, label=offense, figsize=(19.1, 7.5), fontsize=20, linewidth=2)
    plt.legend()
    plt.xlabel('Occurrence Hour', fontsize=20)
    plt.ylabel('log(Numbers of Crime)', fontsize=20)
    plt.savefig('direct_body_harm.png', bbox_inches='tight')

plt.figure()
for offense in indirect_bodily_harm_offenses:
    df_tmp = df[df.loc[:,'Offense'] == offense]
    df_tmp.groupby('Occurrence Hour').size().plot(logy=True, label=offense)
    plt.legend()

# specific types of crimes
offense = 'ROBBERY'
df_tmp = df[df.loc[:,'Offense'] == offense]
df_tmp.groupby('Occurrence Hour').size().plot(logy=False, label=offense, figsize=(19.1, 7.5), fontsize=20, linewidth=2)
plt.legend()
plt.xlabel('Occurrence Hour', fontsize=20)
plt.ylabel('Numbers', fontsize=20)

offense = 'FELONY ASSAULT'
df_tmp = df[df.loc[:,'Offense'] == offense]
df_tmp.groupby('Occurrence Hour').size().plot(logy=False, label=offense, figsize=(19.1, 7.5), fontsize=20, linewidth=2)
plt.legend()
plt.xlabel('Occurrence Hour', fontsize=20)
plt.ylabel('Numbers', fontsize=20)
plt.savefig('felony_assault.png', bbox_inches='tight')
