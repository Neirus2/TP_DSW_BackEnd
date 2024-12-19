const { Schema, model } = require('mongoose');

const supplierSchema = new Schema ({
    cuit: String,
    businessName: String,
    address: String,
    phoneNumber: String,
}, {
    timestamps: true
});

module.exports = model('Supplier', supplierSchema);