const Usuario = require("../model/usuarioModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

// Login
const login = async (req, res) => {
    try {
        const { usuario, senha } = req.body;

        const validacao = validarCredenciaisEntrada(usuario, senha);
        if (!validacao.valido) {
            return res.status(400).json({ mensagem: validacao.mensagem });
        }

        const usuarioEncontrado = await buscarUsuarioPorUsername(usuario);
        if (!usuarioEncontrado) {
            return res.status(401).json({ mensagem: "Usuário ou senha inválidos." });
        }

        const senhaCorreta = await verificarSenha(senha, usuarioEncontrado.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: "Usuário ou senha inválidos." });
        }
        
        const dadosUsuario = formatarRespostaUsuario(usuarioEncontrado);

        const token = jwt.sign(
            {
                id: usuarioEncontrado._id,
                usuario: usuarioEncontrado.usuario,
                regra: usuarioEncontrado.regra
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            mensagem: "Login realizado com sucesso!",
            token,
            dadosUsuario
        });

    } catch (error) {
        console.error("Erro no processo de login:", error);
        return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
};

/**
 * Valida se os campos obrigatórios da requisição foram preenchidos.
 */
const validarCredenciaisEntrada = (usuario, senha) => {
    if (!usuario || !senha) {
        return {
            valido: false,
            mensagem: "Nome de usuário e senha são obrigatórios."
        };
    }
    return { valido: true };
};

/**
 * Busca o usuário no banco pelo nome de usuário.
 */
const buscarUsuarioPorUsername = async (nomeUsuario) => {
    return await Usuario.findOne({ usuario: nomeUsuario });
};

/**
 * Compara a senha informada com o hash salvo no banco.
 */
const verificarSenha = async (senhaTextoPuro, senhaHash) => {
    return await bcrypt.compare(senhaTextoPuro, senhaHash);
};

/**
 * Formata os dados do usuário para o retorno da API (evita expor dados sensíveis).
 */
const formatarRespostaUsuario = (usuario) => {
    return {
        id: usuario._id,
        nome: usuario.nome,
        usuario: usuario.usuario,
        email: usuario.email,
        idade: usuario.idade,
        regra: usuario.regra
    };
};


module.exports = {
    login,
    // Exportados opcionalmente para facilitar testes unitários:
    validarCredenciaisEntrada,
    buscarUsuarioPorUsername,
    verificarSenha,
    formatarRespostaUsuario
};