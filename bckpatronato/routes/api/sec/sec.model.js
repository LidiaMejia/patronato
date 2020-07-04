////////     MODELADO DE SEGURIDAD     \\\\\\\\\\\


let db = require('../../dao/db');

//Colecciones
let userColl;

module.exports = class
{
    //Funcion para Inicializar modelo
    static async InitModel()
    {
        //Si no esta asignada
        if(!userColl)
        {
            let _db = await db.getDB();
            userColl = await _db.collection('usuarios');

            /* Al obtener la colección se asignan los índices que va a poseer. 
               Esto permite que las búsquedas sean mucho más óptimas y no se generen cuellos de botella o lags. 
               PERO ESTO NO ES ADECUADO EN UN AMBIENTE DE PRODUCCIÓN (Solo la primera vez se crean, después no se tocan), 
               POR LO QUE SE NECESITA COLOCAR UNA CONDICIÓN HACIENDO USO DE LAS VARIABLES DE ENTORNO. 
               
               Se cambia entonces en el .env:
               ENSURE_INDEX = 1 //Primera vez 
               ENSURE_INDEX = 0 //Ya se crearon */
            if(process.env.ENSURE_INDEX == '1')
            {
                //Si el índice no existe, lo crea para ese campo de manera única. 1 es orden ascendente y -1 es descendente
                await userColl.createIndex({"email":1}, {unique:true});
                console.log('Indices Creados');
            }

            console.log('Colección de Usuarios asignada');
            return;
        }
        else
        {
            return;
        }
    } //initModel()

}