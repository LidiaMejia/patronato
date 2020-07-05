//Rutas de la Entidad de Seguridad

const express = require('express');
let router = express.Router();
let model = require('./sec.model');
let jwt = require('jsonwebtoken');

//Inicializar Modelo
const init = async()=>{
    await model.InitModel();
}
init();


//Rutas
router.get('/usuarios', async (req, res)=>{
    try
    {
        let usuarios = await model.getAll();
        res.status(200).json(usuarios);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ "ERROR":"Algo salió mal :( Por favor intente de nuevo"});
    }
}); //get /usuarios


router.post('/register', async(req, res)=>{
    try
    {
        let {email, password} = req.body;
        const result = await model.addOne(email, password);
        res.status(200).json({"msg":"Usuario registrado con exito"});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({"ERROR":"Algo salió mal :( Por favor intente de nuevo"});
    }
}); //post /register


router.post('/login', async (req, res)=>{
    try
    {
        let {email, password} = req.body;
        //Aqui van las validaciones como sintaxis, en blanco etc...

        let user = await model.getByEmail(email); //Obtener datos del usuario

        //Si coinciden las contraseñas
        if(await model.comparePassword(password, user.password))
        {
            //Limpiar los datos del usuario para tener solo los necesarios
            const {_id, email, roles} = user;
            const jUser = {_id, email, roles};

            //Generar TOKEN (JWT). SE NECESITA LA LIBRERÍA 
            //Se coloca el usuario del token, la palabra clave de encriptación y la duración (Hasta 3 días)
            let token = jwt.sign(jUser, process.env.JWT_SECRET, {expiresIn:'120m'});

            res.status(200).json({...jUser, "JWT": token}); 
        }
        else
        {
            res.status(401).json({"ERROR":"Credenciales no Válidas"});
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ "ERROR":"Algo salió mal :( Por favor intente de nuevo"});
    }
}); //post /login


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