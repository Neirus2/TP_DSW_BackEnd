const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    cuit: String,
    businessName: String,
    address: String,
    phoneNumber: String,
}, {
    timestamps: true
});

module.exports = model('Supplier', userSchema);