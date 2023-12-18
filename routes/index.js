const express = require('express');
const fs = require('fs');
const router = express.Router();

const PATH_ROUTES = __dirname; // __dirname es una variable global que contiene la ruta del archivo actual 

// Obtener todas las rutas de la carpeta routes
const quitarExtension = (nombreArchivo) => {
    return nombreArchivo.split('.').shift();
}

fs.readdirSync(PATH_ROUTES).filter( file => {
    const nombre   = quitarExtension(file);
    if(nombre !== 'index') {
        let ruta = require(`./${nombre}`);
        router.use(`/${nombre}`, ruta);
    }
})

module.exports = router;