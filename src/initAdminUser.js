const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const createAdminUser = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, salt);
    const existingAdminUser = await User.findOne({ role: 'Administrador' });
    if (!existingAdminUser) {
      const adminUser = new User({
        email: 'admin@example.com', 
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

createAdminUser();