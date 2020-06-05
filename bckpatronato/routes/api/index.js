//Función de Conmutador de las Entidades del API
//Va a UNIR todas las rutas de las Entidades del Proyecto (sec y mocion)


var express = require('express');
var router = express.Router();


//SE UNE CADA ENTIDAD EN UN SOLO ELEMENTO PARA EXPONERLO

//1. Incorporar las rutas
//Se coloca solo el nombre de la carpeta, pero no el index.js ya que por ser nombrado index lo toma automaticamente
var secRoutes = require('./sec');
var mocionRoutes = require('./mocion');


//2. Exponer las Rutas
//Se indica: La carpeta donde estan esas rutas y las rutas que se van a exponer (Guardadas anteriormente)
//Se usa todo lo que esta en la carpeta que ya viene en la variable
router.use('/sec', secRoutes);
router.use('/mocion', mocionRoutes);


module.exports = router;