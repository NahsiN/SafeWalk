"""
Analyze the effects of the parameters in my cost model on routes
"""

import pandas as pd
import numpy as np
import psycopg2
import ipdb
import sys
import cost_models
import sys
import routing
import matplotlib.pyplot as plt

dbname = 'routing_db_crime_2'
username = 'nishan'
password = 'vikaspuri'
con = psycopg2.connect(database=dbname, user=username, password=password)

# -------------------------------------------- #
start_point = (40.799338, -73.911992)
end_point = (40.813744, -73.918784)
hour_of_day = 2
crime_type = 1
# personal_bias = 1
# -------------------------------------------- #

# look at effect of personal_bias factor
num_betas = 100
min_crime_distances = np.zeros(num_betas)
betas = np.arange(1, num_betas+1, 1)

df_dist = routing.shortest_route(start_point, end_point, con)
shortest_dist = routing.route_distance(df_dist, con)

for i in range(0, num_betas):
    personal_bias = i + 1
    print(personal_bias)
    if crime_type == 0:
        if hour_of_day == -1:
            df_crime = routing.shortest_route(start_point, end_point, con, model=0, hour=None, personal_bias=personal_bias, crime_types=None)
        elif hour_of_day != -1:
            df_crime = routing.shortest_route(start_point, end_point, con, model=1, hour=hour_of_day, personal_bias=personal_bias, crime_types=None)

    elif crime_type == 1:
        if hour_of_day == -1:
            pass
        elif hour_of_day != -1:
            df_crime = routing.shortest_route(start_point, end_point, con, model=1, hour=hour_of_day, personal_bias=personal_bias, crime_types=['direct_bodily_harm'])

    min_crime_dist = routing.route_distance(df_crime, con)
    min_crime_distances[i] = min_crime_dist
con.close()

plt.figure()
plt.plot(betas, min_crime_distances/shortest_dist, linewidth=2)
plt.xlabel(r'$\beta$', fontsize=20)
plt.ylabel(r'$D/D_0$', fontsize=20)
plt.title('Port Morris Route', fontsize=20)
plt.tick_params(labelsize=20)
plt.savefig('portmorris_beta.png', bbox_inches='tight')
plt.show()
