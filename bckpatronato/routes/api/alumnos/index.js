///// Rutas para Alumnos \\\\\\


//Siempre hacemos el require de express y el exports de router pero AHORA USAMOS const (Constantes) y let (Variables) en lugar de var. POR ES6
const express = require('express');
let router = express.Router();
let model = require('./cuentas.model'); //Variable hacia el modelo de base de datos


// INICIALIZAR EL MODELO DE DATOS AL INICIO
const init = async ()=>{ 
    await model.initModel();
} 
init();


//GET DE LAS CUENTAS DE TODOS LOS ALUMNOS
router.get('/', async (req, res)=>{
    try
    {
        let alumnos = await model.getAll();
        res.status(200).json(alumnos);
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({"ERROR":"Algo salió mal :( Por favor intente de nuevo"});
    }
}); // get /


//GET DE UN ALUMNO POR ID
router.get('/one/:id', async (req, res)=>{
    try
    {
        let id = req.params.id;
        let cuenta = await model.getOne(id);
        res.status(200).json(cuenta);
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({ "ERROR":"Algo salió mal :( Por favor intente de nuevo"});
    }
}); //get /one/:id


//GET DE UN ALUMNO POR CUENTA
router.get('/cuenta/:cuenta', async (req, res)=>{
    try
    {
        let cuenta = req.params.cuenta;
        let alumByCuenta = await model.getByCuenta(cuenta);
        res.status(200).json(alumByCuenta);
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({ "ERROR":"Algo salió mal :( Por favor intente de nuevo"});
    }
}); //get /cuenta/:cuenta


//POST AGREGAR ALUMNO
router.post('/new', async (req, res)=>{
    try
    {
        let {cuenta, nombre} = req.body;
        const result = await model.addOne(cuenta, nombre);
        res.status(200).json(result); //Por ahora mostramos el resultado
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({ "ERROR": "Algo salió mal :( Por favor intente de nuevo"});
    }
}); // post /new



module.exports = router;

