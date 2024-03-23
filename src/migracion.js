const mongoose = require('mongoose');
const User = require('./models/user'); 

async function migrarNuevoAtributo() {
    try {
        const users = await User.find();
        console.log(users)
        for (const use of users) {
            use.verificationCode = null;
            await use.save();
        }

    } catch (error) {
        console.error('Error durante la migración:', error);
    } finally {
        mongoose.disconnect();
    }
}

migrarNuevoAtributo();
