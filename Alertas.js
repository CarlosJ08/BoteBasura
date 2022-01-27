

const { MongoClient } = require('mongodb');


const ObtenerDatos = (app) => {
    const uri = "mongodb+srv://carlos:itson@cluster0.46cqb.mongodb.net/ProyectoIOT?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(async err => {
        try {

            const collection2 = await (await client.db("ProyectoIOT").collection("Alerta").find().toArray());
            const collection = await (await client.db("ProyectoIOT").collection("SensorUltrasonico").find().toArray());


         
            app.get(
                `/sensor`,
                (req, res) => {
                    client.connect(async err => {

                        res.send(collection.slice(collection.length - 8, collection.length - 1));


                    })
                });

            client.close();
            app.get(
                `/Alertas`,
                (req, res) => {

                    res.send(collection2.slice(collection2.length - 6, collection2.length - 1));
                }

            );

        } catch { }

    });





}
module.exports = {
    "ObtenerDatos": ObtenerDatos
}
