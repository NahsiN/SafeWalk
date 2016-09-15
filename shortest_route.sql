﻿-- Shortest path queries
--select ST_SetSRID(ST_Point(40.74396, -73.99085),4326);
-- Given two lat/long points, find route
-- Insight office (40.7438973, -73.9909419)
SELECT id FROM ways_vertices_pgr
            ORDER BY the_geom <-> ST_SetSRID(ST_Point(-73.9909419, 40.7438973),4326) LIMIT 10; 
-- 23rd PATH station (40.7428446, -73.9927628)
--SELECT id FROM ways_vertices_pgr
  --          ORDER BY the_geom <-> ST_SetSRID(ST_Point(-73.9927628, 40.7428446),4326) LIMIT 1; 

-- Shortest route
SELECT * FROM pgr_dijkstra('
    SELECT gid AS id,
         source,
         target,
         length AS cost
        FROM ways',
    -- source    
    (SELECT id FROM ways_vertices_pgr
            ORDER BY the_geom <-> ST_SetSRID(ST_Point(-73.9909419, 40.7438973),4326) LIMIT 1),
    -- target
    (SELECT id FROM ways_vertices_pgr
	    ORDER BY the_geom <-> ST_SetSRID(ST_Point(-73.9927628, 40.7428446),4326) LIMIT 1), 
            directed := false);


