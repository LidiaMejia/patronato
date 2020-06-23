///// FUNCIONES HACIA LA BDD \\\\\

const db = require('../../dao/db'); //Acceder a la clase de la BDD, donde esta la conexion (Singleton)

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
                return cuentas.toArray();
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