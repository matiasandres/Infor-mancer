const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Datos Fijos

//Opcion de Conteo de Visitas 


const detalleSchema=new Schema({
    titulo:{type:String},
    resumen:{type:String},
    cuerpo:{type:String},
    imagen:{type:String},

})

module.exports= mongoose.model('noticia',detalleSchema);