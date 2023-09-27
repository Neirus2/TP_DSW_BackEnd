const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const Product = require('../models/product');
const productController = require('../controllers/productController');

router.get('/products', productController.getProducts);

router.post('/createNewProduct', async(req, res) => {
    const { desc, stock, price  } = req.body;
    const newProduct = new Product ({desc, stock, price});
    await newProduct.save();   
    
    const token = jwt.sign({ _id: newProduct._id }, 'secretKey')

    res.status(200).json({token});
});

router.get('/product/:productId', async(req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById( productId )
    if (!product) return res.status(401).send("Producto no existe");
    res.json({ data: product })
});

  router.delete('/product/:productId', async (req, res) => {
    const productId = req.params.productId;
  
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  });
    
  router.patch('/product/:productId', async (req, res) => {
    const productId = req.params.productId;
    const { desc, stock, price } = req.body;
    const updateOps = {desc, stock, price}
  
    try {
      const result = await Product.findByIdAndUpdate( productId, updateOps );
  
      if (!result) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      const product = await Product.findById( productId )
  
      res.json({ data: product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  });



  module.exports = router;