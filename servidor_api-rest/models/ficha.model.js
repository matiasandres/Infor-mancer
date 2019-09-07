const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Datos Fijos 

const fichaSchema = new Schema({


    folio: { type: Number, required: [true, "Numero de ingrso del paciente"] },
    paciente: { type: String, required: [true, "El nombre del paciente debe ser completo"] },
    fecha_ingreso: { type: Date, requiered: [true, "Primer Ingreso del Paciente "] },
    arquetipos: []





});

module.exports = mongoose.model('Ficha', pacienteSchema); //Exportar el Modulo