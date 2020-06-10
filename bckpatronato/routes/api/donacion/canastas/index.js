var express = require('express');
var router = express.Router();


//En teoria se gestionarian las mismas acciones, solo cambia pantalla de inicio
router.get('/', function(req, res){
    res.status(200).json({"msg":"Todo bien. Ruta raiz de Canastas. Documentación..."});
}); //get /


router.get('/armar', function(req, res){
    res.status(200).json({"msg":"ARMA TU CANASTA"});
}); //get /armar

router.get('/predt', function(req, res){
    res.status(200).json({"msg":"CANASTAS PREDETERMINADAS"});
}); //get /predt

router.get('/addOne', function (req, res) {
    res.status(200).json({ "msg": "CANASTAS PREDETERMINADAS" });
}); //get /predt


module.exports = router;