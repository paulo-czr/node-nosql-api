module.exports = function autorizarRole(...regrasPermitidas) {
  return (req, res, next) => {
    
    if (!req.usuario) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    // Verifica se a regra do usuário está inclusa nas regras permitidas
    if (!regrasPermitidas.includes(req.usuario.regra)) {
      return res.status(403).json({ message: "Acesso negado: permissão insuficiente." });
    }
    next();
  };
};