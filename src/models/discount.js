const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
  discountPercentage: Number,
  daysFrom: Number,
  daysUntil: Number
},{
  timestamps: true // es una opción que se utiliza para registrar automáticamente 
  //las fechas de creación (createdAt)  y actualización (updatedAt) de un documento 
  //en una colección de MongoDB.
});

module.exports = model('Discount', userSchema)