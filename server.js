const express = require("express");
const conexaoBanco = require("./config/db");
const usuarioRouter = require("./route/usuarioRoute");
const authRoute = require("./route/authRoute");
const app = express();
const PORT = 3000;
require("dotenv").config()

conexaoBanco();

app.use(express.json());

app.use("/usuarios", usuarioRouter);
app.use("/auth", authRoute);

app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
});