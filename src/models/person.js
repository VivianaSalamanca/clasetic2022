const mongoose = require('mongoose');
const schema = mongoose.Schema;

var personSchema = new schema({
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    edad: {
        type: Number
    },
    email: {
        type: String
    }
},{
    collection: 'personas'
});
//Siempre se coloca la colección la primera letra en mayuscula y en singular (Persona)
module.exports = mongoose.model('Persona', personSchema);