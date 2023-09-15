const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    state: String,
    businessName: String,
    cuitCuil: String,
    address: String,
    phoneNumber: String,
    email: String,
    antiquity: Date
}, {
    timestamps: true // es una opción que se utiliza para registrar automáticamente 
    //las fechas de creación (createdAt)  y actualización (updatedAt) de un documento 
    //en una colección de MongoDB.
});

module.exports = model('Client', userSchema);