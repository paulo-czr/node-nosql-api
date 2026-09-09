# 🍃 Node.js NoSQL API

> **Projeto de Conclusão do Curso de Node.js**  
> *API RESTful desenvolvida utilizando Node.js e banco de dados NoSQL para gerenciamento de usuários.*

---

## 📌 Sobre o Projeto

Este repositório contém a aplicação desenvolvida como projeto final para a certificação do curso de **Node.js**. A aplicação foi projetada seguindo o padrão de arquitetura **MVC** (*Model-View-Controller*), aplicando boas práticas de desenvolvimento Back-End e manipulação de bancos de dados **NoSQL**.

---

## 🚀 Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)** — Ambiente de execução JavaScript
- **[Express](https://expressjs.com/)** — Framework web para rotas e middlewares
- **NoSQL / MongoDB** — Banco de dados para persistência de dados
- **[Nodemon](https://nodemon.io/)** — Ferramenta para recarregamento automático em desenvolvimento

---

## 🛠️ Funcionalidades

- [x] Conexão com banco de dados NoSQL
- [x] CRUD completo de usuários (*Create, Read, Update, Delete*)
- [x] Organização em camadas (*Model*, *Controller*, *Routes*)
- [x] Tratamento de requisições e respostas HTTP de forma estruturada

---

## 📂 Estrutura do Projeto

```text
node-nosql/
├── config/
│   └── db.js            # Configuração e conexão com o banco NoSQL
├── controller/
│   └── usuarioController.js  # Regras de negócio e controladores
├── model/
│   └── usuarioModel.js      # Schemas e modelos de dados
├── node_modules/        # Dependências instaladas
└── package.json         # Dependências e scripts do projeto
```

---

## 🔧 Como Executar o Projeto

### Pré-requisitos
- **Node.js** instalado (versão 14 ou superior)
- Um cluster/instância de banco **NoSQL (MongoDB)** configurado

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU-USUARIO/node-nosql.git
   cd node-nosql
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de banco de dados:**
   - Crie o arquivo de conexão dentro da pasta `config/db.js` informando as suas credenciais.

4. **Inicie o servidor:**
   ```bash
   npm start
   # ou para modo de desenvolvimento:
   npm run dev
   ```

---

## 🎓 Certificação & Créditos

Projeto elaborado durante a formação em **Node.js**.  
*Conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/paulo-czr)!*
