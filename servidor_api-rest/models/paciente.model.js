const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pacienteSchema = new Schema({
    nombre: { type: String, required: [true, "El nombre del paciente debe ser completo"] },
    rut: { type: String, required: [true, "Sin digito verificador"] },
    fecha_nacimiento: { type: String, default: 0 },
    sexo: { type: String, required: [true, "Hombre o Mujer"] },
    direccion: { type: String, required: [true, "Direccion actual del Paciente"] },
    prevision: { type: String, required: [true, "Fonasa o Isapre"] },
    grupo_sangre: { type: String, required: [true, "Tipo de sangre completo, Ejemplo: AO+"] },
    estatura_paciente: { type: Number, default: "None" },
    fono: { type: String, required: [true, "Telefono o celular"] }
});

module.exports = mongoose.model('Paciente', pacienteSchema); //Exportar el Modulo