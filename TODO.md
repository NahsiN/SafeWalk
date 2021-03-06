Organized in descending chronological order. So the top entries are the latest
fixes to the code.

- [x] add one more test point

- [ ] validation framework
- [ ] **FIX**: hour = -1 and crime type is vigilant. Need to add two more
      columns to the database
- [x] fix last value on scale. Now says extreme
- [x] for now display error page is hour=-1

- [x] create new youtube demo
- [x] add error page for invalid lat/long
- [x] plot D/D_0 vs β to see effect of personal bias on two different routes

- [x] add javascript code for: on map click fill out lat/long forms
- [x] add how to instructions including video
- [x] route page shows how much longer the safer path is

- [x] **HUGE OPTIMIZATION IN ROUTING. 100X SPEEDUP.** select a subset of the table
      and then using routing on that small table. The speed up is crazy
- [x] slight visual changes to app      

- [x] in heat_map.py create a function that plots some cost on roads over some  
      area
- [x] prototype sql queries particulary one that shortest the compute time by at least
      20x times

- [x] store route in templates/tmp directory. a uuid is assigned to each route.
      Clean occasionally
- [x] add a run-time arguement to run.py to specify home directory to store
      routes.html Needed for porting code to server
- [x] add analyze.py for generating exploratory plots of crime data

- [x] add slideshare iframe to main page

- [x] change search radius to 5km since average walking speed is 5 km/h. not
      much change in performance
- [x] fix prob of crime on route when hour=-1 is selected on form

- [x] Crime type --> two buttons on Crime avoidance level
- [x] Bias --> personal fear of crime. Adjustable slider 1-->5, bias is squared:1-->25.
- [x] tweaked webpages

- [x] compute elapsed time in routing
- [x] BUG FIX: routing.py:95 A bracket in cost_prefactor was OUT of place. Run times
      slashed from 40s to 10s.
- [x] if crime_types=0 i.e. "all" but hour is specified, take that hour into account when minimzing crime.
      Previously it wasn't taking the hour into account.
- [x] add in ALL + direct_bodily_harm + indirect_bodily_harm in crime_type form.
      How useless is this? Is it not a form of personal bias?

- [x] modify diff_routings.html to be landing page after clicking route
- [x] add in two clustered crime categories by hour, direct_bodily_harm and indirect_bodily_harm
- [x] add new entries to SQL database for these new crime classes by the hour
- [x] add route_distance in routing to calculate distance of route
- [x] add prob of crime and offense_class on hourly basis. model=2
- [x] speed up pgr_dijkstra using bounding box around starting lat/lon point

- [x] initial implementation of probablity of crimes including type on route
- [x] update id_model_1 taking into account hour and personal bias for all crimes
- [x] update id_model 2 which takes into crime type and associated personal bias
- [x] filter out data with bad precinct values
- [x] update slightly crime_cost0
- [x] use new dataset 2005-2016 crimes. 10 years worth
- [x] in crime.associate_roads_with_crime(), update the knn model to identify
      nearst road to lat/long point. Now this is a safe update. I verified
      that the previous model was sane. It was working
      fine before but looking at http://workshops.boundlessgeo.com/postgis-intro/knn.html
      I decided to play it safe and tweak it slightly.
- [x] cost column only stores alpha
- [x] add type of crime cost_models
- [x] do basic kde fitting to precinct crime data
- [x] add time of day drop down box
- [x] use mapbox tiles in routing.py instead of osm
- [x] added hourly cost model to cost_models.py in previous commit
- [x] emped mapbox map on front page with lat/long inputs
- [x] flask frontend to select start and end points
- [x] update crime_cost_model0 with (1 + alpha) value
- [x] routing works with crime_cost0
