let express = require('express');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');          // carga la libreria del JSON Web Token de Auth0
let config = require('../config/config');       // carga el archivo de configuracion

let app = express();

let Noticia = require('../models/noticias.model'); 
let mdVerificaToken = require('../middlewares/auth');


// Nuevo Noticia
app.post('/',mdVerificaToken.verificaToken, (req, res) => {
    let body = req.body;
    let noticia = new Noticia({
        titulo: body.titulo,            //lo que biene despues del body es el nombre que esta en el formulario 
        resumen: body.resumen,
        cuerpo: body.cuerpo,
        imagen: body.imagen,
    });
    noticia.save((err, newNoticia) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msj: 'Error al crear usuario',
                errors: err
            });
        }
        
        return res.status(201).json({
            ok: true,
            noticia: newNoticia
        });
    });
});


// Actualizar Noticia
app.put('/', mdVerificaToken.verificaToken, (req, res) => {
    let newUsuario = {      // crea un nuevos datos de la noticia lo mismo que esta en el modelo 
        titulo: req.body.titulo,
       
        activo: req.body.activo,
        roles: req.body.roles
    };
    Usuario.findOneAndUpdate({_id: req.body._id},    // busca el usuario por el id recibido de la validacion del token
        newUsuario,         // datos del usuario por actualizar
        {new: true},        // para devolver el usaurio modificado o no
        (err, usuario)=>{   // callback del metodo 

            if(err) res.status(500).jsonp({ok:false, mensaje: 'Error al Actualizar Usuario', errors: err});
            usuario.password = null;    // cambia la contraseña para no devolverla al cliente
            let token = jwt.sign({usuario: usuario}, config.SEEDJWT, {expiresIn: 14400});   // genera el token con la clave desde el archivo config. dentro del token esta el objeto de usuario con su informacion con una vigencia de 4 hrs
            res.status(200).jsonp({ok: true, usuario: usuario, token: token}); // si todo esta OK devuelve el nuevo objeto al cliente
    });
});
// Obtiene todos los Usuarios
app.get('/', mdVerificaToken.verificaToken, (req, res) => {    
    Usuario.find({}, 'nombre email img roles Activo2FA activo') // que datos del usuario devolver de la consulta
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        msj: 'Error al consultar usuarios',
                        errors: err
                    });
                }
                return res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            }
        );
});



module.exports = app;