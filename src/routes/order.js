const { Router } = require('express');
const router = Router();
const Order = require('../models/order');
const jwt = require('jsonwebtoken');


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

  router.patch('/cancelOrder/:orderId', async (req, res) => {
    try {
      const orderId = req.params.orderId; 
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
  
      if (order.status !== 'Pendiente') {
        return res.status(400).json({ message: 'No se puede cancelar un pedido que no está pendiente' });
      }
      order.status = 'Cancelado';
      await order.save();
  
      return res.status(200).json({ message: 'Pedido cancelado exitosamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al cancelar el pedido', error });
    }
  });

router.get('/pedidos', async (req, res) => {
    try {
        const pedidos = await Order.find({ status: { $in: ['Pendiente', 'En curso'] } });
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/changeStatus/:orderId', async (req, res) => {
  try {
    const newStatus = req.body.status;
    const orderId = req.params.orderId;S
    const order = await Order.findById(orderId);
    order.status =newStatus;
    console.log(order);
    await order.save();
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }else {res.status(200).json({ message: 'Pedido actualizado exitosamente' });}

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
