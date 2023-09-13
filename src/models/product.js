const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    desc: String,
    stock: Number,
    price: Number,
}, {
    timestamps: true
});

module.exports = model('Product', userSchema);
