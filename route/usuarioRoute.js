const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuarioController");
const verificarToken = require("../hook/verificarToken");
const autorizarRole = require("../hook/autorizarRegra");

router.post('/', verificarToken, autorizarRole("admin"), usuarioController.criarUsuario);
router.get('/', verificarToken, usuarioController.obterUsuarios);
router.get('/:id', verificarToken, usuarioController.obterUsuarioPorId);
router.put('/:id', verificarToken, autorizarRole("admin"), usuarioController.atualizarUsuario);
router.delete('/:id', verificarToken, autorizarRole("admin"), usuarioController.deletarUsuario);

module.exports = router;