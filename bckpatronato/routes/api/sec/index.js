//Rutas de la Entidad de Seguridad

const express = require('express');
let router = express.Router();
let model = require('./sec.model');

//Inicializar Modelo
const init = async()=>{
    await model.InitModel();
}
init();


//Ruta hacia la raíz. Es buena práctica poner documentación de la API aquí
// router.get('/', function(req, res){
//     res.status(200).json
//     (
//         [
//             {
//                 router:"/",
//                 description:"Muestra Documentación de la API de Seguridad",
//                 body:"",
//                 params:"",
//                 res:"json"
//             }
//         ]
//     )
// }); //get /





module.exports = router;