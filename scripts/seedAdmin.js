require("dotenv").config();
const mongoose = require("mongoose");
const conexaoBanco = require("../config/db");
const Usuario = require("../model/usuarioModel");

const ADMIN = {
    nome: process.env.SEED_ADMIN_NOME,
    usuario: process.env.SEED_ADMIN_USUARIO,
    email: process.env.SEED_ADMIN_EMAIL,
    senha: process.env.SEED_ADMIN_SENHA,
    regra: "admin",
};

async function seedAdmin() {
    await conexaoBanco();

    try {
        // Evita duplicar o admin se o script rodar mais de uma vez
        const jaExiste = await Usuario.findOne({ usuario: ADMIN.usuario });

        if (jaExiste) {
            console.log(`Usuário "${ADMIN.usuario}" já existe. Nada a fazer.`);
            return;
        }

        // new Usuario(...) + .save() -> dispara o hook pre('save') async sem crashar
        const admin = new Usuario(ADMIN);
        await admin.save();

        console.log("Usuário Administrador criado com sucesso.");

        if (!process.env.SEED_ADMIN_SENHA) {
            console.warn(`Atenção: senha padrão foi usada.`);
        }
    } catch (error) {
        console.error("Erro ao criar o usuário Administrador:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

seedAdmin();