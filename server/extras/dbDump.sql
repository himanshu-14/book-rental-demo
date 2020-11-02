--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

-- Started on 2020-11-02 19:32:14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE bookrental;
--
-- TOC entry 3040 (class 1262 OID 16394)
-- Name: bookrental; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE bookrental WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


ALTER DATABASE bookrental OWNER TO postgres;

\connect bookrental

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 201 (class 1259 OID 16397)
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    book_id integer NOT NULL,
    author character varying(50) NOT NULL,
    publisher character varying(100),
    title character varying(100) NOT NULL,
    total_num_copies integer DEFAULT 0 NOT NULL,
    year_released integer,
    book_category_id integer
);


ALTER TABLE public.books OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16395)
-- Name: BOOK_ book_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BOOK_ book_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."BOOK_ book_id_seq" OWNER TO postgres;

--
-- TOC entry 3041 (class 0 OID 0)
-- Dependencies: 200
-- Name: BOOK_ book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BOOK_ book_id_seq" OWNED BY public.books.book_id;


--
-- TOC entry 203 (class 1259 OID 16414)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    trans_id integer NOT NULL,
    trans_cust_id integer NOT NULL,
    trans_book_copy_id integer NOT NULL,
    issue_date date NOT NULL,
    return_date date,
    trans_status integer NOT NULL,
    charges bigint
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- TOC entry 3042 (class 0 OID 0)
-- Dependencies: 203
-- Name: COLUMN transactions.charges; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.transactions.charges IS 'in paisa/cents';


--
-- TOC entry 202 (class 1259 OID 16412)
-- Name: TRANSACTIONS_trans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TRANSACTIONS_trans_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TRANSACTIONS_trans_id_seq" OWNER TO postgres;

--
-- TOC entry 3043 (class 0 OID 0)
-- Dependencies: 202
-- Name: TRANSACTIONS_trans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TRANSACTIONS_trans_id_seq" OWNED BY public.transactions.trans_id;


--
-- TOC entry 205 (class 1259 OID 16426)
-- Name: book_copies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book_copies (
    book_copy_id integer NOT NULL,
    book_copy_status integer NOT NULL,
    book_copy_book_id integer NOT NULL
);


ALTER TABLE public.book_copies OWNER TO postgres;

--
-- TOC entry 3044 (class 0 OID 0)
-- Dependencies: 205
-- Name: TABLE book_copies; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.book_copies IS 'stores details of actual physical copies of the books';


--
-- TOC entry 204 (class 1259 OID 16424)
-- Name: book_copies_book_copy_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.book_copies_book_copy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_copies_book_copy_id_seq OWNER TO postgres;

--
-- TOC entry 3045 (class 0 OID 0)
-- Dependencies: 204
-- Name: book_copies_book_copy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.book_copies_book_copy_id_seq OWNED BY public.book_copies.book_copy_id;


--
-- TOC entry 209 (class 1259 OID 16475)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category_name character varying(50) NOT NULL,
    category_perday_cost bigint NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16473)
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_category_id_seq OWNER TO postgres;

--
-- TOC entry 3046 (class 0 OID 0)
-- Dependencies: 208
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;


--
-- TOC entry 207 (class 1259 OID 16460)
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    cust_fname character varying(50),
    cust_id integer NOT NULL,
    cust_lname character varying(50),
    age integer,
    gender character(1),
    email_id character varying(50) NOT NULL,
    num_rented integer DEFAULT 0 NOT NULL,
    cust_status integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16458)
-- Name: customers_cust_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_cust_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_cust_id_seq OWNER TO postgres;

--
-- TOC entry 3047 (class 0 OID 0)
-- Dependencies: 206
-- Name: customers_cust_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_cust_id_seq OWNED BY public.customers.cust_id;


--
-- TOC entry 2877 (class 2604 OID 16429)
-- Name: book_copies book_copy_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_copies ALTER COLUMN book_copy_id SET DEFAULT nextval('public.book_copies_book_copy_id_seq'::regclass);


--
-- TOC entry 2874 (class 2604 OID 16400)
-- Name: books book_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books ALTER COLUMN book_id SET DEFAULT nextval('public."BOOK_ book_id_seq"'::regclass);


--
-- TOC entry 2881 (class 2604 OID 16478)
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- TOC entry 2878 (class 2604 OID 16463)
-- Name: customers cust_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN cust_id SET DEFAULT nextval('public.customers_cust_id_seq'::regclass);


--
-- TOC entry 2876 (class 2604 OID 16417)
-- Name: transactions trans_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN trans_id SET DEFAULT nextval('public."TRANSACTIONS_trans_id_seq"'::regclass);


--
-- TOC entry 3030 (class 0 OID 16426)
-- Dependencies: 205
-- Data for Name: book_copies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.book_copies (book_copy_id, book_copy_status, book_copy_book_id) VALUES (3, 1, 3);
INSERT INTO public.book_copies (book_copy_id, book_copy_status, book_copy_book_id) VALUES (1, 1, 1);
INSERT INTO public.book_copies (book_copy_id, book_copy_status, book_copy_book_id) VALUES (2, 1, 2);
INSERT INTO public.book_copies (book_copy_id, book_copy_status, book_copy_book_id) VALUES (4, 1, 4);


--
-- TOC entry 3026 (class 0 OID 16397)
-- Dependencies: 201
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.books (book_id, author, publisher, title, total_num_copies, year_released, book_category_id) VALUES (1, 'Margaret Atwood', 'Nan A. Talese', 'The Testaments', 1, 2019, 2);
INSERT INTO public.books (book_id, author, publisher, title, total_num_copies, year_released, book_category_id) VALUES (2, 'Sally Rooney', 'Hogarth Press', 'Normal People', 1, 2019, 3);
INSERT INTO public.books (book_id, author, publisher, title, total_num_copies, year_released, book_category_id) VALUES (3, 'Mark Manson', 'Harper', 'Everything Is F*cked: A Book About Hope', 1, 2019, 1);
INSERT INTO public.books (book_id, author, publisher, title, total_num_copies, year_released, book_category_id) VALUES (4, 'Melinda Gates', 'Flatiron Books', 'The Moment of Lift: How Empowering Women Changes the World', 1, 2019, 1);


--
-- TOC entry 3034 (class 0 OID 16475)
-- Dependencies: 209
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories (category_id, category_name, category_perday_cost) VALUES (1, 'Regular', 150);
INSERT INTO public.categories (category_id, category_name, category_perday_cost) VALUES (2, 'Fiction', 300);
INSERT INTO public.categories (category_id, category_name, category_perday_cost) VALUES (3, 'Novels', 150);


--
-- TOC entry 3032 (class 0 OID 16460)
-- Dependencies: 207
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.customers (cust_fname, cust_id, cust_lname, age, gender, email_id, num_rented, cust_status) VALUES ('Himanshu', 2, 'Mittal', 24, 'M', 'himanshu1495@gmail.com', 0, 1);
INSERT INTO public.customers (cust_fname, cust_id, cust_lname, age, gender, email_id, num_rented, cust_status) VALUES ('Shrinath', 1, 'Balakrishnan', 30, 'M', 'shrinath@source.one', 0, 1);


--
-- TOC entry 3028 (class 0 OID 16414)
-- Dependencies: 203
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.transactions (trans_id, trans_cust_id, trans_book_copy_id, issue_date, return_date, trans_status, charges) VALUES (4, 2, 2, '2020-11-01', '2020-11-02', 0, 100);
INSERT INTO public.transactions (trans_id, trans_cust_id, trans_book_copy_id, issue_date, return_date, trans_status, charges) VALUES (5, 2, 3, '2020-11-01', '2020-11-02', 0, 100);
INSERT INTO public.transactions (trans_id, trans_cust_id, trans_book_copy_id, issue_date, return_date, trans_status, charges) VALUES (1, 1, 1, '2020-10-31', '2020-11-02', 0, 200);
INSERT INTO public.transactions (trans_id, trans_cust_id, trans_book_copy_id, issue_date, return_date, trans_status, charges) VALUES (10, 2, 4, '2020-10-01', '2020-11-02', 0, 4800);
INSERT INTO public.transactions (trans_id, trans_cust_id, trans_book_copy_id, issue_date, return_date, trans_status, charges) VALUES (11, 2, 1, '2020-11-02', '2020-11-02', 0, 0);
INSERT INTO public.transactions (trans_id, trans_cust_id, trans_book_copy_id, issue_date, return_date, trans_status, charges) VALUES (12, 2, 2, '2020-11-02', '2020-11-02', 0, 0);
INSERT INTO public.transactions (trans_id, trans_cust_id, trans_book_copy_id, issue_date, return_date, trans_status, charges) VALUES (13, 2, 3, '2020-11-02', '2020-11-02', 0, 0);
INSERT INTO public.transactions (trans_id, trans_cust_id, trans_book_copy_id, issue_date, return_date, trans_status, charges) VALUES (15, 1, 4, '2020-11-02', '2020-11-02', 0, 0);
INSERT INTO public.transactions (trans_id, trans_cust_id, trans_book_copy_id, issue_date, return_date, trans_status, charges) VALUES (14, 1, 1, '2020-11-02', '2020-11-02', 0, 0);
INSERT INTO public.transactions (trans_id, trans_cust_id, trans_book_copy_id, issue_date, return_date, trans_status, charges) VALUES (16, 1, 2, '2020-11-02', '2020-11-02', 0, 0);


--
-- TOC entry 3048 (class 0 OID 0)
-- Dependencies: 200
-- Name: BOOK_ book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."BOOK_ book_id_seq"', 5, true);


--
-- TOC entry 3049 (class 0 OID 0)
-- Dependencies: 202
-- Name: TRANSACTIONS_trans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TRANSACTIONS_trans_id_seq"', 16, true);


--
-- TOC entry 3050 (class 0 OID 0)
-- Dependencies: 204
-- Name: book_copies_book_copy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.book_copies_book_copy_id_seq', 4, true);


--
-- TOC entry 3051 (class 0 OID 0)
-- Dependencies: 208
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 1, false);


--
-- TOC entry 3052 (class 0 OID 0)
-- Dependencies: 206
-- Name: customers_cust_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_cust_id_seq', 2, true);


--
-- TOC entry 2883 (class 2606 OID 16402)
-- Name: books BOOK_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT "BOOK_pkey" PRIMARY KEY (book_id);


--
-- TOC entry 2885 (class 2606 OID 16419)
-- Name: transactions TRANSACTIONS_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "TRANSACTIONS_pkey" PRIMARY KEY (trans_id);


--
-- TOC entry 2887 (class 2606 OID 16431)
-- Name: book_copies book_copies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_copies
    ADD CONSTRAINT book_copies_pkey PRIMARY KEY (book_copy_id);


--
-- TOC entry 2891 (class 2606 OID 16480)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- TOC entry 2889 (class 2606 OID 16467)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (cust_id);


--
-- TOC entry 2894 (class 2606 OID 16442)
-- Name: book_copies book_copy_book_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_copies
    ADD CONSTRAINT book_copy_book_id_fk FOREIGN KEY (book_copy_book_id) REFERENCES public.books(book_id) NOT VALID;


--
-- TOC entry 2892 (class 2606 OID 16447)
-- Name: transactions trans_book_copy_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT trans_book_copy_id_fk FOREIGN KEY (trans_book_copy_id) REFERENCES public.book_copies(book_copy_id) NOT VALID;


--
-- TOC entry 2893 (class 2606 OID 16468)
-- Name: transactions trans_cust_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT trans_cust_id_fk FOREIGN KEY (trans_cust_id) REFERENCES public.customers(cust_id) NOT VALID;


-- Completed on 2020-11-02 19:32:15

--
-- PostgreSQL database dump complete
--

