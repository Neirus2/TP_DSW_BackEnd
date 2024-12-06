const e = require('express');
const {generateOrderController} = require('../controllers/orderController');
const Order = require('../models/order');

jest.mock('../models/order');

const request = {
  body: {
    items: [{name: 'item1', price: 50}],
    total: 100,
    userId: '12345'
  }
}
const response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
}

it('should return 200 and a token if order is generated successfully', async () => {
  Order.mockImplementationOnce(() => ({ save: jest.fn(), _id: 'fakeId' }));
  await generateOrderController(request, response);
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.json).toHaveBeenCalledWith({ token: expect.any(String)  
  });
});