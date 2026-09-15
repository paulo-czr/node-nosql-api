const bcrypt = require('bcrypt');

async function hashSenhaHook() {
    if (!this.isModified('senha')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
    } catch (error) {
        const customError = new Error('Falha ao processar a criptografia da senha.');
        customError.status = 500;
        customError.originalError = error.message;
        
        throw customError;
    }
}

module.exports = hashSenhaHook;