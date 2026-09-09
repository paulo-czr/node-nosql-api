const usuarioModel = require("../model/usuarioModel");

//CREATE 
exports.criarUsuario = async (req, res) => {
    try {
        const novoUsuario = new usuarioModel(req.body);
        await novoUsuario.save();
        res.status(201).json({message: "Usuário criado com sucesso.", novoUsuario});
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar usuário.", error });
    }
}

//READ
exports.obterUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar usuários.", error });
    }
}

exports.obterUsuarioPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await usuarioModel.findById(id);

        if (!usuario) {
            return res.status(404).json({ message: `Não foi possível encontrar o usuário com id ${id}.` });
        }
        res.status(200).json(usuario);

    } catch (error) {
        return res.status(500).json({ message: "Erro interno no servidor ao buscar usuário.", error: error.message });
    }
}

// UPDATE
exports.atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioAtualizado = await usuarioModel.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!usuarioAtualizado) {
            return res.status(404).json({ message: `ID ${id} não encontrado para atualização de usuário.` });
        }

        return res.status(200).json(usuarioAtualizado);

    } catch (error) {
        return res.status(400).json({ message: "Erro ao atualizar usuário", error: error.message });
    }
};

//DELETE
exports.deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioDeletado = await usuarioModel.findByIdAndDelete(id);

        if (!usuarioDeletado) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        return res.status(200).json({ 
            message: "Usuário deletado com sucesso", 
            usuario: { nome: usuarioDeletado.nome }
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Erro ao deletar usuário", 
            error: error.message 
        });
    }
};