#!/usr/bin/env python3
from crime_app import app
import sys
# app.run(debug = True)
app.run(host='0.0.0.0', port=5000, debug = True)
