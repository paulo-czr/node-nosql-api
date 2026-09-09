const mongoose = require("mongoose");

const conexaoBanco = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/exemplo_db");
        console.log("Conexão com o Banco de Dados bem sucedida")
    } catch (err) {
        console.log("Erro ao se conectar com o Banco de Dados.")
        process.exit(1); // Encerra o processo em caso de falha
    }

}

module.exports = conexaoBanco;