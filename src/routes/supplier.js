const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const Supplier = require('../models/supplier')

//ANDA
router.post('/createNewSupplier', async(req, res) => {
    const { cuit, businessName, item, address, phoneNumber  } = req.body;
    const newSupplier = new Supplier ({cuit, businessName, item, address, phoneNumber});
    await newSupplier.save();   
    
    const token = jwt.sign({ _id: newSupplier._id }, 'secretKey')

    res.status(200).json({token});
});
//ANDA
router.get('/supplier/:supplierCuit', async(req, res) => {
    const cuit = req.params.supplierCuit;
    const supplier = await Supplier.findOne({cuit})
    if (!supplier) return res.status(401).send("Proveedor No existe");
    res.json({ data: supplier })
});
//ANDA
router.delete('/supplier/:supplierCuit', async (req, res) => {
    const supplierCuit = req.params.supplierCuit;
  
    try {
      const deletedSupplier = await Supplier.findOneAndDelete({cuit: supplierCuit});
  
      if (!deletedSupplier) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
      }
  
      res.json({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el proveedor' });
    }
  });
//ANDA 
router.patch('/supplier/:supplierCuit', async (req, res) => {
    const supplierCuit = req.params.supplierCuit;
    const { cuit, businessName, item, address, phoneNumber } = req.body;
    const updateOps = {cuit, businessName, item, address, phoneNumber}
  
    try {
      const result = await Supplier.findOneAndUpdate({cuit: supplierCuit}, updateOps );
  
      if (!result) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
      }

      const supplier = await Supplier.findOne( {cuit} )
  
      res.json({ data: supplier });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el proveedor' });
    }
  });

module.exports = router;