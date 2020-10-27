CREATE DATABASE bookrental
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE TABLE public."BOOK"
(
    " book_id" integer NOT NULL DEFAULT nextval('"BOOK_ book_id_seq"'::regclass),
    author character varying(50) COLLATE pg_catalog."default" NOT NULL,
    publisher character varying(100) COLLATE pg_catalog."default",
    title character varying(100) COLLATE pg_catalog."default" NOT NULL,
    num_copies integer NOT NULL,
    CONSTRAINT "BOOK_pkey" PRIMARY KEY (" book_id")
)

CREATE TABLE public."CUSTOMER"
(
    cust_fname character varying(50) COLLATE pg_catalog."default",
    cust_id integer NOT NULL DEFAULT nextval('"CUSTOMER_cust_id_seq"'::regclass),
    cust_lname character varying(50) COLLATE pg_catalog."default",
    age integer,
    gender character(1) COLLATE pg_catalog."default",
    email_id character varying(50) COLLATE pg_catalog."default" NOT NULL,
    num_rented integer NOT NULL DEFAULT 0,
    CONSTRAINT "CUSTOMER_pkey" PRIMARY KEY (cust_id, email_id)
)

CREATE TABLE public."TRANSACTIONS"
(
    trans_id integer NOT NULL DEFAULT nextval('"TRANSACTIONS_trans_id_seq"'::regclass),
    trans_cust_id integer NOT NULL,
    trans_book_id integer NOT NULL,
    issue_date date NOT NULL,
    return_date date,
    trans_status integer,
    charges bigint,
    CONSTRAINT "TRANSACTIONS_pkey" PRIMARY KEY (trans_id)
)