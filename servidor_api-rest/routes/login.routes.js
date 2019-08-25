let express = require('express');
let bcrypt = require('bcryptjs');           // libreria para comparar y encriptar las contraseñas
let jwt = require('jsonwebtoken');          // carga la libreria del JSON Web Token de Auth0
let config = require('../config/config');       // carga el archivo de configuracion

let app = express();

let Usuario = require('../models/usuario.model');

app.post('/', (req, res) => {       // Solicitud POST de la ruta para iniciar sesion
    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuario) => {      // busca un usuario por el email recibido de la consulta
        if (err) {      // si la consulta a la BD genera algun error
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!usuario) {  // si no existe un usuario con ese email
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario no existe',
            });
        }

        if (!bcrypt.compareSync(body.password, usuario.password)) {  // si la contraseña encriptada de la BD no coincide con la recibida desde la consulta
            return res.status(400).json({
                ok: false,
                mensaje: 'Contraseña incorrecta',
            });
        }
        usuario.password = null;        // si la contraseña es correcta la quita del objeto para no enviarla al cliente en el objeto del usuario
        // Crear Token  14400seg = 4horas
        let token = jwt.sign({usuario: usuario}, config.SEEDJWT, {expiresIn: 14400});   // genera el token con la clave desde el archivo config. dentro del token esta el objeto de usuario con su informacion con una vigencia de 4 hrs

        return res.status(200).json({   //  envia al cliente el objeto con el token
            ok: true,
            usuario: usuario,
            token: token,
            id: usuario.id
        });
    });
});


module.exports = app;