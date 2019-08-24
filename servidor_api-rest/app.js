const express = require('express');  
const bodyParser = require('body-parser');  
const mongoose = require('mongoose');     
const config = require('./config/config');      // carga las constantes de configuracion


var app = express() // instancia el servidor de express

/* Configuracion de las cabeceras y CORS para que no fallen consultas desde otro dominio  */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});
// Body Parser  para recivir JSON desde las peticiones
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res, next)=>{        // escucha una peticion GET en el servidor
    res.status(200).jsonp({ok: true, mensaje: 'Todo Bien'});    // respuesta para peticion al servidor
});


// Conexion al servidor de MongoDB
mongoose.connect(config.URL_MONGO,{     // conecta al Servidor con la direccion desde el archivo config  
    useCreateIndex: true,
    useNewUrlParser: true}, err => {    
    if (err) throw err;                 // detiene todo si existe algun error en la conexion 
    console.log('Conexion MongoDB: \x1b[32m%s\x1b[0m', 'online');    // mensaje para saber que la conexion se realizo correctamente
});

app.listen(config.PUERTO, ()=>{
    console.log(`Servidor Express corriendo en el puerto ${config.PUERTO} \x1b[32m%s\x1b[0m`,'online');       // mensaje para saber si el servidor inicio correctamente
});