let express = require('express');

let app = express();

let Ficha = require('../models/ficha.model'); //llamado del modelo ficha
let Paciente = require('../models/paciente.model');//llamado del modelo paciente


//Busqueda de los datos del paciente
app.get('/',(req,res) => {
    ficha.find()
        .populate({path:'paciente', model: Paciente})
        .exec((err,fichas)=>{
            if(err) res.send(500,err);
            res.status(200).json(fichas);
        })
});

//Guardado en DB
app.post('/',(req,res)=>{
    let body = req.body
    let ficha = new Ficha({
        folio:body.folio,
        paciente: body.paciente,
        fecha_ingreso:body.fecha_ingreso,
        arquetipos: body.arquetipos
    })
    ficha.save((err, newFicha)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                msj: 'Error al crear la ficha'
            });
        }
        return res.status(201).json({
            ok: true,
            ficha: newFicha
        })
    })
})
//busqueda paciente
app.get('/paciente/:id',(req,ress)=>{
    Ficha.findOne({paciente:req.param.id})  
})
//busqueda ficha
app.get('/folio/:folio',(req,ress)=>{
    Ficha.findOne({folio:req.param.folio})
        .populate( {path:'paciente',model:Paciente})
        .exec((res,ficha)=>{
            res.status(200).json(ficha)
        })
})


