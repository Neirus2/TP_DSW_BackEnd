const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    email: String,
    password: String,
    businessName: String,
    cuit: Number,
    phoneNumber: String,
    address: String,
    profileImage: String,
    role: String,
    verificationCode: String
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);


