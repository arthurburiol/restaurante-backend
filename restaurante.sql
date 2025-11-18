--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-11-18 20:28:25

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

--
-- TOC entry 866 (class 1247 OID 25682)
-- Name: comanda_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.comanda_status AS ENUM (
    'ABERTA',
    'FECHADA',
    'CANCELADA'
);


ALTER TYPE public.comanda_status OWNER TO postgres;

--
-- TOC entry 872 (class 1247 OID 25705)
-- Name: item_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.item_status AS ENUM (
    'PENDENTE',
    'EM_EXECUCAO',
    'PRONTO',
    'ENTREGUE',
    'CANCELADO'
);


ALTER TYPE public.item_status OWNER TO postgres;

--
-- TOC entry 860 (class 1247 OID 25664)
-- Name: produto_tipo; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.produto_tipo AS ENUM (
    'PRATO',
    'BEBIDA'
);


ALTER TYPE public.produto_tipo OWNER TO postgres;

--
-- TOC entry 228 (class 1255 OID 25756)
-- Name: atualizar_total_comanda(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.atualizar_total_comanda() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE comandas
  SET total = (
    SELECT SUM(valor_unitario * quantidade)
    FROM comanda_itens
    WHERE id_comanda = NEW.id_comanda
  )
  WHERE id = NEW.id_comanda;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.atualizar_total_comanda() OWNER TO postgres;

--
-- TOC entry 227 (class 1255 OID 25740)
-- Name: update_timestamp(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.tempo_atualizacao = CURRENT_TIMESTAMP;
  RETURN NEW;
END; $$;


ALTER FUNCTION public.update_timestamp() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 25716)
-- Name: comanda_itens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comanda_itens (
    id integer NOT NULL,
    id_comanda integer NOT NULL,
    id_produto integer NOT NULL,
    quantidade integer DEFAULT 1 NOT NULL,
    valor_unitario numeric(10,2) NOT NULL,
    status public.item_status DEFAULT 'PENDENTE'::public.item_status NOT NULL,
    observacoes text,
    tempo_pedido timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    tempo_atualizacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT comanda_itens_quantidade_check CHECK ((quantidade > 0)),
    CONSTRAINT comanda_itens_valor_unitario_check CHECK ((valor_unitario >= (0)::numeric))
);


ALTER TABLE public.comanda_itens OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 25715)
-- Name: comanda_itens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comanda_itens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comanda_itens_id_seq OWNER TO postgres;

--
-- TOC entry 4872 (class 0 OID 0)
-- Dependencies: 223
-- Name: comanda_itens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comanda_itens_id_seq OWNED BY public.comanda_itens.id;


--
-- TOC entry 222 (class 1259 OID 25690)
-- Name: comandas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comandas (
    id integer NOT NULL,
    cpf_usuario character varying(20),
    data_abertura timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    data_fechamento timestamp without time zone,
    status public.comanda_status DEFAULT 'ABERTA'::public.comanda_status NOT NULL,
    total numeric(12,2) DEFAULT 0
);


ALTER TABLE public.comandas OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 25689)
-- Name: comandas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comandas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comandas_id_seq OWNER TO postgres;

--
-- TOC entry 4873 (class 0 OID 0)
-- Dependencies: 221
-- Name: comandas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comandas_id_seq OWNED BY public.comandas.id;


--
-- TOC entry 226 (class 1259 OID 25743)
-- Name: pagamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pagamentos (
    id integer NOT NULL,
    id_comanda integer NOT NULL,
    valor numeric(12,2) NOT NULL,
    forma_pagamento character varying(50),
    hora_pagamento timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pagamentos_valor_check CHECK ((valor >= (0)::numeric))
);


ALTER TABLE public.pagamentos OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 25742)
-- Name: pagamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pagamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pagamentos_id_seq OWNER TO postgres;

--
-- TOC entry 4874 (class 0 OID 0)
-- Dependencies: 225
-- Name: pagamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pagamentos_id_seq OWNED BY public.pagamentos.id;


--
-- TOC entry 220 (class 1259 OID 25671)
-- Name: produtos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produtos (
    id integer NOT NULL,
    nome character varying(150) NOT NULL,
    descricao text,
    preco numeric(10,2) NOT NULL,
    tipo public.produto_tipo NOT NULL,
    disponivel boolean DEFAULT true,
    CONSTRAINT produtos_preco_check CHECK ((preco >= (0)::numeric))
);


ALTER TABLE public.produtos OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 25670)
-- Name: produtos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.produtos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.produtos_id_seq OWNER TO postgres;

--
-- TOC entry 4875 (class 0 OID 0)
-- Dependencies: 219
-- Name: produtos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.produtos_id_seq OWNED BY public.produtos.id;


--
-- TOC entry 218 (class 1259 OID 25653)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    cpf character varying(20) NOT NULL,
    nome character varying(100) NOT NULL,
    telefone character varying(20) NOT NULL,
    tipo character varying(20) NOT NULL,
    usuario character varying(255) NOT NULL,
    senha character varying(255) NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 25652)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 4876 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4679 (class 2604 OID 25719)
-- Name: comanda_itens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comanda_itens ALTER COLUMN id SET DEFAULT nextval('public.comanda_itens_id_seq'::regclass);


--
-- TOC entry 4675 (class 2604 OID 25693)
-- Name: comandas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comandas ALTER COLUMN id SET DEFAULT nextval('public.comandas_id_seq'::regclass);


--
-- TOC entry 4684 (class 2604 OID 25746)
-- Name: pagamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamentos ALTER COLUMN id SET DEFAULT nextval('public.pagamentos_id_seq'::regclass);


--
-- TOC entry 4673 (class 2604 OID 25674)
-- Name: produtos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos ALTER COLUMN id SET DEFAULT nextval('public.produtos_id_seq'::regclass);


--
-- TOC entry 4672 (class 2604 OID 25656)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4864 (class 0 OID 25716)
-- Dependencies: 224
-- Data for Name: comanda_itens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comanda_itens (id, id_comanda, id_produto, quantidade, valor_unitario, status, observacoes, tempo_pedido, tempo_atualizacao) FROM stdin;
8	1	1	1	25.00	ENTREGUE	Sem tomate	2025-11-04 21:53:45.605823	2025-11-04 21:53:45.605823
9	1	4	2	6.00	ENTREGUE	\N	2025-11-04 21:53:45.605823	2025-11-04 21:53:45.605823
10	2	2	1	28.00	EM_EXECUCAO	\N	2025-11-04 21:53:45.605823	2025-11-04 21:53:45.605823
11	2	3	1	18.00	PENDENTE	Extra crocante	2025-11-04 21:53:45.605823	2025-11-04 21:53:45.605823
12	2	5	1	8.00	PENDENTE	\N	2025-11-04 21:53:45.605823	2025-11-04 21:53:45.605823
13	3	1	1	25.00	ENTREGUE	\N	2025-11-04 21:53:45.605823	2025-11-04 21:53:45.605823
14	3	4	1	6.00	ENTREGUE	\N	2025-11-04 21:53:45.605823	2025-11-04 21:53:45.605823
15	1	1	2	30.00	PENDENTE	Muito molho	2025-11-12 22:51:04.255	2025-11-12 22:51:04.255
23	5	1	1	25.00	ENTREGUE	\N	2025-11-17 21:15:33.643441	2025-11-17 21:15:33.643441
24	3	4	2	6.00	ENTREGUE	\N	2025-11-17 21:15:33.643441	2025-11-17 21:15:33.643441
27	5	2	1	28.00	EM_EXECUCAO	\N	2025-11-17 21:16:03.776602	2025-11-17 21:16:03.776602
28	5	3	1	18.00	ENTREGUE	\N	2025-11-17 21:16:03.776602	2025-11-17 21:16:03.776602
29	5	1	1	25.00	ENTREGUE	Sem tomate	2025-11-18 19:44:03.610194	2025-11-18 19:44:03.610194
30	5	4	2	6.00	ENTREGUE	\N	2025-11-18 19:44:03.610194	2025-11-18 19:44:03.610194
31	6	2	1	28.00	EM_EXECUCAO	\N	2025-11-18 19:44:14.486836	2025-11-18 19:44:14.486836
32	6	3	1	18.00	PENDENTE	Extra crocante	2025-11-18 19:44:14.486836	2025-11-18 19:44:14.486836
33	6	5	1	8.00	PENDENTE	\N	2025-11-18 19:44:14.486836	2025-11-18 19:44:14.486836
34	7	1	1	25.00	ENTREGUE	\N	2025-11-18 19:44:20.134325	2025-11-18 19:44:20.134325
35	7	4	1	6.00	ENTREGUE	\N	2025-11-18 19:44:20.134325	2025-11-18 19:44:20.134325
36	7	7	1	10.00	ENTREGUE	\N	2025-11-18 19:44:20.134325	2025-11-18 19:44:20.134325
\.


--
-- TOC entry 4862 (class 0 OID 25690)
-- Dependencies: 222
-- Data for Name: comandas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comandas (id, cpf_usuario, data_abertura, data_fechamento, status, total) FROM stdin;
1	11111111111	2025-11-04 21:53:40.765589	\N	ABERTA	37.00
2	22222222222	2025-11-04 21:53:40.765589	\N	ABERTA	54.00
3	33333333333	2025-11-04 21:53:40.765589	\N	FECHADA	43.00
8	11111111111	2025-11-18 19:40:34.967509	\N	ABERTA	0.00
9	77777777777	2025-11-18 19:40:34.967509	\N	ABERTA	0.00
10	33333333333	2025-11-18 19:40:34.967509	\N	FECHADA	0.00
11	11111111111	2025-11-18 19:43:54.209373	\N	ABERTA	0.00
12	22222222222	2025-11-18 19:43:54.209373	\N	ABERTA	0.00
13	33333333333	2025-11-18 19:43:54.209373	\N	ABERTA	0.00
5	11111111111	2025-11-15 23:58:11.5985	2025-11-17 21:16:16.398564	FECHADA	108.00
6	11111111111	2025-11-16 00:00:11.741676	\N	ABERTA	54.00
7	11111111111	2025-11-17 21:14:12.298397	\N	ABERTA	41.00
\.


--
-- TOC entry 4866 (class 0 OID 25743)
-- Dependencies: 226
-- Data for Name: pagamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pagamentos (id, id_comanda, valor, forma_pagamento, hora_pagamento) FROM stdin;
1	3	31.00	PIX	2025-11-04 21:53:52.408652
2	3	31.00	PIX	2025-11-04 21:53:53.444682
3	3	40.00	CREDITO	2025-11-11 23:59:15.606415
6	5	37.00	PIX	2025-11-17 21:15:48.289494
7	5	20.00	CREDITO	2025-11-17 21:16:25.821283
8	5	26.00	PIX	2025-11-17 21:16:25.821283
9	7	52.00	PIX	2025-11-18 19:40:44.499443
\.


--
-- TOC entry 4860 (class 0 OID 25671)
-- Dependencies: 220
-- Data for Name: produtos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produtos (id, nome, descricao, preco, tipo, disponivel) FROM stdin;
1	X-Salada	Pão, hambúrguer, queijo, alface, tomate e maionese	25.00	PRATO	t
2	X-Bacon	Pão, hambúrguer, queijo, bacon e maionese	28.00	PRATO	t
3	Batata Frita	Porção média de batatas crocantes	18.00	PRATO	t
4	Coca-Cola Lata	350ml gelada	6.00	BEBIDA	t
5	Suco Natural	Copo de suco natural de laranja	8.00	BEBIDA	t
6	Água Mineral	500ml sem gás	4.00	BEBIDA	t
7	Sorvete	Taça com 2 bolas de sorvete de creme	10.00	PRATO	t
8	Petit Gateau	Bolo de chocolate com recheio e sorvete	16.00	PRATO	t
9	X-Calota	Pão, hambúrguer, queijo, bacon, calabresa, alface, tomate, batata frita e maionese	40.00	PRATO	t
11	X-Frango	Pão, frango grelhado, queijo e maionese	22.00	PRATO	t
12	Milkshake Chocolate	300ml	12.00	BEBIDA	t
13	Onion Rings	Porção média de anéis de cebola	15.00	PRATO	t
14	Guaraná Lata	350ml	6.00	BEBIDA	t
\.


--
-- TOC entry 4858 (class 0 OID 25653)
-- Dependencies: 218
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, cpf, nome, telefone, tipo, usuario, senha) FROM stdin;
1	11111111111	João Silva	51999990000	CLIENTE	user_0095c713	d39865e52818ee4fc8a03c1e98550fb9
2	22222222222	Maria Oliveira	51999991111	CLIENTE	user_811e727a	af56adfbfcc9704a5f3ce55b0d5c292d
3	33333333333	Carlos Santos	51999992222	CLIENTE	user_5774842b	3d61c0d38d450a5ca72868a1eb7a39c1
4	44444444444	Ana Souza	51999993333	GARÇOM	user_f05e8714	131296225aaa9061b5ef95a56ada7eb2
5	55555555555	Paulo Lima	51999994444	COZINHEIRO	user_bccf0d1b	a1eb07775cdf98a321bb1ba66ee55c6a
6	66666666666	Administrador	51999995555	ADMIN	user_90a6609e	be56e66998247d35940e1a5a1ad80b58
47	77777777777	Gabriel Torres	51999996666	CLIENTE	user_gabrielt	senha123
48	88888888888	Larissa Mendes	51999997777	GARÇOM	user_larissa	senha123
49	99999999999	Roberto Costa	51999998888	COZINHEIRO	user_roberto	senha123
\.


--
-- TOC entry 4877 (class 0 OID 0)
-- Dependencies: 223
-- Name: comanda_itens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comanda_itens_id_seq', 36, true);


--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 221
-- Name: comandas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comandas_id_seq', 13, true);


--
-- TOC entry 4879 (class 0 OID 0)
-- Dependencies: 225
-- Name: pagamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pagamentos_id_seq', 9, true);


--
-- TOC entry 4880 (class 0 OID 0)
-- Dependencies: 219
-- Name: produtos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produtos_id_seq', 15, true);


--
-- TOC entry 4881 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 49, true);


--
-- TOC entry 4703 (class 2606 OID 25729)
-- Name: comanda_itens comanda_itens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comanda_itens
    ADD CONSTRAINT comanda_itens_pkey PRIMARY KEY (id);


--
-- TOC entry 4701 (class 2606 OID 25698)
-- Name: comandas comandas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comandas
    ADD CONSTRAINT comandas_pkey PRIMARY KEY (id);


--
-- TOC entry 4705 (class 2606 OID 25750)
-- Name: pagamentos pagamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamentos
    ADD CONSTRAINT pagamentos_pkey PRIMARY KEY (id);


--
-- TOC entry 4699 (class 2606 OID 25680)
-- Name: produtos produtos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_pkey PRIMARY KEY (id);


--
-- TOC entry 4691 (class 2606 OID 25765)
-- Name: usuarios usuario_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuario_unique UNIQUE (usuario);


--
-- TOC entry 4693 (class 2606 OID 25660)
-- Name: usuarios usuarios_cpf_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_cpf_key UNIQUE (cpf);


--
-- TOC entry 4695 (class 2606 OID 25658)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4697 (class 2606 OID 25662)
-- Name: usuarios usuarios_telefone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_telefone_key UNIQUE (telefone);


--
-- TOC entry 4710 (class 2620 OID 25757)
-- Name: comanda_itens atualiza_total; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER atualiza_total AFTER INSERT OR DELETE OR UPDATE ON public.comanda_itens FOR EACH ROW EXECUTE FUNCTION public.atualizar_total_comanda();


--
-- TOC entry 4711 (class 2620 OID 25741)
-- Name: comanda_itens trg_update_timestamp; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_update_timestamp BEFORE UPDATE ON public.comanda_itens FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 4707 (class 2606 OID 25730)
-- Name: comanda_itens comanda_itens_id_comanda_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comanda_itens
    ADD CONSTRAINT comanda_itens_id_comanda_fkey FOREIGN KEY (id_comanda) REFERENCES public.comandas(id) ON DELETE CASCADE;


--
-- TOC entry 4708 (class 2606 OID 25735)
-- Name: comanda_itens comanda_itens_id_produto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comanda_itens
    ADD CONSTRAINT comanda_itens_id_produto_fkey FOREIGN KEY (id_produto) REFERENCES public.produtos(id);


--
-- TOC entry 4706 (class 2606 OID 25699)
-- Name: comandas comandas_cpf_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comandas
    ADD CONSTRAINT comandas_cpf_usuario_fkey FOREIGN KEY (cpf_usuario) REFERENCES public.usuarios(cpf);


--
-- TOC entry 4709 (class 2606 OID 25751)
-- Name: pagamentos pagamentos_id_comanda_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamentos
    ADD CONSTRAINT pagamentos_id_comanda_fkey FOREIGN KEY (id_comanda) REFERENCES public.comandas(id);


-- Completed on 2025-11-18 20:28:26

--
-- PostgreSQL database dump complete
--

