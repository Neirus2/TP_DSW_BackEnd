const { Schema, model } = require('mongoose');

const orderSchema = new Schema ({
    items:[],
    total: Number,
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',                
      required: true              
    },
    status: String,
},{
  timestamps: true 
});

module.exports = model('Order', orderSchema)
