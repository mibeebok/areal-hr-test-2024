--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Ubuntu 17.0-1.pgdg24.04+1)
-- Dumped by pg_dump version 17.0 (Ubuntu 17.0-1.pgdg24.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: avtorization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.avtorization (
    id integer NOT NULL,
    login character varying(50) NOT NULL,
    password character varying(10) NOT NULL
);


ALTER TABLE public.avtorization OWNER TO postgres;

--
-- Name: avtorization_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.avtorization_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.avtorization_id_seq OWNER TO postgres;

--
-- Name: avtorization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.avtorization_id_seq OWNED BY public.avtorization.id;


--
-- Name: departmnts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departmnts (
    id integer NOT NULL,
    idorganization integer NOT NULL,
    parent integer NOT NULL,
    name character varying(50),
    comment character varying(100)
);


ALTER TABLE public.departmnts OWNER TO postgres;

--
-- Name: departmnts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departmnts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departmnts_id_seq OWNER TO postgres;

--
-- Name: departmnts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departmnts_id_seq OWNED BY public.departmnts.id;


--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    surname character varying(100) NOT NULL,
    name character varying(50) NOT NULL,
    patronymic character varying(100) NOT NULL,
    dateofbirth date NOT NULL,
    idpassportdata integer NOT NULL,
    idregistrationadress integer NOT NULL,
    idscan integer NOT NULL
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employees_id_seq OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- Name: files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.files (
    id integer NOT NULL,
    name character varying(10) NOT NULL,
    file character varying(100) NOT NULL
);


ALTER TABLE public.files OWNER TO postgres;

--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.files_id_seq OWNER TO postgres;

--
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;


--
-- Name: historyofchange; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historyofchange (
    id integer NOT NULL,
    dateandtimeoftheoperation time with time zone NOT NULL,
    whochangedit integer NOT NULL,
    theobjectofoperation integer,
    changedfields json NOT NULL
);


ALTER TABLE public.historyofchange OWNER TO postgres;

--
-- Name: historyofchange_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historyofchange_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historyofchange_id_seq OWNER TO postgres;

--
-- Name: historyofchange_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historyofchange_id_seq OWNED BY public.historyofchange.id;


--
-- Name: organizations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizations (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    comment character varying(100)
);


ALTER TABLE public.organizations OWNER TO postgres;

--
-- Name: organizations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.organizations_id_seq OWNER TO postgres;

--
-- Name: organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organizations_id_seq OWNED BY public.organizations.id;


--
-- Name: pasportdata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pasportdata (
    id integer NOT NULL,
    series integer NOT NULL,
    nubmer integer NOT NULL,
    dateofissue date NOT NULL,
    unitcode integer NOT NULL,
    issuedbywhom character varying(50) NOT NULL
);


ALTER TABLE public.pasportdata OWNER TO postgres;

--
-- Name: pasportdata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pasportdata_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pasportdata_id_seq OWNER TO postgres;

--
-- Name: pasportdata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pasportdata_id_seq OWNED BY public.pasportdata.id;


--
-- Name: personneloperation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personneloperation (
    id integer NOT NULL,
    idemployee integer NOT NULL,
    iddepartment integer NOT NULL,
    idposition integer NOT NULL,
    settingthesalary integer NOT NULL,
    salarychange integer NOT NULL,
    dismissalfromwork boolean
);


ALTER TABLE public.personneloperation OWNER TO postgres;

--
-- Name: personneloperation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.personneloperation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personneloperation_id_seq OWNER TO postgres;

--
-- Name: personneloperation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.personneloperation_id_seq OWNED BY public.personneloperation.id;


--
-- Name: positions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.positions (
    id integer NOT NULL,
    name character varying(100)
);


ALTER TABLE public.positions OWNER TO postgres;

--
-- Name: positions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.positions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.positions_id_seq OWNER TO postgres;

--
-- Name: positions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.positions_id_seq OWNED BY public.positions.id;


--
-- Name: registrationadres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.registrationadres (
    id integer NOT NULL,
    region character varying(50) NOT NULL,
    locality character varying(50) NOT NULL,
    street character varying(50) NOT NULL,
    house character varying(10) NOT NULL,
    building character varying(10),
    apartment integer NOT NULL
);


ALTER TABLE public.registrationadres OWNER TO postgres;

--
-- Name: registrationadres_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.registrationadres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.registrationadres_id_seq OWNER TO postgres;

--
-- Name: registrationadres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.registrationadres_id_seq OWNED BY public.registrationadres.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id integer NOT NULL,
    role character varying(20) NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_id_seq OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: specialist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.specialist (
    id integer NOT NULL,
    surname character varying(50) NOT NULL,
    name character varying(50) NOT NULL,
    patronymic character varying(50) NOT NULL,
    idavtorization integer NOT NULL,
    idrole integer NOT NULL
);


ALTER TABLE public.specialist OWNER TO postgres;

--
-- Name: specialist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.specialist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.specialist_id_seq OWNER TO postgres;

--
-- Name: specialist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.specialist_id_seq OWNED BY public.specialist.id;


--
-- Name: avtorization id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.avtorization ALTER COLUMN id SET DEFAULT nextval('public.avtorization_id_seq'::regclass);


--
-- Name: departmnts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departmnts ALTER COLUMN id SET DEFAULT nextval('public.departmnts_id_seq'::regclass);


--
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- Name: files id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- Name: historyofchange id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historyofchange ALTER COLUMN id SET DEFAULT nextval('public.historyofchange_id_seq'::regclass);


--
-- Name: organizations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);


--
-- Name: pasportdata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pasportdata ALTER COLUMN id SET DEFAULT nextval('public.pasportdata_id_seq'::regclass);


--
-- Name: personneloperation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personneloperation ALTER COLUMN id SET DEFAULT nextval('public.personneloperation_id_seq'::regclass);


--
-- Name: positions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions ALTER COLUMN id SET DEFAULT nextval('public.positions_id_seq'::regclass);


--
-- Name: registrationadres id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registrationadres ALTER COLUMN id SET DEFAULT nextval('public.registrationadres_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: specialist id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specialist ALTER COLUMN id SET DEFAULT nextval('public.specialist_id_seq'::regclass);


--
-- Data for Name: avtorization; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.avtorization (id, login, password) FROM stdin;
\.


--
-- Data for Name: departmnts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departmnts (id, idorganization, parent, name, comment) FROM stdin;
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, surname, name, patronymic, dateofbirth, idpassportdata, idregistrationadress, idscan) FROM stdin;
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.files (id, name, file) FROM stdin;
\.


--
-- Data for Name: historyofchange; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historyofchange (id, dateandtimeoftheoperation, whochangedit, theobjectofoperation, changedfields) FROM stdin;
\.


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organizations (id, name, comment) FROM stdin;
\.


--
-- Data for Name: pasportdata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pasportdata (id, series, nubmer, dateofissue, unitcode, issuedbywhom) FROM stdin;
\.


--
-- Data for Name: personneloperation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personneloperation (id, idemployee, iddepartment, idposition, settingthesalary, salarychange, dismissalfromwork) FROM stdin;
\.


--
-- Data for Name: positions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.positions (id, name) FROM stdin;
\.


--
-- Data for Name: registrationadres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.registrationadres (id, region, locality, street, house, building, apartment) FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, role) FROM stdin;
\.


--
-- Data for Name: specialist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.specialist (id, surname, name, patronymic, idavtorization, idrole) FROM stdin;
\.


--
-- Name: avtorization_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.avtorization_id_seq', 1, false);


--
-- Name: departmnts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departmnts_id_seq', 1, false);


--
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 1, false);


--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.files_id_seq', 1, false);


--
-- Name: historyofchange_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historyofchange_id_seq', 1, false);


--
-- Name: organizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organizations_id_seq', 1, false);


--
-- Name: pasportdata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pasportdata_id_seq', 1, false);


--
-- Name: personneloperation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.personneloperation_id_seq', 1, false);


--
-- Name: positions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.positions_id_seq', 1, false);


--
-- Name: registrationadres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.registrationadres_id_seq', 1, false);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 1, false);


--
-- Name: specialist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.specialist_id_seq', 1, false);


--
-- Name: avtorization avtorization_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.avtorization
    ADD CONSTRAINT avtorization_pkey PRIMARY KEY (id);


--
-- Name: departmnts departmnts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departmnts
    ADD CONSTRAINT departmnts_pkey PRIMARY KEY (id);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- Name: historyofchange historyofchange_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historyofchange
    ADD CONSTRAINT historyofchange_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: pasportdata pasportdata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pasportdata
    ADD CONSTRAINT pasportdata_pkey PRIMARY KEY (id);


--
-- Name: personneloperation personneloperation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personneloperation
    ADD CONSTRAINT personneloperation_pkey PRIMARY KEY (id);


--
-- Name: positions positions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (id);


--
-- Name: registrationadres registrationadres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registrationadres
    ADD CONSTRAINT registrationadres_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: specialist specialist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specialist
    ADD CONSTRAINT specialist_pkey PRIMARY KEY (id);


--
-- Name: employees fk_adress; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT fk_adress FOREIGN KEY (idregistrationadress) REFERENCES public.registrationadres(id);


--
-- Name: personneloperation fk_iddep; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personneloperation
    ADD CONSTRAINT fk_iddep FOREIGN KEY (iddepartment) REFERENCES public.departmnts(id);


--
-- Name: personneloperation fk_idemployee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personneloperation
    ADD CONSTRAINT fk_idemployee FOREIGN KEY (idemployee) REFERENCES public.employees(id);


--
-- Name: employees fk_idfiles; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT fk_idfiles FOREIGN KEY (idscan) REFERENCES public.files(id);


--
-- Name: departmnts fk_idorganization; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departmnts
    ADD CONSTRAINT fk_idorganization FOREIGN KEY (idorganization) REFERENCES public.organizations(id);


--
-- Name: employees fk_idpassportdata; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT fk_idpassportdata FOREIGN KEY (idpassportdata) REFERENCES public.pasportdata(id);


--
-- Name: historyofchange fk_o; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historyofchange
    ADD CONSTRAINT fk_o FOREIGN KEY (theobjectofoperation) REFERENCES public.personneloperation(id);


--
-- Name: departmnts fk_parent; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departmnts
    ADD CONSTRAINT fk_parent FOREIGN KEY (parent) REFERENCES public.departmnts(id);


--
-- Name: personneloperation fk_pos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personneloperation
    ADD CONSTRAINT fk_pos FOREIGN KEY (idposition) REFERENCES public.positions(id);


--
-- Name: specialist fk_role; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specialist
    ADD CONSTRAINT fk_role FOREIGN KEY (idrole) REFERENCES public.role(id);


--
-- Name: specialist fk_spec; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specialist
    ADD CONSTRAINT fk_spec FOREIGN KEY (idavtorization) REFERENCES public.avtorization(id);


--
-- Name: historyofchange fk_who; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historyofchange
    ADD CONSTRAINT fk_who FOREIGN KEY (whochangedit) REFERENCES public.specialist(id);


--
-- PostgreSQL database dump complete
--

