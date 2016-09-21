-- create columns
ALTER TABLE public.ways ADD COLUMN cost_crime_offense_0 double precision;
COMMENT ON COLUMN public.ways.cost_crime_offense_0 IS 'MURDER & NON-NEGL. MANSLAUGHTE';
-- Add columns
ALTER TABLE public.ways ADD COLUMN cost_crime_offense_1 double precision;
COMMENT ON COLUMN public.ways.cost_crime_offense_1 IS 'FELONY ASSAULT';

ALTER TABLE public.ways ADD COLUMN cost_crime_offense_2 double precision;
COMMENT ON COLUMN public.ways.cost_crime_offense_2 IS 'GRAND LARCENY';

ALTER TABLE public.ways ADD COLUMN cost_crime_offense_3 double precision;
COMMENT ON COLUMN public.ways.cost_crime_offense_3 IS 'ROBBERY';

ALTER TABLE public.ways ADD COLUMN cost_crime_offense_4 double precision;
COMMENT ON COLUMN public.ways.cost_crime_offense_4 IS 'RAPE';

ALTER TABLE public.ways ADD COLUMN cost_crime_offense_5 double precision;
COMMENT ON COLUMN public.ways.cost_crime_offense_5 IS 'GRAND LARCENY OF MOTOR VEHICLE';

ALTER TABLE public.ways ADD COLUMN cost_crime_offense_6 double precision;
COMMENT ON COLUMN public.ways.cost_crime_offense_1 IS 'BURGLARY';