from flask import render_template, request
from crime_app import app
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
import pandas as pd
import psycopg2
import folium
import routing

# from a_Model import ModelIt

username = 'nishan' #add your username here (same as previous postgreSQL)
host = 'localhost'
dbname = 'routing_db_crime'
password = 'vikaspuri'
# db = create_engine('postgres://%s%s/%s'%(username,host,dbname))
con = None
con = psycopg2.connect(database=dbname, user=username, password=password)

@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html",
       title = 'Home', user = { 'nickname': 'Miguel' },
       )

@app.route('/map')
def basic_map():
    return render_template("basic_map.html")

@app.route('/db')
def birth_page():
    sql_query = """
                SELECT * FROM birth_data_table WHERE delivery_method='Cesarean';
                """
    query_results = pd.read_sql_query(sql_query,con)
    births = ""
    for i in range(0,10):
        births += query_results.iloc[i]['birth_month']
        births += "<br>"
    return births

@app.route('/db_fancy')
def cesareans_page_fancy():
    sql_query = """
               SELECT index, attendant, birth_month FROM birth_data_table WHERE delivery_method='Cesarean';
                """
    query_results=pd.read_sql_query(sql_query,con)
    births = []
    for i in range(0,query_results.shape[0]):
        births.append(dict(index=query_results.iloc[i]['index'], attendant=query_results.iloc[i]['attendant'], birth_month=query_results.iloc[i]['birth_month']))
    return render_template('cesareans.html',births=births)

@app.route('/input')
def input():
    return render_template("input.html")

@app.route('/output')
def output():
  #pull 'birth_month' from input field and store it
  start_lat_point = float(request.args.get('start_lat_point'))
  start_lon_point = float(request.args.get('start_lon_point'))
  end_lat_point = float(request.args.get('end_lat_point'))
  end_lon_point = float(request.args.get('end_lon_point'))
  hour_of_day = int((request.args.get('hour_of_day')))
  # end_point = request.args.get('end_point')
  print(start_lat_point, start_lon_point, end_lat_point, end_lon_point)
  print(hour_of_day)

  # start_point = (40.7416127, -73.979633)  # 3rd and 28th
  # end_point = (40.739912, -73.9874349)  # lexington and 2nd
  # Routing based on shortest distance
  start_point = (start_lat_point, start_lon_point)
  end_point = (end_lat_point, end_lon_point)
  df_dist = routing.shortest_route(start_point, end_point, con)
  routing_map = folium.Map(location=[start_lat_point, start_lon_point], zoom_start=12,
                  tiles='https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/\{z\}/\{x\}/\{y\}?access_token=pk.eyJ1IjoibmFoc2luIiwiYSI6ImNpdDdwdDV0bzA5dHkyeW13ZTh4enl0c3MifQ.iOW2JTxp_HkABm9wuTuPqA', attr='My Data Attribution')
  routing.render_route(df_dist, con, '/home/nishan/Code/InsightDataScience/my_projects_env/crime/crime_app/templates/min_dist.html', routing_map=routing_map, line_color='blue')
  # Routing based on minimizing crime
  # based on total crime cost
  print('Hi')
  df_crime = routing.shortest_route(start_point, end_point, con, 0)
  print(df_crime)
  # based on hourly crime cost
  # df_crime = routing.shortest_route(start_point, end_point, con, 1, hour=hour_of_day)
  routing.render_route(df_crime, con, '/home/nishan/Code/InsightDataScience/my_projects_env/crime/crime_app/templates/min_crime.html', routing_map=routing_map, line_color='red')

  # print(end_point)
  #just select the Cesareans  from the birth dtabase for the month that the user inputs
  # query = "SELECT index, attendant, birth_month FROM birth_data_table WHERE delivery_method='Cesarean' AND birth_month='%s'" % patient
  # print(query)
  # query_results=pd.read_sql_query(query,con)
  # print(query_results)
  # births = []
  # for i in range(0,query_results.shape[0]):
  #     births.append(dict(index=query_results.iloc[i]['index'], attendant=query_results.iloc[i]['attendant'], birth_month=query_results.iloc[i]['birth_month']))
  #     the_result = ''
  #     return render_template("output.html", births = births, the_result = the_result)
  # the_result = ModelIt(patient,births)
  # return render_template("output.html", births = births, the_result = the_result)
  return render_template("diff_routings.html")

@app.route('/min_dist')
def min_dist():
    return render_template("min_dist.html")

@app.route('/min_crime')
def min_crime():
    return render_template("min_crime.html")
