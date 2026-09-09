const express = require("express");
const conexaoBanco = require("./config/db");
const usuarioRouter = require("./route/usuarioRoute");
const app = express();
const PORT = 3000;

conexaoBanco();

app.use(express.json());

app.use("/usuarios", usuarioRouter);

app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
});