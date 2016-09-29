-- (40.687179, -73.947494)
-- gid, length_m, name, the_geom
--SELECT * FROM ways
--	WHERE ST_Distance_Sphere(the_geom, ST_MakePoint(-73.947494, 40.687179)) <= 5

--SELECT gid, length_m, name, the_geom, ST_AsGeoJSON(the_geom) AS geojson_geometry FROM ways WHERE
--	ST_DWithin(the_geom, ST_GeomFromText('POINT(-73.947494 40.687179)',4326), 0.05)
SELECT gid, length_m, name, the_geom, ST_AsGeoJSON(the_geom) AS geojson_geometry, cost_crime_hour_1 FROM ways WHERE
	ST_DWithin(the_geom, ST_GeomFromText('POINT(-73.947494 40.687179)',4326), 0.03)