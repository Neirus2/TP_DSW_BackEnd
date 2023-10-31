const { Router } = require('express');
const router = Router();
const Order = require('../models/order');
const jwt = require('jsonwebtoken');

//ANDA
router.post('/generateNewOrder', async(req, res) => {
    console.log('nueva order');
    const { items, total, userId } = req.body;
    const newOrder = new Order ({items, total, userId, status: 'Pendiente'});
    await newOrder.save();  //espere a que le llegue la respuesta de la funcion (promesa), porque la funcion
    //tarda mas que las lineas de codigo.
    const token = jwt.sign({ _id: newOrder._id }, 'secretKey')

    res.status(200).json({token});
});

router.get('/orders/:userId', async(req, res) => {
    const userId = req.params.userId;

    try {
        const pedidosUsuario = await Order.find({ userId: userId });
    
        res.json({ 
          userId: userId,
          pedidos: pedidosUsuario
        });
      } catch (error) {
        res.status(500).json({ message: 'Error al recuperar pedidos del usuario' });
      }
  });
  
  
module.exports = router;
