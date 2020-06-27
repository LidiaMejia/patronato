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


    ////////////////////// Metodos Operativos. Acciones con la colección
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
        catch(err)
        {
            console.log(err);
            return err;
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
            let cuenta = await cuentasColl.findOne(filter); //findOne() obtiene solo un dato (El primer dato en caso de repetidos)
            return cuenta;
        }
        catch(err)
        {
            console.log(err);
            return err;
        }  
    }


    static async getByCuenta(cuenta)
    {
        try
        {
            let filter = {"cuenta":cuenta};
            let AlumByCuenta = await cuentasColl.findOne(filter);
            return AlumByCuenta;
        }
        catch(err)
        {
            console.log(err);
            return err;
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
        catch(err)
        {
            console.log(err);
            return err;
        }
    }


    /**
     * Para ACTUALIZAR un dato se necesita: 
     * 
     * filtro -> Saber que documento (registro) se va a actualizar
     * y lo que se va a actualizar:
     * "$set" -> Es para actualizar datos, existan o se agreguen a un registro
     * "$inc" -> Es para aumentar o decrementar un contador
     * 
     * En caso de que se deseen actualizar TODOS LOS REGISTROS se debe DEJAR EL FILTRO VACIO {} y COLOCAR UN TERCER PARAMETRO {multi:true}
     */

    static async like(id)
    {
        try
        {
            let filtro = {"_id": new ObjectId(id)};

            //Se agrega un TimeStamp universal de Linux para después obtener el valor de fecha en forma local
            let update = {"$inc":{"like":1}, "$set":{"last_modified": new Date().getTime()}};
            const result = await cuentasColl.updateOne(filtro, update);
            return result;
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }


    static async dislike(id)
    {
        try
        {
            let filtro = {"_id": new ObjectId(id)};
            let update = {"$inc":{"dislike":1}, "$set":{"last_modified": new Date().getTime()}};
            const result = await cuentasColl.updateOne(filtro, update);
            return result;
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }


    static async deleteOne(id)
    {
        try
        {
            let filtro = {"_id": new ObjectId(id)};
            const result = await cuentasColl.deleteOne(filtro);
            return result;
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }



    /**
     * FUNCIONES MÁS ESPECÍFICAS, COMO POLÍTICAS DE NEGOCIO ---> INIGUALDADES O INEQUIDADES
     * 
     * Por ejemplo si se desean obtener los alumnos que tengan dislike mayores a 3 para generar una advertencia e informarle al alumno,
     * u obtener los alumnos que tengan entre 1 y 3 dislikes o que tenga 0 o 3 dislikes...
     * 
     * Para esto MongoDB tiene funciones que emulan el uso de >, <, >=, <=, !=, between, and, or:
     * "$lt" ->  less than (Menor que)
     * "$gt" ->  greater than (Mayor que)
     * "$gte" -> greater than equal (Mayor o igual)
     * "$lte" -> less than equal (Menor o igual)
     * "$ne"  -> not equal (No es igual)
     * 
     * "$or":[]  ->  ARREGLO DE FILTROS \  Estos son arreglos porque se debe poner 
     * "$and":[] ->  ARREGLO DE FILTROS /  el filtro 2 veces en la sentencia
     * 
     * SE COLOCA PRIMERO EL DATO A COMPARAR Y DESPUÉS LA COMPARACIÓN
     */

     //OBTENER ALUMNOS CON DISLIKE MAYOR A 5
    static async getWarningAlumnos()
    {
        try
        {
            let query = {"dislike":{"$gt":5}};
            let result = await cuentasColl.find(query);
            return result.toArray();
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }


} //fin class