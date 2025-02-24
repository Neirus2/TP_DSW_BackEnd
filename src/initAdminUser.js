const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');

const createAdminUser = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, salt);
    const existingAdminUser = await User.findOne({ email: process.env.ADMIN_USER });
    if (!existingAdminUser) {
      const adminUser = new User({
        email: process.env.ADMIN_USER, 
        password: hashedPassword, 
        role: 'Administrador',
      });

      await adminUser.save();

      console.log('Usuario administrador creado exitosamente.');
    } else {
      console.log('El usuario administrador ya existe.');
    }

  } catch (error) {
    console.error('Error al crear el usuario administrador:', error);
  }
};

const createTestUser = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.TEST_PASS, salt);
    const existingTestUser = await User.findOne({ email: process.env.TEST_USER });
    if (!existingTestUser) {
      const testUser = new User({
        email: process.env.TEST_USER, 
        password: hashedPassword, 
        role: 'Usuario Comun',
      });

      await testUser.save();

      console.log('Usuario test creado exitosamente.');
    } else {
      console.log('El usuario test ya existe.');
    }

  } catch (error) {
    console.error('Error al crear el usuario test:', error);
  }
};


createAdminUser();
createTestUser();