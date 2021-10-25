const person = require('../models/person'); //Modelo

//Arreglo Users 
//(Se comentaron los métodos que usaron el arreglo para trabajar con la base de datos)
let users = [
    { id: 1, nombre: "Geremias", apellido: "Beltran" },
    { id: 2, nombre: "Isadora", apellido: "Montiel" },
    { id: 3, nombre: "Laureano", apellido: "Gómez" },
    { id: 4, nombre: "Carlos", apellido: "Castro" }
]

class ServerController {
    constructor() {

    }

    
    //Método crear e insertar el elemento a la base de datos
    register(req, res) { //req (petición) y res (respuesta)
        //Relación al modelo person
        person.create(req.body, (error, data) => { 
            //Que hacer en caso de haber error
            if (error) {
                res.status(500).send();
            //Ejecutar base de datos exitosamente
            } else {
                res.status(201).json(data);
            }
        });
    }
/*
    //Método crear e insertar el elemento en el arreglo
    register(req, res) {
        //obtener datos
        let { id, nombre, apellido } = req.body;
        console.log("Usuario registrado con éxito");
        console.table({ id, nombre, apellido });
        users.push(req.body);
        res.status(200).json({
            message: "Usuario registrado con éxito"
        });
    }
*/

/*
    //Modificar información de usuario en arreglo
    update(req, res) {
        let { id, nombre, apellido } = req.body;
        console.table({ id, nombre, apellido });
        users.forEach(element => {
            if (id == element.id) {
                element.nombre = nombre;
                element.apellido = apellido;
            }
        });
            if (users != null) {
                res.status(200).json(users);
            } else {
                res.status(400).json({ message: "Usuario no encontrado" });
            }
        }
*/


    //Modificar información de usuario en la base de datos
    update(req, res) {
        let { id, nombre, apellido, edad, email } = req.body;
        let obj = { nombre, apellido, edad, email };
        person.findByIdAndUpdate(id, { $set: obj }, (error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);
            }
        })
    }

    /*
    //Eliminar variable de usuario en el arreglo
    deleteUser(req, res) {
        let { id } = req.body;
        console.table({ id });
        let tempUser = [];
        users.forEach(element => {
            if (id != element.id) {
                tempUser.push(element);
            }
        });
        users = tempUser;
        if (users != null) {
            res.status(200).json(users);
        } else {
            res.status(400).json({ message: "Usuario no encontrado" });
        }
    }
    */


    //Eliminar variable de usuario en la base de datos
    deleteUser(req, res) {
        let { id } = req.body;
        person.findByIdAndDelete(id, (error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);
            }
        })
    }


    /*
    //Método otener usuario deseado con la posición del arreglo
    getUsers(req, res) {
            let id = req.params.id;
            let userResp = null;
            users.forEach(element => {
                if (id == element.id) {
                    userResp = element;
                }
            });
    
            if (userResp != null) {
                res.status(200).json(userResp);
            } else {
                res.status(400).json({ message: "Usuario no encontrado" });
            }
        }
    */


    //Método obtener usuario deseado con el id de la base de datos
    getUsers(req, res) {
        let id = req.params.id;
        //Buscar el usuario por el id
        person.findById(id, (error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);
            }
        })
    }
     
   
    /*
    //Método otener todas las variables de arreglo
    getAllUsers(req, res) {
            res.status(200).json(users); //Si está bien, muestre la información de Users
        }
    */
    
    getAllUsers(req, res) {
        person.find((error, data) => {
            if (error) { //En caso de haber un error
                res.status(500).send(); 
            } else { //Ejecución exitosa
                res.status(200).json(data);
            }
        })
    }

}

exports.default = ServerController;