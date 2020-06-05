//Rutas para la Entidad de Mociones

var express = require('express');
var router = express.Router(); //Devuelve una instancia del Router


//Ruta hacia la raíz. Es buena práctica poner documentación de la API aquí
router.get('/', function(req, res){
    res.status(200).json
    (
        [
            {
                route:"/",
                description:"Muestra Documentación del API de Mociones",
                body:"",
                params:"",
                res:"json"
            }
        ]
    );
}); //get /


//Para exponerlo
module.exports = router;