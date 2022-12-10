# API de autenticação com JWT em typescript.
## teste em JEST

## Instalação

### Banco de dados
- Instalar Banco de dados MySQL;
- Criar um schema, ou selecionar um existente;
- Criar arquivo .env com as variáveis: 

DB_HOST - ex.: http://localhost

DB_SCHEMA - ex.: apits

DB_USER - ex.: root

DB_PASS - ex.: suasenha

DB_PORT - ex.: 3306

APP_PORT - ex.: 3001

TOKEN_KEY - ex.: chaveSeguraDeSuaPreferencia;

- Criar arquivo .env.test com as variáveis: DB_HOST, DB_SCHEMA, DB_USER, DB_PASS, DB_PORT, APP_PORT, TOKEN_KEY; (BD destinado aos testes)
- Criar tabelas no BD de produção e de testes com os campos
- Código cria um usuário inicial com os seguintes dados:

  id: 0,

  firstName: "admin",

  familyName: "ad",

  login: "adm",

  email: "admin@admin.com",

  password: "admin123456",

  hierarchy: 0

- É necessário utilizar o usário admin para criar seu primeiro usuário;
- Depois é recomendável alterar a senha do admin. Não excluá-o, nem renomeie o login. Porque o código sempre o recriará quando reiniciar se não houver usuário com este login;

### Rodar app
- npm install - para instalar as dependências;
- Rodar com 'npm start';

Necessário setar os arquivos .env antes de rodar!!

### Rodar testes
Se for rodar os testes em um schema de testes, será preciso criar as tabelas no schema. A migrations cria as tabelas apenas no schema principal.

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