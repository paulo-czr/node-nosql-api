# Node.js NoSQL API

> API RESTful para gerenciamento de usuários, autenticação e controle de acesso baseada em funções, desenvolvida com Node.js, Express e MongoDB.

---

## 📌 Sobre o projeto

O **Node.js NoSQL API** é uma aplicação Back-End desenvolvida durante a formação em Node.js, evoluída para trabalhar não apenas com operações CRUD, mas também com **autenticação de usuários, autorização por função, proteção de senhas e criação automatizada de usuário administrador**.

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=js,nodejs,mongodb,jest,,postman,git&theme=dark" />
  </a>
</p>

---

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura](#arquitetura)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Telas do Sistema](#telas-do-sistema)
- [Endpoints da API](#endpoints-da-api)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Autores](#autores)

---

A aplicação utiliza uma arquitetura organizada por responsabilidades, separando:

- **Models** — definição dos documentos e regras do MongoDB;
- **Controllers** — processamento das requisições e respostas;
- **Routes** — definição dos endpoints da API;
- **Hooks/Middlewares** — autenticação, autorização e tratamento da senha;
- **Config** — conexão com o banco de dados;
- **Scripts** — rotinas auxiliares, como criação do administrador;
- **Tests** — testes automatizados com Jest.

O projeto foi pensado para servir como uma API de estudos e também como base para aplicações que necessitem de autenticação e gerenciamento de usuários.

---

## Principais funcionalidades

### Gerenciamento de usuários

- [x] Criar usuário
- [x] Listar usuários
- [x] Buscar usuário por ID
- [x] Atualizar usuário
- [x] Excluir usuário
- [x] Validação de campos através do Schema do Mongoose
- [x] Ocultação da senha nas respostas JSON

### Autenticação e segurança

- [x] Login utilizando usuário e senha
- [x] Senhas armazenadas com hash utilizando **bcrypt**
- [x] Autenticação através de **JWT (JSON Web Token)**
- [x] Token com expiração de 1 dia
- [x] Middleware para validação do token
- [x] Controle de acesso baseado em função (*Role-Based Access Control*)
- [x] Funções `usuario` e `admin`
- [x] Restrição de operações administrativas

### Automação e desenvolvimento

- [x] Script para criação inicial do administrador
- [x] Proteção contra criação duplicada do administrador
- [x] Variáveis sensíveis configuradas através de `.env`
- [x] Ambiente de desenvolvimento com Nodemon
- [x] Testes automatizados com Jest

---

## Tecnologias

| Tecnologia | Utilização |
|---|---|
| **Node.js** | Runtime da aplicação |
| **Express 5** | Framework HTTP e criação da API |
| **MongoDB** | Banco de dados NoSQL |
| **Mongoose** | ODM para comunicação com MongoDB |
| **JWT** | Autenticação baseada em tokens |
| **bcrypt** | Hash e verificação de senhas |
| **dotenv** | Gerenciamento de variáveis de ambiente |
| **Jest** | Testes automatizados |

---

## Arquitetura

A aplicação segue uma organização inspirada no padrão **MVC**, complementada por middlewares e scripts auxiliares.

```text
node-nosql/
│
├── config/
│   └── db.js
│
├── controller/
│   ├── loginController.js
│   └── usuarioController.js
│
├── hook/
│   ├── autorizarRegra.js
│   ├── hashSenha.js
│   └── verificarToken.js
│
├── model/
│   └── usuarioModel.js
│
├── route/
│   ├── loginRoute.js
│   └── usuarioRoute.js
│
├── scripts/
│   └── seedAdmin.js
│
├── tests/
│   └── hashSenha.test.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

### Responsabilidade das camadas

**`config/`**  
Centraliza configurações relacionadas à infraestrutura da aplicação, atualmente contendo a conexão com o MongoDB.

**`controller/`**  
Contém a lógica responsável por receber as requisições, executar as operações necessárias e retornar as respostas HTTP.

**`hook/`**  
Contém funções utilizadas como middlewares e hooks, incluindo autenticação JWT, autorização por função e proteção das senhas.

**`model/`**  
Define os Schemas e Models utilizados pelo Mongoose para representar os dados persistidos no MongoDB.

**`route/`**  
Define os endpoints disponíveis na API e os middlewares aplicados a cada rota.

**`scripts/`**  
Contém rotinas executáveis de apoio ao projeto, como a criação do usuário administrador inicial.

**`tests/`**  
Concentra os testes automatizados da aplicação.

---

## Autenticação e autorização

A API utiliza **JWT** para autenticação.

Após um login válido, o servidor retorna um token contendo informações básicas do usuário, incluindo seu ID, nome de usuário e função.

As rotas protegidas esperam o token no cabeçalho:

```http
Authorization: Bearer SEU_TOKEN
```

### Níveis de acesso

| Função | Permissões |
|---|---|
| `usuario` | Consultar usuários |
| `admin` | Criar, consultar, atualizar e excluir usuários |

As operações administrativas são protegidas pelo middleware `autorizarRegra`.

> **Observação:** as permissões representam o comportamento atualmente implementado nas rotas. Novas funções podem ser adicionadas futuramente conforme a evolução da aplicação.

---

## Fluxo de login

O processo de autenticação funciona da seguinte forma:

```text
Cliente
   │
   │ POST /login
   ▼
loginController
   │
   ├── Valida credenciais
   ├── Busca usuário no MongoDB
   ├── Compara senha com bcrypt
   └── Gera JWT
   │
   ▼
Cliente recebe:
- token
- dados do usuário
```

As senhas **não são armazenadas em texto puro**. O hook `hashSenha` intercepta o salvamento do usuário e gera automaticamente o hash utilizando bcrypt.

Além disso, o Schema possui uma transformação `toJSON` que impede que o campo `senha` seja exposto nas respostas da API.

---

## Seed do administrador

O projeto possui um script específico para criar o primeiro usuário administrador:

```bash
npm run seed:admin
```

As informações utilizadas pelo script são obtidas através das variáveis:

```env
SEED_ADMIN_NOME="Administrador"
SEED_ADMIN_USUARIO="admin"
SEED_ADMIN_EMAIL="admin@exemplo.com"
SEED_ADMIN_SENHA="sua-senha"
```

O script verifica se o administrador já existe antes de criá-lo, evitando duplicações quando executado novamente.

> **Importante:** nunca versionar o arquivo `.env`. Em ambientes reais, utilize uma senha forte e exclusiva para o administrador.

---

## Endpoints da API

### Login

#### `POST /login`

Realiza a autenticação do usuário.

**Body:**

```json
{
  "usuario": "admin",
  "senha": "sua-senha"
}
```

**Resposta de sucesso:**

```json
{
  "mensagem": "Login realizado com sucesso!",
  "token": "JWT...",
  "dadosUsuario": {
    "id": "...",
    "nome": "Administrador",
    "usuario": "admin",
    "email": "admin@exemplo.com",
    "idade": 0,
    "regra": "admin"
  }
}
```

---

### Usuários

> As rotas abaixo exigem autenticação através de JWT.

#### `GET /usuarios`

Retorna a lista de usuários.

**Autenticação:** `Bearer Token`

---

#### `GET /usuarios/:id`

Retorna um usuário específico.

**Autenticação:** `Bearer Token`

---

#### `POST /usuarios`

Cria um novo usuário.

**Autenticação:** `Bearer Token`  
**Permissão:** `admin`

**Body de exemplo:**

```json
{
  "nome": "João da Silva",
  "idade": 25,
  "usuario": "joao",
  "email": "joao@email.com",
  "senha": "senhaSegura123",
  "regra": "usuario"
}
```

---

#### `PUT /usuarios/:id`

Atualiza um usuário existente.

**Autenticação:** `Bearer Token`  
**Permissão:** `admin`

---

#### `DELETE /usuarios/:id`

Exclui um usuário.

**Autenticação:** `Bearer Token`  
**Permissão:** `admin`

---

## Modelo de usuário

Os usuários são armazenados no MongoDB seguindo o Schema definido em `model/usuarioModel.js`.

| Campo | Tipo | Obrigatório | Observação |
|---|---|---:|---|
| `nome` | String | Sim | Nome do usuário |
| `idade` | Number | Não | Valor mínimo: `0` |
| `usuario` | String | Sim | Nome de acesso |
| `email` | String | Sim | Deve ser único e possuir formato de e-mail |
| `senha` | String | Sim | Armazenada como hash |
| `regra` | String | Não | `usuario` ou `admin` |

---

## Configuração do ambiente

### Pré-requisitos

Antes de executar o projeto, tenha instalado:

- **Node.js**
- **npm**
- **MongoDB**

O projeto está configurado atualmente para utilizar uma instância local do MongoDB em:

```text
mongodb://localhost:27017/exemplo_db
```

A conexão está definida em:

```text
config/db.js
```

---

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/node-nosql.git
cd node-nosql
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
JWT_SECRET="uma-chave-secreta-forte"

SEED_ADMIN_NOME="Administrador"
SEED_ADMIN_USUARIO="admin"
SEED_ADMIN_EMAIL="admin@exemplo.com"
SEED_ADMIN_SENHA="uma-senha-segura"
```

### 4. Inicie o MongoDB

Certifique-se de que o serviço do MongoDB esteja executando localmente.

### 5. Crie o administrador inicial

```bash
npm run seed:admin
```

### 6. Inicie a aplicação

Para produção:

```bash
npm start
```

Para desenvolvimento:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

---

## Testes

Os testes automatizados utilizam **Jest**.

Execute:

```bash
npm test
```

O projeto atualmente possui testes relacionados ao comportamento do hook de hash de senha.

---

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o servidor com Node.js |
| `npm run dev` | Inicia o servidor com Nodemon |
| `npm test` | Executa os testes automatizados |
| `npm run seed:admin` | Cria o administrador inicial |

---

## Boas práticas de segurança

O projeto já possui algumas medidas importantes:

- Senhas protegidas com **bcrypt**;
- JWT assinado com chave definida em variável de ambiente;
- Expiração do token configurada para 1 dia;
- Rotas protegidas por autenticação;
- Controle de acesso por função;
- Senha removida da representação JSON dos usuários;
- Arquivo `.env` incluído no `.gitignore`.

### Atenção antes de publicar

Nunca envie credenciais reais para o repositório.

Caso um `.env` com credenciais reais tenha sido versionado anteriormente, recomenda-se:

1. Remover o arquivo do histórico do Git;
2. Alterar imediatamente as credenciais expostas;
3. Gerar um novo `JWT_SECRET`;
4. Utilizar variáveis de ambiente no ambiente de produção.

---

## Próximos passos

Algumas evoluções naturais para o projeto:

- [ ] Criar documentação OpenAPI/Swagger
- [ ] Adicionar validação de entrada mais robusta
- [ ] Centralizar tratamento de erros
- [ ] Adicionar variável de ambiente para a URL do MongoDB
- [ ] Adicionar testes de integração para as rotas
- [ ] Implementar paginação na listagem de usuários
- [ ] Adicionar recuperação e alteração de senha
- [ ] Adicionar logs estruturados
- [ ] Configurar CORS conforme o ambiente
- [ ] Containerizar a aplicação com Docker
- [ ] Configurar CI/CD para execução automática dos testes

---

## Objetivo acadêmico

Este projeto foi desenvolvido como parte da formação em **Node.js**, com o objetivo de consolidar conhecimentos em:

- Desenvolvimento de APIs REST;
- Node.js e Express;
- Bancos de dados NoSQL;
- MongoDB e Mongoose;
- Autenticação e autorização;
- Criptografia de senhas;
- Middlewares;
- Arquitetura Back-End;
- Testes automatizados.

---

## 👨‍💻 Autor

**Paulo Cesar**

Projeto desenvolvido para fins de estudo e evolução prática em desenvolvimento Back-End com Node.js.

---
