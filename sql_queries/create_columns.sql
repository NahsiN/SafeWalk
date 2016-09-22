-- create columns
--ALTER TABLE ways ADD COLUMN cost_crime0 double precision;
--COMMENT ON COLUMN public.ways.cost_crime0 IS 'Total number of crimes on road/total number of crimes in precinct'; 


ALTER TABLE public.ways ADD COLUMN cost_crime_offense_grand_larceny double precision;
COMMENT ON COLUMN public.ways.cost_crime_offense_grand_larceny IS 'GRAND LARCENY';

ALTER TABLE ways ADD COLUMN cost_crime_offense_robbery double precision;
COMMENT ON COLUMN public.ways.cost_crime_offense_robbery IS 'ROBBERY';

ALTER TABLE public.ways ADD COLUMN cost_crime_offense_grand_larceny_of_motor_vehicle double precision;
COMMENT ON COLUMN public.ways.cost_crime_offense_grand_larceny_of_motor_vehicle IS 'GRAND LARCENY OF MOTOR VEHICLE';

ALTER TABLE public.ways ADD COLUMN cost_crime_offense_felony_assault double precision;
COMMENT ON COLUMN public.ways.cost_crime_offense_felony_assault IS 'FELONY ASSAULT';

ALTER TABLE public.ways ADD COLUMN cost_crime_offense_rape double precision;
COMMENT ON COLUMN public.ways.cost_crime_offense_rape IS 'RAPE';

ALTER TABLE public.ways ADD COLUMN cost_crime_offense_burglary double precision;
COMMENT ON COLUMN public.ways.cost_crime_offense_burglary IS 'BURGLARY';

ALTER TABLE public.ways ADD COLUMN cost_crime_offense_murder_and_manslaughter double precision;
COMMENT ON COLUMN public.ways.cost_crime_offense_murder_and_manslaughter IS 'MURDER & NON-NEGL. MANSLAUGHTE';