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
- npm install - para instalar as dependências;
- Rodar com 'npm start';

Necessário setar os arquivos .env antes de rodar!!

### Rodar testes
- npm test
ou 
- npm test:watch - para realizar os testes em tempo real.
ou
- npm test:coverage - para gerar relatório de testes.

## Documentação

Documentação completa com Swagger no endpoint: /api-docs
ex.: localhost/api-docs 

## Erros a corrigir:

[ ] Impedir a escrita de caracteres especiais no login;
[ ] Tratar o erro quando falta vírgula entre os parametros no corpo do body. Isso faz que eu um parametro numero receba uma string;
[ ] Tratar o erro quando colocam , após o último parametro do json do body;