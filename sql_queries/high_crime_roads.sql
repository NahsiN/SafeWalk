SELECT gid, length_m, name, x1, y1, x2, y2, cost_crime0, cost_crime_hour_0, cost_crime_hour_1, cost_crime_hour_2, cost_crime_hour_3,
  cost_crime_offense_class_direct_bodily_harm_hour_0, cost_crime_offense_class_direct_bodily_harm_hour_1, 
  cost_crime_offense_class_direct_bodily_harm_hour_2, cost_crime_offense_class_direct_bodily_harm_hour_3 
  FROM ways WHERE cost_crime0 > 0.01 ORDER BY cost_crime0 DESC LIMIT 50 
--SELECT MAX(cost_crime0) FROM ways;
-- gid, length_m, x1, y1, x2, y2, cost_crime0,