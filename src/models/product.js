const { Schema, model } = require('mongoose');

const productSchema = new Schema ({
    desc: String,
    stock: Number,
    price: Number,
    image: String,
    cat: String,
    stockMin: Number,
    featured: Boolean,
    supplier: String,
}, {
    timestamps: true
});

module.exports = model('Product', productSchema);
