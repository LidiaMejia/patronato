//////////  SE ENCARGA DE LA CONEXION A LA BASE DE DATOS  \\\\\\\\\\\\

//Obtener de la libreria de mongodb el objeto llamado Client, como en el CMD para empezar a trabajar en la base
let mongoClient = require('mongodb').MongoClient;
let _db; //Variable puntero hacia la base de datos


/// Patrón Singleton --> Solo se instancia una vez la conexion a la base de datos.

//Publicar una clase anónima con un metodo para obtener el puntero hacia la BDD
module.exports = class
{
    //Definir metodo para obtener BDD. Static para que pueda ser usado sin instanciar la clase y async para usar PROMESAS
    static async getDB()
    {
        //Si el puntero ya tiene un valor, solo se envia ese valor
        if(_db)
        {
            return _db;
        }
        else
        {
            //PROMESA. Siempre va en un try/catch
            try
            {
                //Conectamos el cliente a la URI que definimos en las variables de entorno y un parametro que pide mongo que se agregue
                let client = await mongoClient.connect(process.env.MONGODBURI, {useNewUrlParser: true, useUnifiedTopology: true});
                _db = client.db(process.env.MONGODBNAME); //Obtener puntero hacia la BDD definida en las variables de entorno
                return _db;
            }
            catch(e)
            {
                console.log(e);
                process.exit(1); //Cerrar proceso de toda la API
            }
        }
    } //fin static async getDB
}

