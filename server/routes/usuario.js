const express = require('express');

const Usuario = require('../models/usuario');

const app = express();

const bcrypt = require('bcrypt');

const _ = require('underscore');


app.get('/usuario', function(req, res) {

    //
    let desde = req.query.desde || 0;
    desde = Number(desde); //transformó el String a un Número
    let limite = req.query.limite || 5;
    limite = Number(limite);


    Usuario.find({ estado: true }, 'nombre ') // aqui se muestran los campos que estaran en la vista
        .skip(desde) //salta los primeros (x) en la lista y muestra los sgts
        .limit(5) //limita el numero de usuarios en la lista de la vista
        .exec((err, usuarios) => { //ejecutalo

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            })

            //  usuarioDB.password = null; //Esto sirve para que en la vista
            //No se vea la contraseña, ya que el usuario no necesita ver la 
            //información de la contraseña que se encriptó

        })
});

app.post('/usuario', function(req, res) {

    let body = req.body;


    let usuario = new Usuario({

        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            usuario: usuarioDB
        });

        //  usuarioDB.password = null; //Esto sirve para que en la vista
        //No se vea la contraseña, ya que el usuario no necesita ver la 
        //información de la contraseña que se encriptó


    });


});


app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })



});


app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => { //Caso anterior
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });

        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });


    })




});

module.exports = app;