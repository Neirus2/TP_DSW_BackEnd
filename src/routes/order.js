const { Router } = require('express');
const router = Router();
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const validator = require('validator');
const { generateOrderController } = require('../controllers/orderController');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'totalstoreshopping@gmail.com', 
    pass: 'metz daac vlyi iqqe' 
  }
});


router.post('/generateNewOrder', generateOrderController);

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

  /*router.patch('/cancelOrder/:orderId', async (req, res) => {
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
  });*/

router.patch('/cancelOrder/:orderId', async (req, res) => {
  const { pedId } = req.params;

  try {
      const orderId = req.params.orderId; 
      const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).send('Pedido no encontrado');
    }

    if (order.status !== 'Pendiente') {
        return res.status(400).json({ message: 'No se puede cancelar un pedido que no está pendiente' });
      }
      order.status = 'Cancelado';
      await order.save();
    // Revertir el stock de los productos asociados al pedido
    for (const item of order.items) {
      // Actualizar el stock en la base de datos
      await revertirStockProducto(item._id, item.quantity);
    }
    // Envía una respuesta de éxito
    return res.status(200).json('El pedido fue cancelado con éxito');
  } catch (error) {
    console.error('No se pudo cancelar el pedido', error);
    return res.status(500).json('No se pudo cancelar el pedido');
  }
});

router.patch('/changeStatus/:orderId', async (req, res) => {
  try {
    const newStatus = req.body.status;
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    order.status =newStatus;
    console.log(order.status);
    console.log(order);
    await order.save();
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }else {res.status(200).json({ message: 'Pedido actualizado exitosamente' });}
    if (order.status === 'Cancelado'){
      for (const item of order.items) {
      // Actualizar el stock en la base de datos
      console.log(item._id);
      await revertirStockProducto(item._id, item.quantity);
    }  
      }
    }
   catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function revertirStockProducto(productId, quantity) {
  try {
    // Obtener el producto por su ID
    const product = await Product.findById(productId);

    if (!product) {
      console.error(`Producto con ID ${productId} no encontrado`);
      return;
    }

    // Actualizar el stock del producto
    product.stock += quantity;

    // Guardar los cambios en el producto
    await product.save();
  } catch (error) {
    console.error(`Error al revertir el stock del producto ${productId}:`, error);
    throw error;
  }
}

router.get('/pedidos', async (req, res) => {
    try {
        const pedidos = await Order.find({ status: { $in: ['Pendiente', 'En curso'] } });
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/getEmail/:id', async(req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    const userId = order.userId;  
    const user = await User.findById(userId);
    const email = user.email;
    const fechaPedido = new Date(order.createdAt);
    const fechaFormateada = fechaPedido.toLocaleString('es-ES');
    if (order.status === 'Terminado') {
    const opcionesCorreo = {
      from: 'totalstoreshopping@gmail.com',
      to: email,
      subject: 'Estado del pedido',
      text: `El pedido ${order._id} del día ${fechaFormateada} está listo para su retiro`,
    };

    if (!validator.isEmail(email)) {
      return res.status(401).send('Correo electrónico no válido');
    }

    transporter.sendMail(opcionesCorreo, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).json({ mensaje: 'Error al enviar el correo electrónico' });
      } else {
        console.log('Correo electrónico enviado:', info.response);
        res.status(200).json({ mensaje: 'Correo electrónico enviado correctamente' });
      }
    });}

    if (order.status==='Cancelado') {
      const opcionesCorreo = {
      from: 'totalstoreshopping@gmail.com',
      to: email,
      subject: 'Estado del pedido',
      text: `El pedido ${order._id} del día ${fechaFormateada} fue cancelado. Para más información, comuníquese con la empresa.`,
    };

    if (!validator.isEmail(email)) {
      return res.status(401).send('Correo electrónico no válido');
    }

    transporter.sendMail(opcionesCorreo, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).json({ mensaje: 'Error al enviar el correo electrónico' });
      } else {
        console.log('Correo electrónico enviado:', info.response);
        res.status(200).json({ mensaje: 'Correo electrónico enviado correctamente' });
      }
    });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud.' });
  }});

  router.get('/searchOrders/:searchTerm', async (req, res) => {
  const searchTerm = req.params.searchTerm; 
  try {
    const clients = await User.find({ businessName: { $regex: searchTerm, $options: 'i' } });
    if (!clients || clients.length === 0) {
      return res.status(404).json({ error: 'No se encontró ningún cliente con esa razón social' });
    }
    console.log('clientes: ', clients);
    let allOrders = [];
    for (const client of clients) {
      const orders = await Order.find({userId: client._id, status: 'Pendiente'});
      console.log('Los pedidos del cliente son: ', orders);
      allOrders = allOrders.concat(orders);
    }
    console.log('Pedidos: ', allOrders);
    res.json(allOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar los pedidos' });
  }
});

module.exports = router;
