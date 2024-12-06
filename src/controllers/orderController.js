const Order = require('../models/order');
const jwt = require('jsonwebtoken');

async function generateOrderController(req, res) {
    console.log('nueva order'); 
    const { items, total, userId } = req.body;
    const newOrder = new Order ({items, total, userId, status: 'Pendiente'});
    await newOrder.save();  //espere a que le llegue la respuesta de la funcion (promesa), porque la funcion
    //tarda mas que las lineas de codigo.
    const token = jwt.sign({ _id: newOrder._id }, 'secretKey')
  
    res.status(200).json({token});
  }
  
  module.exports = { generateOrderController };