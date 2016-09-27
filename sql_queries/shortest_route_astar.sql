-- Shortest path queries

-- Given two lat/long points, find route
-- Insight office (40.7438973, -73.9909419)
-- 23rd PATH station (40.7428446, -73.9927628)
--SELECT id FROM ways_vertices_pgr
  --          ORDER BY the_geom <-> ST_SetSRID(ST_Point(-73.9927628, 40.7428446),4326) LIMIT 1; 

-- Geometry example - units in meters (SRID: 2163 US National Atlas Equal area) (least accurate)

-- Shortest route
SELECT seq, id1 AS node, id2 AS edge, cost FROM pgr_astar('
    SELECT gid::integer AS id,
         source::integer,
         target::integer,
         length::double precision AS cost,
         x1, y1, x2, y2
        FROM ways',
    44612, 292693, false, false);