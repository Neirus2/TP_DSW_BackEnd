const Supplier = require('../models/supplier');

async function deleteSupplierController(req, res) {
    console.log('Borrar Supplier'); 
    const supplierId = req.params.supplierId;
    try {
      const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);  
  
      if (!deletedSupplier) {
        return res.status(404).json({ error: 'Supplier no encontrado' });
      }
  
      return res.status(200).json({ message: 'Supplier eliminado correctamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al eliminar el supplier' });
    }
  };
  module.exports = { deleteSupplierController };
