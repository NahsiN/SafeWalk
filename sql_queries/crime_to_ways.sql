-- Build identifying crime (lat,long) with ways
-- (40.6748871770001, -73.999507546) in brooklyn
SELECT gid FROM ways
            ORDER BY the_geom <-> ST_SetSRID(ST_Point(-73.999507546, 40.6748871770001),4326) LIMIT 1;

