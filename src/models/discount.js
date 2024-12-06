const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
  discountPercentage: Number,
  daysFrom: Number,
  daysUntil: Number
},{
  timestamps: true 
});

module.exports = model('Discount', userSchema)