const express = require('express');
let router = express.Router();
let model = require('./miembros.model');

//INICIALIZAR MODELO
const init = async()=>{
    await model.initModel();
}
init();


//RUTAS
router.post('/new', async(req, res)=>{
    try
    {
        let {colonia, departamento, municipio, barrio_seguro, longitud, latitud, radio_km} = req.body;

        //CONVERTIR A SU TIPO DE DATO CORRESPONDIENTE PARA GUARDAR EN LA BDD
        barrio_seguro = barrio_seguro && true; //Booleano
        longitud = parseFloat(longitud);
        latitud = parseFloat(latitud);
        radio_km = parseInt(radio_km);

        const result = await model.addOne(colonia, departamento, municipio, barrio_seguro, longitud, latitud, radio_km);
        res.status(200).json(result);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({"ERROR":"Algo salió mal :( Por favor intenta de nuevo"});
    }
}); //post /newColonia


router.get('/near/:long/:lat', async(req, res)=>{
    try
    {
        let {long, lat} = req.params;
        long = parseFloat(long);
        lat = parseFloat(lat);
        
        const result = await model.inColonia(long, lat);
        res.status(200).json(result);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ "ERROR":"Algo salió mal :( Por favor intenta de nuevo"});
    }
}); //get /near/:long/:lat




module.exports = router;