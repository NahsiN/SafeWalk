-- show geom object associtated with long,lat point
select ST_SetSRID(ST_Point(-73.99085, 40.74396),4326);

-- Uses k-nearest neighbour to find vertices closet
-- to given (lon, lat) point
SELECT id FROM ways_vertices_pgr
            ORDER BY the_geom <-> ST_SetSRID(ST_Point(-73.9909419, 40.7438973),4326) LIMIT 10; 

-- Testing
SELECT lon, lat FROM ways_vertices_pgr WHERE id = 1;

SELECT ST_AsGeoJSON(the_geom) FROM ways WHERE gid = 75673;

