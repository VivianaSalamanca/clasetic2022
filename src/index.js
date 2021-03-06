//Importar express
const express = require('express');
const serverRouter = require('./routers/serverRouter');
//Importar mongoose
const mongoose = require('mongoose');
//Importar url de conexión a la BD
const database = require('./database/db');
//Importar cors
const cors = require('cors');

class Server{
    //constructor (inicializa la clase)
    constructor(){
        this.conectarBD();
        this.app = express();
        //Indicar el puerto por el que se ejecutará el servidor
        this.app.set('port', process.env.PORT || 3000);
        //Indicar que las solicitudes http se trabajará en JSON
        this.app.use(express.json());
        this.app.use(cors());
        /**
         * 
         * ******************Rutas**********************
         * 
         * ******/
        const router = express.Router();
        router.get('/', (req, res)=>{
            //Respuesta al programador
            console.log("Nueva conexión");
            //Respuesta al cliente
            res.status(200).json({message: "Hola mundo!"});
        });
        const serverR = new serverRouter.default();
        
        //añadir las rutas al servidor
        this.app.use(serverR.router);
        this.app.use(router);
        //Levantar el servidor/correr el servidor
        this.app.listen(this.app.get('port'), ()=>{
            console.log("Servidor corriendo por el puerto => ", this.app.get('port'));
        });
    }

    //Método para conectar Base de Datos
    conectarBD(){
        mongoose.connect(database.db).then(()=>{
            console.log("Conexión a BD con éxito");
        }).catch((err)=>{
            console.error("Error de conexión");
        });
    }

}

const objServer = new Server();