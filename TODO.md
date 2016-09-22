Sep. 15
- [ ] validation framework
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
