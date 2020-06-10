//Pantalla de Inicio de Donaciones

var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
    res.status(200).json({"msg":"Entro a Principal Donaciones. Documentacion"});
}); //get /


router.get('/user', function(req, res){
    res.status(200).json({ "msg": "Entro a Principal Donaciones Para Usuarios. Sus opciones" });
}); // get /user

router.get('/empresa', function (req, res) {
    res.status(200).json({ "msg": "Entro a Principal Donaciones Para Empresas. Sus opciones" });
}); // get /empresa


module.exports = router;