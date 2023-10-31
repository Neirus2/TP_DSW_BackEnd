const { Schema, model } = require('mongoose');

const orderSchema = new Schema ({
    items:[],
    total: Number,
    userId: String,
    status: String,
},{
  timestamps: true 
});

module.exports = model('Order', orderSchema)
