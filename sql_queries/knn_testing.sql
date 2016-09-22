SELECT gid, ST_Distance(the_geom, ST_SetSRID(ST_Point(-73.954778757, 40.7073461800001),4326)) AS distance 
	FROM ways ORDER BY the_geom <-> ST_SetSRID(ST_Point(-73.954778757, 40.7073461800001),4326) LIMIT 100;
--SELECT ways.gid FROM ways, ways_vertices_pgr LIMIT 10;

-- "Closest" 100 streets to Broad Street station are?
