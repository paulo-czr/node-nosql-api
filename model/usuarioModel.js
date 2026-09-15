const mongoose = require("mongoose");
const hashSenhaHook = require("../hook/hashSenha");

const usuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true,
    },
    idade: {
        type: Number,
        min: 0,
    },
    usuario: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    senha: {
        type: String,
        required: true,     
    },
    regra: {
        type: String,
        enum: ["usuario", "admin"],
        default: "usuario",
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.senha;
            delete ret.__v;
            return ret;
        }
    }
});

usuarioSchema.pre('save', hashSenhaHook);

module.exports = mongoose.model("Usuario", usuarioSchema);