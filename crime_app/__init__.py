from flask import Flask
import sys

app = Flask(__name__)
# path where to save routes.html
#app.path = sys.argv[1]
#----------------------#
app.path='/home/ubuntu/'
#---------------------#
# print(app.path)
from crime_app import views
