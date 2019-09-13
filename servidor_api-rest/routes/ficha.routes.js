let express = require('express');

let app = express();

let Ficha = require('../models/ficha.model'); //llamado del modelo ficha
let Paciente = require('../models/paciente.model');//llamado del modelo paciente


//Busqueda de los datos del paciente
app.get('/',(req,res) => {
    Ficha.find()
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
    });
    ficha.save((err, newFicha)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                err: err
            });
        }
        return res.status(201).json({
            ok: true,
            ficha: newFicha
        })
    })
});

app.post('/paciente',(req,res)=>{
    let body = req.body
    let paciente = new Paciente({
        nombre: body.nombre,
        rut: body.rut,
        fecha_nacimiento: body.fecha_nacimiento,
        sexo: body.sexo,
        direccion: body.direccion,
        prevision: body.prevision,
        grupo_sangre: body.grupo_sangre,
        estatura_paciente: body.estatura_paciente,
        fono: body.fono
    })
    paciente.save((err, newPaciente)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                err: err
            });
        }
        return res.status(201).json({
            ok: true,
            ficha: newPaciente
        })
    })
});

app.put('/:id',(req,res)=>{
    let ficha_new = req.body
    Ficha.findOneAndUpdate({_id:req.params.id},
        ficha_new,
        {new: true},
        (err, fichanueva)=>{
            if (err) res.status(400).json(err)
            res.status(200).json(fichanueva)
        })
});

//busqueda paciente
app.get('/paciente/:id',(req,res)=>{
    Ficha.findOne({'paciente':req.params.id})
    .populate({path:'paciente',model:Paciente})
    .exec((err,ficha)=>{
        if (err){res.status(400).json({err:err})}
        res.status(200).json(ficha)
    })  
});
//busqueda ficha
app.get('/folio/:folio',(req,res)=>{
    Ficha.findOne({folio:req.params.folio})
        .populate( {path:'paciente',model:Paciente})
        .exec((err,ficha)=>{
            if (err){res.status(400).json({err:err})}
            res.status(200).json(ficha)
        })
});
app.get('/rut/:rut',(req,res)=>{
    Ficha.find()
        .populate( {path:'paciente',model:Paciente})
        .exec((err,fichas)=>{
            if (err){res.status(400).json({err:err})}
            let ficha = fichas.filter(f =>f.paciente.rut == req.params.rut);  
                      
            res.status(200).json(ficha[0])
            
        })
});

module.exports = app;
