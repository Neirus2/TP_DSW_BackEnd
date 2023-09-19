const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    email: String,
    password: String,
    businessName: String,
    cuit: Number,
    phoneNumber: String,
    address: String,
}, {
    timestamps: true
});

module.exports = model('User', userSchema);


