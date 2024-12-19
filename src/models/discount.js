const { Schema, model } = require('mongoose');

const discountSchema = new Schema ({
  discountPercentage: Number,
  daysFrom: Number,
  daysUntil: Number
},{
  timestamps: true 
});

module.exports = model('Discount', discountSchema)