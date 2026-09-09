const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuarioController");

router.post('/', usuarioController.criarUsuario);
router.get('/', usuarioController.obterUsuarios);
router.get('/:id', usuarioController.obterUsuarioPorId);
router.put('/:id', usuarioController.atualizarUsuario);
router.delete('/:id', usuarioController.deletarUsuario);

module.exports = router;