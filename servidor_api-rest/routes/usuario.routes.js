let express = require('express');
let bcrypt = require('bcryptjs');

let app = express();

let Usuario = require('../models/usuario.model');
let mdVerificaToken = require('../middlewares/auth');


// Nuevo Usuario
app.post('/', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    });
    usuario.save((err, newUsuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msj: 'Error al crear usuario',
                errors: err
            });
        }
        newUsuario.password = null;
        return res.status(201).json({
            ok: true,
            usuario: newUsuario
        });
    });
});

// Actualizar Usuario
app.put('/', mdVerificaToken.verificaToken, (req, res) => {
    let newUsuario = {      // crea un nuevo usuario para ejecutar los cambios
        nombre: req.body.nombre,
        password: bcrypt.hashSync(req.body.password, 10),
        token2FA: req.body.token2FA,
        Activo2FA: req.body.Activo2FA,
        activo: req.body.activo
    };
    Usuario.findOneAndUpdate({_id: req.usuario._id},    // busca el usuario por el id recibido de la validacion del token
        newUsuario, // datos del usuario por actualizar
        {new: true},   // para devolver el usaurio modificado o no
        (err, usuario)=>{   // callback del metodo 

            if(err) res.status(500).jsonp({ok:false, mensaje: 'Error al Actualizar Usuario', errors: err});
            usuario.password = null;    // cambia la contraseña para no devolverla al cliente
            res.status(200).jsonp({ok: true, usuario: usuario}); // si todo esta OK devuelve el nuevo objeto al cliente
    });
});



module.exports = app;