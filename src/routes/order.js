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
      const orderId = req.params.orderId; // Suponiendo que el ID del pedido está en los parámetros de la solicitud
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
  
      if (order.status !== 'Pendiente') {
        return res.status(400).json({ message: 'No se puede cancelar un pedido que no está pendiente' });
      }
  
      // Cambia el estado a "cancelado" si el pedido está pendiente
      order.status = 'Cancelado';
      await order.save();
  
      return res.status(200).json({ message: 'Pedido cancelado exitosamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al cancelar el pedido', error });
    }
  });
  
  
module.exports = router;
