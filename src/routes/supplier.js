const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const Supplier = require('../models/supplier')

//ANDA
router.post('/createNewSupplier', async (req, res) => {
  const { cuit, businessName, address,phoneNumber } = req.body;
  const newSupplier = new Supplier({ cuit, businessName, address,phoneNumber });
  const token = jwt.sign({ _id: newSupplier._id }, 'secretKey');
  await newSupplier.save();
  res.status(200).json({ token });
});

 router.delete('/deleteSupplier/:supplierId', async (req, res) => {
    const supplierId = req.params.supplierId;
    try {
      const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);  
  
      if (!deletedSupplier) {
        return res.status(404).json({ error: 'Supplier no encontrado' });
      }
  
      res.json({ message: 'Supplier eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el supplier' });
    }
  });

//ANDA
router.get('/supplier/:supplierCuit', async(req, res) => {
    const cuit = req.params.supplierCuit;
    const supplier = await Supplier.findOne({cuit})
    if (!supplier) return res.status(401).send("Proveedor No existe");
    res.json({ data: supplier })
});

  
router.patch('/updateDetails/details/:supId', async (req, res) => {
    const supId = req.params.supId;
    const { address, phoneNumber } = req.body;
    const updateDetails = {address, phoneNumber};
  
    try {
      const result = await Supplier.findByIdAndUpdate( supId, updateDetails );
  
      if (!result) {
        return res.status(404).json({ error: 'Supplier no encontrado' });
      }

      const sup = await Supplier.findById( supId )
  
      res.json({ data: sup });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el supplier' });
    }
  });

router.get('/getSuppliers', async (req, res) => {
  try {
    const proveedores = await Supplier.find(); 

    res.json(proveedores); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;