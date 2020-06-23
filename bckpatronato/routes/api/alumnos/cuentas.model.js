///// FUNCIONES HACIA LA BDD \\\\\

const db = require('../../dao/db'); //Acceder a la clase de la BDD, donde esta la conexion (Singleton)
const ObjectId = require('mongodb').ObjectId; //Para buscar por _id un dato específico

//Definir variables puntero para cada coleccion en la BDD. Variables Globales | Cloujure
let cuentasColl;


//Exportar modelo de datos.
//LOS MODELOS DE DATOS SON CLASES QUE CONTIENEN SOLO MÉTODOS ESTÁTICOS

module.exports = class
{
    //SIEMPRE AL INICIO Establecer la conexion a la coleccion deseada (Singleton)
    static async initModel(){
        if(!cuentasColl)
        {
            let _db = await db.getDB(); //Conectarse a la BDD
            cuentasColl = await _db.collection('alumnos'); //Conectarse a la colección
            console.log('Colección de Alumnos asignada'); //Ver nosotros si ya entró aquí a asignar la colección
            return;
        }
        else
        {
            return; //Si ya esta asignada la colección al puntero, no hace nada
        }
    }


    //Metodos Operativos. Acciones con la colección
    static async getAll()
    {
        try
        {
            if (cuentasColl) {
                let cuentas = await cuentasColl.find();
                return cuentas.toArray(); //Se convierte a Array porque son varios datos los que trae
            }
            else {
                return [];
            }
        }
        catch(e)
        {
            console.log(e);
            return e;
        }
    }


    /**
    * Para poder trabajar con un dato especifico se utilizan FILTROS como en los "where" de los querys: select * from alumnos where _id = '';
    *
    * Para hacer esto en MongoDB se crea un objeto JSON con los atributos que se desean buscar. Se puede hacer con cualquier dato, pero
    * es mejor usar la llave primaria _id para identificar de manera única.
    * 
    * Pero el _id es de tipo ObjectId (Representación binaria de un texto), 
    * por lo que se debe convertir el string para poder buscar el documento. SE IMPORTA LA LIBRERIA ARRIBA
    */
    static async getOne(id)
    {
        try
        {
            let filter = {"_id": new ObjectId(id)};
            let cuenta = await cuentasColl.findOne(filter);
            return cuenta;
        }
        catch(e)
        {
            console.log(e);
            return e;
        }  
    }


    static async getByCuenta(cuenta)
    {
        try
        {
            let filter = {"cuenta":cuenta};
            let AlumByCuenta = await cuentasColl.findOne(filter); //findOne() obtiene solo el primer dato en caso de repetidos
            return AlumByCuenta;
        }
        catch(e)
        {
            console.log(e);
            return e;
        }
    }


    static async addOne(cuenta, nombre)
    {
        try
        {
            const newAlumno = {cuenta, nombre} //Objeto JSON
            const result = await cuentasColl.insertOne(newAlumno);
            return result; //Por ahora devolvemos el result
        }
        catch(e)
        {
            console.log(e);
            return e;
        }
    }




} //fin class