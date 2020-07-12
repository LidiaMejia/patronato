const db = require('../../dao/db');
let ObjectId = require('mongodb').ObjectId;

//Colecciones
let coloniasColl

module.exports = class
{
    //INICIALIZAR MODELO
    static async initModel()
    {
        if(!coloniasColl)
        {
            let _db = await db.getDB();
            coloniasColl = await _db.collection('colonias');
            console.log('Colección de Colonias asignada');

            //INDICES
            if(process.env.ENSURE_INDEX == '1')
            {
                await coloniasColl.createIndex({"ubicacion":"2dsphere"});
                console.log("Índice de Colonias creado");
            }

            return;
        }
        else
        {
            return;
        }
    }

    //MÉTODOS OPERATIVOS

    static async addOne(colonia, departamento, municipio, barrio_seguro, longitud, latitud, radio_km)
    {
        try
        {
            let newColonia = {
                colonia, departamento, municipio, barrio_seguro, 
                ubicacion:{ type:"Point", coordinates:[longitud, latitud] }, 
                radio_km
            };

            const result = await coloniasColl.insertOne(newColonia);
            return result;
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    }


    static async inColonia(longitud, latitud)
    {
        try
        {
            let filter = { 
                "ubicacion": { 
                    $near: {
                        $geometry:{ type:"Point", coordinates:[longitud, latitud] },
                        $maxDistance: 10000 //METROS
                    }
                }
            };

            const result = await coloniasColl.find(filter);
            return result.toArray();
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    } 
}

/*
ESTRUCTURA DE COLECCIÓN COLONIAS

  _id
  colonia: " "
  departamento: " "
  municipio: " "
  barrio_seguro: true
  ubicacion: {
      //Es un geojson point
      type: "Point",
      coordinate: [longitud, latitud]
  }
  radio_km: 5 

 */