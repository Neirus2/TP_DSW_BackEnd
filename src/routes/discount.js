const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const Discount = require('../models/discount')

router.post('/createNewDiscount', async(req, res) => {
    const { discountPercentage, daysFrom, daysUntil  } = req.body;
    const newDiscount = new Discount ({discountPercentage, daysFrom, daysUntil });
    await newDiscount.save();   
    
    const token = jwt.sign({ _id: newDiscount._id }, 'secretKey')

    res.status(200).json({token});
});

router.get('/discount/:discountId', async(req, res) => {
    const discountId = req.params.discountId;
    const discount = await Discount.findById(discountId);
    if (!discount) return res.status(401).send("El descuento no existe");
    res.json({ data: discount })
});

router.delete('/discount/:discountId', async (req, res) => {
    const discountId = req.params.discountId;
  
    try {
      const deletedDiscount = await Discount.findByIdAndDelete(discountId);
  
      if (!deletedDiscount) {
        return res.status(404).json({ error: 'Descuento no encontrado' });
      }
  
      res.json({ message: 'Descuento eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el descuento' });
    }
  });

  router.patch('/discount/:discountId', async (req, res) => {
    const discountId = req.params.discountId;
    const { discountPercentage, daysFrom, daysUntil } = req.body;
    const updateOps = {discountPercentage, daysFrom, daysUntil}
  
    try {
      const result = await Discount.findByIdAndUpdate( discountId, updateOps );
  
      if (!result) {
        return res.status(404).json({ error: 'Descuento no encontrado' });
      }

      const discount = await Discount.findById(discountId);
  
      res.json({ data: discount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el descuento' });
    }
  });

  module.exports = router;
