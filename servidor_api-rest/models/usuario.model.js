const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;   // 

const usuarioSchema = new Schema({      // datos de objeto usuario permitidos
    nombre: {type: String, required: [true, "El nombre del usuario es obligatorio"]},
    email: {type: String, unique:true, required: [true, "El email es obligatorio"]},
    password: {type: String, required: [true, "La contraseña es obligatoria"]},
    TwoFA: {type: String, default:''},      
    TwoFAActivo: {type: Boolean, default: false},
    roles: []
});

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} tiene que ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);          // Exporta el Modelo