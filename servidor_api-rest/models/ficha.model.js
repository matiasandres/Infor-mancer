const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Datos Fijos 

const fichaSchema = new Schema({
    folio: { type: Number, required: [true, "Numero de ingrso del paciente"] },
    paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente'},
    fecha_ingreso: { type: Date, requiered: [true, "Primer Ingreso del Paciente "] },
    arquetipos: [],

});
module.exports = mongoose.model('ficha', fichaSchema);
