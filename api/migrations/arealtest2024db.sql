--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-11-07 16:03:15

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
-- TOC entry 220 (class 1259 OID 16395)
-- Name: Administrator; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Administrator" (
    "IdAdministrator" integer NOT NULL,
    "LastName" character varying(100) NOT NULL,
    "Name" character varying(100) NOT NULL,
    "Patronymic" character varying(100) NOT NULL,
    "IdAvtorization" integer NOT NULL
);


ALTER TABLE public."Administrator" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16394)
-- Name: Administrator_IdAdministrator_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Administrator" ALTER COLUMN "IdAdministrator" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Administrator_IdAdministrator_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16389)
-- Name: Avtorization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Avtorization" (
    "IdAvtorization" integer NOT NULL,
    "Login" character varying(100) NOT NULL,
    "Password" character varying(8) NOT NULL
);


ALTER TABLE public."Avtorization" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16388)
-- Name: Avtorization_IdAvtorization_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Avtorization" ALTER COLUMN "IdAvtorization" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Avtorization_IdAvtorization_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 16442)
-- Name: Departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Departments" (
    "IdDeparment" integer NOT NULL,
    "IdOrganization" integer NOT NULL,
    "Parent" integer NOT NULL,
    "Name" character varying(100) NOT NULL,
    "Comment" character varying(255) NOT NULL
);


ALTER TABLE public."Departments" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16441)
-- Name: Departments_IdDeparment_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Departments" ALTER COLUMN "IdDeparment" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Departments_IdDeparment_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 232 (class 1259 OID 16482)
-- Name: Employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Employees" (
    "IdEmployees" integer NOT NULL,
    "LarstName" character varying(100) NOT NULL,
    "Name" character varying(100) NOT NULL,
    "Patronymic" character varying(100) NOT NULL,
    "DateOfBirth" time with time zone NOT NULL,
    "IdPassportData" integer NOT NULL,
    "IdRegistrationAdress" integer NOT NULL,
    "IdScan" integer NOT NULL
);


ALTER TABLE public."Employees" OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16481)
-- Name: Employees_IdEmployees_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Employees" ALTER COLUMN "IdEmployees" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Employees_IdEmployees_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 238 (class 1259 OID 16510)
-- Name: Files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Files" (
    "IdFale" integer NOT NULL,
    "Name" character varying NOT NULL,
    "File" character varying NOT NULL
);


ALTER TABLE public."Files" OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16509)
-- Name: Files_IdFale_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Files" ALTER COLUMN "IdFale" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Files_IdFale_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 16405)
-- Name: HRSpecialist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HRSpecialist" (
    "IdHRSpecialist" integer NOT NULL,
    "LastName" character varying(100) NOT NULL,
    "Name" character varying(100) NOT NULL,
    "Patronymic" character varying(100) NOT NULL,
    "IdAvtorization" integer NOT NULL
);


ALTER TABLE public."HRSpecialist" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16415)
-- Name: HitoryOfChange; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HitoryOfChange" (
    "IdHistoryOfChange" integer NOT NULL,
    "DateAndTimeOfTheOperation" time with time zone NOT NULL,
    "WhoChangedIt" integer NOT NULL,
    "TheObjectOfOperation" "char",
    "ChangedFields" character varying(100) NOT NULL
);


ALTER TABLE public."HitoryOfChange" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16459)
-- Name: Organizations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Organizations" (
    "IdOrganization" integer NOT NULL,
    "Name" character varying NOT NULL,
    "Comment" character varying NOT NULL
);


ALTER TABLE public."Organizations" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16458)
-- Name: Organizations_IdOrganization_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Organizations" ALTER COLUMN "IdOrganization" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Organizations_IdOrganization_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 234 (class 1259 OID 16493)
-- Name: PassportData; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PassportData" (
    "IdPassportData" integer NOT NULL,
    "Series" integer NOT NULL,
    "Number" integer NOT NULL,
    "DateOfIssue" date NOT NULL,
    "UnitCode" integer NOT NULL,
    "IsseadByWhom" character varying(100) NOT NULL
);


ALTER TABLE public."PassportData" OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16492)
-- Name: PassportData_IdPassportData_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."PassportData" ALTER COLUMN "IdPassportData" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."PassportData_IdPassportData_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 16428)
-- Name: PersonnelOperations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PersonnelOperations" (
    "IdPersonnelOperation" integer NOT NULL,
    "IdEmployees" integer NOT NULL,
    "IdDepartment" integer NOT NULL,
    "IdPosition" integer NOT NULL,
    "SettingTheSalary" integer NOT NULL,
    "SalaryChange" integer NOT NULL,
    "DepartmentChange" character varying(100) NOT NULL,
    "DimissalFromWork" boolean NOT NULL
);


ALTER TABLE public."PersonnelOperations" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16453)
-- Name: Positions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Positions" (
    "IdPosition" integer NOT NULL,
    "Name" character varying(100) NOT NULL
);


ALTER TABLE public."Positions" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16452)
-- Name: Positions_IdPosition_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Positions" ALTER COLUMN "IdPosition" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Positions_IdPosition_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 236 (class 1259 OID 16504)
-- Name: RegistrationAdress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RegistrationAdress" (
    "IdRegistrationAdress" integer NOT NULL,
    "Region" character varying(100) NOT NULL,
    "Locality" character varying(100) NOT NULL,
    "Street" character varying(100) NOT NULL,
    "House" character varying(20) NOT NULL,
    "Building" integer NOT NULL,
    "Apartment" integer NOT NULL
);


ALTER TABLE public."RegistrationAdress" OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16503)
-- Name: RegistrationAdress_IdRegistrationAdress_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."RegistrationAdress" ALTER COLUMN "IdRegistrationAdress" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."RegistrationAdress_IdRegistrationAdress_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 16433)
-- Name: TheObjectOfOperation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TheObjectOfOperation" (
    "Organization" integer NOT NULL,
    "Department" integer NOT NULL,
    "Position" integer NOT NULL,
    "Employees" integer NOT NULL,
    "PersonnelOperation" integer NOT NULL
);


ALTER TABLE public."TheObjectOfOperation" OWNER TO postgres;

--
-- TOC entry 4881 (class 0 OID 16395)
-- Dependencies: 220
-- Data for Name: Administrator; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4879 (class 0 OID 16389)
-- Dependencies: 218
-- Data for Name: Avtorization; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4887 (class 0 OID 16442)
-- Dependencies: 226
-- Data for Name: Departments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4893 (class 0 OID 16482)
-- Dependencies: 232
-- Data for Name: Employees; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4899 (class 0 OID 16510)
-- Dependencies: 238
-- Data for Name: Files; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4882 (class 0 OID 16405)
-- Dependencies: 221
-- Data for Name: HRSpecialist; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4883 (class 0 OID 16415)
-- Dependencies: 222
-- Data for Name: HitoryOfChange; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4891 (class 0 OID 16459)
-- Dependencies: 230
-- Data for Name: Organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4895 (class 0 OID 16493)
-- Dependencies: 234
-- Data for Name: PassportData; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4884 (class 0 OID 16428)
-- Dependencies: 223
-- Data for Name: PersonnelOperations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4889 (class 0 OID 16453)
-- Dependencies: 228
-- Data for Name: Positions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4897 (class 0 OID 16504)
-- Dependencies: 236
-- Data for Name: RegistrationAdress; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4885 (class 0 OID 16433)
-- Dependencies: 224
-- Data for Name: TheObjectOfOperation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 219
-- Name: Administrator_IdAdministrator_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Administrator_IdAdministrator_seq"', 1, false);


--
-- TOC entry 4906 (class 0 OID 0)
-- Dependencies: 217
-- Name: Avtorization_IdAvtorization_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Avtorization_IdAvtorization_seq"', 1, false);


--
-- TOC entry 4907 (class 0 OID 0)
-- Dependencies: 225
-- Name: Departments_IdDeparment_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Departments_IdDeparment_seq"', 1, false);


--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 231
-- Name: Employees_IdEmployees_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Employees_IdEmployees_seq"', 1, false);


--
-- TOC entry 4909 (class 0 OID 0)
-- Dependencies: 237
-- Name: Files_IdFale_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Files_IdFale_seq"', 1, false);


--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 229
-- Name: Organizations_IdOrganization_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Organizations_IdOrganization_seq"', 1, false);


--
-- TOC entry 4911 (class 0 OID 0)
-- Dependencies: 233
-- Name: PassportData_IdPassportData_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PassportData_IdPassportData_seq"', 1, false);


--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 227
-- Name: Positions_IdPosition_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Positions_IdPosition_seq"', 1, false);


--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 235
-- Name: RegistrationAdress_IdRegistrationAdress_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RegistrationAdress_IdRegistrationAdress_seq"', 1, false);


--
-- TOC entry 4700 (class 2606 OID 16399)
-- Name: Administrator Administrator_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Administrator"
    ADD CONSTRAINT "Administrator_pkey" PRIMARY KEY ("IdAdministrator");


--
-- TOC entry 4698 (class 2606 OID 16393)
-- Name: Avtorization Avtorization_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Avtorization"
    ADD CONSTRAINT "Avtorization_pkey" PRIMARY KEY ("IdAvtorization");


--
-- TOC entry 4708 (class 2606 OID 16446)
-- Name: Departments Departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Departments"
    ADD CONSTRAINT "Departments_pkey" PRIMARY KEY ("IdDeparment");


--
-- TOC entry 4714 (class 2606 OID 16486)
-- Name: Employees Employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employees"
    ADD CONSTRAINT "Employees_pkey" PRIMARY KEY ("IdEmployees");


--
-- TOC entry 4720 (class 2606 OID 16516)
-- Name: Files Files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Files"
    ADD CONSTRAINT "Files_pkey" PRIMARY KEY ("IdFale");


--
-- TOC entry 4702 (class 2606 OID 16409)
-- Name: HRSpecialist HRSpecialist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HRSpecialist"
    ADD CONSTRAINT "HRSpecialist_pkey" PRIMARY KEY ("IdHRSpecialist");


--
-- TOC entry 4704 (class 2606 OID 16419)
-- Name: HitoryOfChange HitoryOfChange_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HitoryOfChange"
    ADD CONSTRAINT "HitoryOfChange_pkey" PRIMARY KEY ("IdHistoryOfChange");


--
-- TOC entry 4712 (class 2606 OID 16465)
-- Name: Organizations Organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Organizations"
    ADD CONSTRAINT "Organizations_pkey" PRIMARY KEY ("IdOrganization");


--
-- TOC entry 4716 (class 2606 OID 16497)
-- Name: PassportData PassportData_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PassportData"
    ADD CONSTRAINT "PassportData_pkey" PRIMARY KEY ("IdPassportData");


--
-- TOC entry 4706 (class 2606 OID 16432)
-- Name: PersonnelOperations PersonnelOperations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonnelOperations"
    ADD CONSTRAINT "PersonnelOperations_pkey" PRIMARY KEY ("IdPersonnelOperation");


--
-- TOC entry 4710 (class 2606 OID 16457)
-- Name: Positions Positions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Positions"
    ADD CONSTRAINT "Positions_pkey" PRIMARY KEY ("IdPosition");


--
-- TOC entry 4718 (class 2606 OID 16508)
-- Name: RegistrationAdress RegistrationAdress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RegistrationAdress"
    ADD CONSTRAINT "RegistrationAdress_pkey" PRIMARY KEY ("IdRegistrationAdress");


--
-- TOC entry 4727 (class 2606 OID 16436)
-- Name: TheObjectOfOperation ome to many; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TheObjectOfOperation"
    ADD CONSTRAINT "ome to many" FOREIGN KEY ("PersonnelOperation") REFERENCES public."PersonnelOperations"("IdPersonnelOperation");


--
-- TOC entry 4723 (class 2606 OID 16420)
-- Name: HitoryOfChange one to many; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HitoryOfChange"
    ADD CONSTRAINT "one to many" FOREIGN KEY ("WhoChangedIt") REFERENCES public."HRSpecialist"("IdHRSpecialist");


--
-- TOC entry 4724 (class 2606 OID 16447)
-- Name: PersonnelOperations one to many; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonnelOperations"
    ADD CONSTRAINT "one to many" FOREIGN KEY ("IdDepartment") REFERENCES public."Departments"("IdDeparment") NOT VALID;


--
-- TOC entry 4728 (class 2606 OID 16471)
-- Name: Departments one to many; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Departments"
    ADD CONSTRAINT "one to many" FOREIGN KEY ("IdOrganization") REFERENCES public."Organizations"("IdOrganization") NOT VALID;


--
-- TOC entry 4730 (class 2606 OID 16522)
-- Name: Employees one to many; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employees"
    ADD CONSTRAINT "one to many" FOREIGN KEY ("IdScan") REFERENCES public."Files"("IdFale") NOT VALID;


--
-- TOC entry 4725 (class 2606 OID 16466)
-- Name: PersonnelOperations one to many2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonnelOperations"
    ADD CONSTRAINT "one to many2" FOREIGN KEY ("IdPosition") REFERENCES public."Positions"("IdPosition") NOT VALID;


--
-- TOC entry 4729 (class 2606 OID 16476)
-- Name: Departments one to many2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Departments"
    ADD CONSTRAINT "one to many2" FOREIGN KEY ("Parent") REFERENCES public."Positions"("IdPosition") NOT VALID;


--
-- TOC entry 4726 (class 2606 OID 16487)
-- Name: PersonnelOperations one to many3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PersonnelOperations"
    ADD CONSTRAINT "one to many3" FOREIGN KEY ("IdEmployees") REFERENCES public."Employees"("IdEmployees") NOT VALID;


--
-- TOC entry 4721 (class 2606 OID 16400)
-- Name: Administrator one to one; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Administrator"
    ADD CONSTRAINT "one to one" FOREIGN KEY ("IdAvtorization") REFERENCES public."Avtorization"("IdAvtorization");


--
-- TOC entry 4722 (class 2606 OID 16410)
-- Name: HRSpecialist one to one; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HRSpecialist"
    ADD CONSTRAINT "one to one" FOREIGN KEY ("IdAvtorization") REFERENCES public."Avtorization"("IdAvtorization");


--
-- TOC entry 4731 (class 2606 OID 16498)
-- Name: Employees one to one; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employees"
    ADD CONSTRAINT "one to one" FOREIGN KEY ("IdPassportData") REFERENCES public."PassportData"("IdPassportData") NOT VALID;


--
-- TOC entry 4732 (class 2606 OID 16517)
-- Name: Employees one to one2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employees"
    ADD CONSTRAINT "one to one2" FOREIGN KEY ("IdRegistrationAdress") REFERENCES public."RegistrationAdress"("IdRegistrationAdress") NOT VALID;


-- Completed on 2024-11-07 16:03:15

--
-- PostgreSQL database dump complete
--

