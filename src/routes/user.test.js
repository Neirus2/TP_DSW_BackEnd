//Test tipo unitario (creo) de login. Si no ingresa datos, error; si ingresa mal, error; si ingresa bien, pasa.
//No estoy seguro que sea unitario porque estoy usando la API, capaz es de integracion.
//No hay conexion a BD, usamos mock para simularla.
const request = require('supertest');
const {app, server} = require('../index');
const disconnectDB = require('../database');
const User = require('../models/user');
const bcrypt = require('bcrypt');

jest.mock('../models/user');

describe('POST /login', () => {
    afterEach(async () => {
        await jest.clearAllMocks(); // Limpia los mocks después de cada test
      });
    
    afterAll(async () => {
        await disconnectDB();
        server.close();
      });

    it('should return 400 if email or password is missing', async () => {
      const response = await request(app).post(`/api/login`).send({ email: 'user@example.com' });
      expect(response.status).toBe(400);
      expect(response.text).toBe('Faltan credenciales');
    });
  
    it('should return 401 if email or password is incorrect', async () => {
      User.findOne.mockResolvedValue(null);
  
      const response = await request(app).post(`/api/login`)
        .send({
          email: 'nonexistent@example.com',
          password: 'FakePassword'
        });
  
      expect(response.status).toBe(401);
      expect(response.text).toBe('Credenciales inválidas');
    });
  
    it('should return 200 and a token if login is successful', async () => {
      const mockUser = {
        _id: '12345',
        email: 'test@example.com',
        password: await bcrypt.hash('Password123', 10),
        businessName: 'Test Business',
        cuit: 1234567890,
        phoneNumber: '1234567890',
        address: 'Test Address',
        profileImage: 'test.jpg',
        role: 'Usuario Comun',
        verificationCode: null
      };
      User.findOne.mockResolvedValue(mockUser);
  
      const response = await request(app).post(`/api/login`)
        .send({
          email: 'test@example.com',
          password: 'Password123'
        });
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });
  