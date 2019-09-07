const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Datos Fijos 

const arquetipoSchema = new Schema({
    folio: { type: String },
    campos: []
});

module.exports = mongoose.model('Arquetipo', arquetipoSchema); //Exportar el Modulo