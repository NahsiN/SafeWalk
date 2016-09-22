--start_point = (40.7416127, -73.979633)  # 3rd and 28th
--end_point = (40.739912, -73.9874349)  # lexington and 2nd

SELECT * FROM pgr_dijkstra(
                -- sql edges
                'SELECT gid AS id, source, target, (1 + (1 + 1)*cost_crime0)*length_m AS cost
                            FROM ways',
                -- source
                (SELECT id FROM ways_vertices_pgr
                        ORDER BY the_geom <-> ST_SetSRID(ST_Point(-73.979633, 40.7416127),4326) LIMIT 1),
                -- target
                (SELECT id FROM ways_vertices_pgr
            	    ORDER BY the_geom <-> ST_SetSRID(ST_Point(-73.9874349, 40.739912),4326) LIMIT 1),
                        directed := false);