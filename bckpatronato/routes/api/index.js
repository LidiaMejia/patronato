//Función de Conmutador de las Entidades del API
//Va a UNIR todas las rutas de las Entidades del Proyecto (sec y mocion)


var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportJWT = require('passport-jwt');

var strategyJWT = passportJWT.Strategy;  //Clase para Definir la Estrategia
var extractJWT = passportJWT.ExtractJwt; //Clase para Extraer el JWT


//Usar una nueva estrategia de Autenticación con JWS
passport.use(
    new strategyJWT(
        {
            jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(), //De la solicitud extraigo el JWT como Bearer Token
            secretOrKey: process.env.JWT_SECRET                       //Y se debe desencriptar con la cadena de .env
        },
        //El segundo parámetro es una función anónima donde están todos los datos guardados del Login y el Next para seguir con la sig ruta
        (payload, next)=>{
            var user = payload; //Tomar datos del Login
            return next(null, user); //Retornar a la siguiente ruta con los datos del usuario
        }
    )
)



//SE UNE CADA ENTIDAD EN UN SOLO ELEMENTO PARA EXPONERLO

//1. Incorporar las rutas
//Se coloca solo el nombre de la carpeta, pero no el index.js ya que por ser nombrado index lo toma automaticamente
var secRoutes = require('./sec');
var mocionRoutes = require('./mocion');
var alumnosRoutes = require('./alumnos');
//var donacionRoutes = require('./donacion');
//var canastasRoutes = require('./donacion/canastas');


//2. Exponer las Rutas
//Se indica: La carpeta donde estan esas rutas y las rutas que se van a exponer (Guardadas anteriormente)
//Se usa todo lo que esta en la carpeta que ya viene en la variable

//Rutas Públicas
router.use('/sec', secRoutes);

//Rutas Privadas
//Crear un Middleware para que active la estrategia y autorize entrar a las rutas solo a los usuarios cuyo JWT lo permite
const jwtMiddleware = passport.authenticate('jwt', {session:false});


router.use('/mocion', jwtMiddleware, mocionRoutes);
router.use('/alumnos', jwtMiddleware, alumnosRoutes); 
//router.use('/donacion', donacionRoutes);
//router.use('/donacion/canastas', canastasRoutes);


module.exports = router;