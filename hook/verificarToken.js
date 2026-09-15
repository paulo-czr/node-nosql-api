const jwt = require('jsonwebtoken');
require("dotenv").config()

module.exports = function verificarToker(req, res, next){
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token não fornecido ou formato inválido." });
    }
    // Token sem o "Bearer "
    const token = authHeader.split(" ")[1]; 

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = payload;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido ou expirado." });
    }

}