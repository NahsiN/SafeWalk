-- DROP TABLE IF EXISTS public.ways_tmp;
CREATE TEMP TABLE ways_tmp2 ON COMMIT DROP AS SELECT * FROM ways WHERE
	ST_DWithin(the_geom, ST_GeomFromText('POINT(-73.9909419 40.7438973)',4326), 0.05);

SELECT * FROM pgr_dijkstra(
    -- edges	
    'SELECT gid AS id,
         source,
         target,
         (1 + cost_crime0)*length_m AS cost
        FROM ways_tmp2',
    -- source    
    (SELECT id FROM ways_vertices_pgr
            ORDER BY the_geom <-> ST_SetSRID(ST_Point(-73.9909419, 40.7438973),4326) LIMIT 1),
    -- target
    (SELECT id FROM ways_vertices_pgr
	    ORDER BY the_geom <-> ST_SetSRID(ST_Point(-73.9927628, 40.7428446),4326) LIMIT 1), 
            directed := false);