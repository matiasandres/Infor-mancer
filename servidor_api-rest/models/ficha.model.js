const mongoose = requiere('mongoose');
const Schema = mongoose.Schema;

const fichaSchema = new Schema({
    folio: { type: Number, required: [true, "Numero de ingrso del paciente"] },
    nombre_paciente: { type: String, required: [true, "El nombre del paciente debe ser completo"] },
    estatura_paciente: { type: Number, default: "None" },
    sexo: { type: String, required: [true, "Hombre o Mujer"] },
    rut: { type: String, required: [true, "Sin digito verificador"] },
    direccion: { type: String, required: [true, "Actual del Paciente"] },
    fecha_nacimiento: { type: String, required: [true] },
    grupo_sangre: { type: String, required: [true, "Tipo de sangre completo, Ejemplo: AO+"] },


    nombre_doctor: { type: String, required: [true, "El nombre del medico debe ser completo"] },
    nombre_asistente: { type: String, default: "None" },
    diagnostico: { type: String, required: [true, "Sintomas"] },



    tipo_tratamiento: { type: String, required: [true, "Tratamiento detallado del paciente"] },
    examanes: { type: String, requiered: [true, "Examen, ademas de un resultado datallado de este mismo"] },
    entrevista_clinica: { type: String, requiered: [true, "Resumen de entrevista, inicio de molestias, sintomas, etc"] }


});

module.exports = mongoose.model('Ficha', pacienteSchema); //Exportar el Modulo