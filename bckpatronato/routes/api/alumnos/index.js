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
    catch(err)
    {
        console.log(err);
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
    catch(err)
    {
        console.log(err);
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
    catch(err)
    {
        console.log(err);
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
    catch(err)
    {
        console.log(err);
        res.status(500).json({ "ERROR": "Algo salió mal :( Por favor intente de nuevo"});
    }
}); //post /new


//PUT AUMENTAR LIKES
router.put('/like/:id', async (req, res)=>{
    try
    {
        let id = req.params.id;
        const result = await model.like(id);
        res.status(200).json(result);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ "ERROR":"Algo salió mal :( Por favor intente de nuevo"});
    }
}); //put/like/:id


//PUT AUMENTAR DISLIKES
router.put('/dislike/:id', async (req, res)=>{
    try
    {
        let id = req.params.id;
        const result = await model.dislike(id);
        res.status(200).json(result);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ "ERROR":"Algo salió mal :( Por favor intente de nuevo"});
    }
}); //put /dislike/:id


module.exports = router;

