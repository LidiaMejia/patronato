//Rutas de la Entidad de Seguridad

var express = require('express');
var router = express.Router();


//Ruta hacia la raíz. Es buena práctica poner documentación de la API aquí
router.get('/', function(req, res){
    res.status(200).json
    (
        [
            {
                router:"/",
                description:"Muestra Documentación de la API de Seguridad",
                body:"",
                params:"",
                res:"json"
            }
        ]
    )
}); //get /



module.exports = router;