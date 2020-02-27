const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const { verificaTokenImg } = require('../middlewares/autenticacion');


//
app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;



    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);


    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        //Aqui se crea un path absoluto
        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');

        //esta funcion lee el tipo del contenido del archivo y lo regresa
        res.sendFile(noImagePath);
    }


});
















module.exports = app;