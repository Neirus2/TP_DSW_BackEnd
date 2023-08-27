const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    email: String,
    password: String,
    userBusinessName: String,
    userCuit: Number,
    userMobileNumber: String,
    userAdress: String,
}, {
    timestamps: true
});

module.exports = model('User', userSchema);


