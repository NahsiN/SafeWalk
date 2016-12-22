"""
Routing using pgrouting
"""

from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
import psycopg2
import pandas as pd

dbname = 'routing_db'
username = 'nishan'
password = '*****'

# engine = create_engine('postgres://%s:%s@localhost/%s'%(username,password,dbname))
# print(engine.url)


con = None
con = psycopg2.connect(database=dbname, user=username, password=password)

sql_query = """
select * from ways limit 1;
"""

df = pd.read_sql_query(sql_query, con)
