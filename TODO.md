- [ ] validation framework
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
