# API de autenticação com JWT em typescript.
## teste em JEST

## Instalação

### Banco de dados
- Instalar Banco de dados MySQL;
- Criar arquivo .env com as variáveis: DB_HOST, DB_TABLE, DB_USER, DB_PASS, DB_PORT, APP_PORT, TOKEN_KEY;
- Criar arquivo .env.test com as variáveis: DB_HOST, DB_TABLE, DB_USER, DB_PASS, DB_PORT, APP_PORT, TOKEN_KEY; (BD destinado aos testes)
- Criar tabelas no BD de produção e de testes com os campos :
(id (INT, PK), login (VARCHAR,UNIQUE), email (VARCHAR,UNIQUE), first_name (VARCHAR), family_names (VARCHAR), hierarchy INT, password VARCHAR(200) )

### Rodar app
- npm install
Rodar com npm start;
testes npm test

Necessário setar o arquivo .env antes de rodar!!

## Erros a corrigir:

- Impedir a escrita de caracteres especiais no login;
- Tratar o erro quando falta virgula entre os parametros no corpo do body. Isso faz que eu um parametro numero receba uma string;
- Tratar o erro quando colocam , após o último parametro do json do body;