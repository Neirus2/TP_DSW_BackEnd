const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    email: String,
    password: String,
    businessName: String,
    cuit: Number,
    phoneNumber: String,
    address: String,
    profileImage: String,
    role: {
    type: String,
    enum: ['Usuario Común', 'Administrador'], // Define los roles permitidos
    default: 'Usuario Común', // Establece el rol predeterminado
          },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);


