"""
Create columns in postgres. Here I use it for creating 48 columns
"""

import psycopg2
import sys


dbname = 'routing_db_crime_2'
username = 'nishan'
password = 'vikaspuri'
con = psycopg2.connect(database=dbname, user=username, password=password)
cur = con.cursor()

for offense_class in ['direct_bodily_harm', 'indirect_bodily_harm']:
    for hour in range(0,24):
        alter_query = 'ALTER TABLE ways ADD COLUMN cost_crime_offense_class_{0}_hour_{1} double precision;'.format(offense_class, hour)
        cur.execute(alter_query)
        con.commit()
        update_query = 'UPDATE ways SET cost_crime_offense_class_{0}_hour_{1} = 0;'.format(offense_class, hour)
        cur.execute(update_query)
        con.commit()
