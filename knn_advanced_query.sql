WITH closest_candidates AS (
  SELECT
    gid, the_geom,
    ST_Distance(the_geom, ST_SetSRID(ST_Point(-73.954778757, 40.7073461800001),4326)) AS distance
  FROM
    ways
  ORDER BY
    the_geom <->
    ST_SetSRID(ST_Point(-73.954778757, 40.7073461800001),4326)
  LIMIT 100
)
SELECT gid
FROM closest_candidates
ORDER BY
  ST_Distance(the_geom, ST_SetSRID(ST_Point(-73.954778757, 40.7073461800001),4326))
LIMIT 1;