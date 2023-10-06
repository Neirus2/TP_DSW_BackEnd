const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const createAdminUser = async () => {
  try {
    const existingAdminUser = await User.findOne({ role: 'Administrador' });

    if (!existingAdminUser) {
      const adminUser = new User({
        email: 'admin@example.com', 
        password: await bcrypt.hash('adminpassword', 10), 
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

createAdminUser();
