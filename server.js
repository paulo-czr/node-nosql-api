const express = require("express");
const conexaoBanco = require("./config/db");
const usuarioRouter = require("./route/usuarioRoute");
const loginRoute = require("./route/loginRoute");
const app = express();
const PORT = 3000;
require("dotenv").config()

conexaoBanco();

app.use(express.json());

app.use("/usuarios", usuarioRouter);
app.use("/login", loginRoute);

app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
});