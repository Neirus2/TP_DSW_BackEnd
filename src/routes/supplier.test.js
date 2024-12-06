const { deleteSupplierController } = require('../controllers/supplierController');
const Supplier = require('../models/supplier'); 

jest.mock('../models/supplier'); 

const request = {
  params: { supplierId: '12345' }, 
  userId: '12345'
};

const response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
};

describe('DELETE /supplier/:supplierId', () => {

  it('should return 200 if supplier is deleted successfully', async () => {
    Supplier.findByIdAndDelete.mockResolvedValue({ _id: '12345' });
    await deleteSupplierController(request, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ message: 'Supplier eliminado correctamente' });
  });

  it('should return 404 if supplier does not exist', async () => {
    Supplier.findByIdAndDelete.mockResolvedValue(null);
    await deleteSupplierController(request, response);
    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({ error: 'Supplier no encontrado' });
  });

  it('should return 500 if there is an error', async () => {
    Supplier.findByIdAndDelete.mockRejectedValue(new Error('Database Error'));
    await deleteSupplierController(request, response);
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({ error: 'Error al eliminar el supplier' });
  });

});
