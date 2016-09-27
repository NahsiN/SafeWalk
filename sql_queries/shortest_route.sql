-- Shortest path queries

-- Given two lat/long points, find route
-- Insight office (40.7438973, -73.9909419)
-- 23rd PATH station (40.7428446, -73.9927628)
--SELECT id FROM ways_vertices_pgr
  --          ORDER BY the_geom <-> ST_SetSRID(ST_Point(-73.9927628, 40.7428446),4326) LIMIT 1; 

-- Geometry example - units in meters (SRID: 2163 US National Atlas Equal area) (least accurate)

-- Shortest route
SELECT * FROM pgr_dijkstra(
    -- edges	
    'SELECT gid AS id,
         source,
         target,
         (1 + cost_crime0)*length_m AS cost
        FROM ways WHERE the_geom && ST_Expand(ST_SetSRID(ST_Point(-73.9909419, 40.7438973),4326), 2000)',
    -- source    
    (SELECT id FROM ways_vertices_pgr
            ORDER BY the_geom <-> ST_SetSRID(ST_Point(-73.9909419, 40.7438973),4326) LIMIT 1),
    -- target
    (SELECT id FROM ways_vertices_pgr
	    ORDER BY the_geom <-> ST_SetSRID(ST_Point(-73.9927628, 40.7428446),4326) LIMIT 1), 
            directed := false);



