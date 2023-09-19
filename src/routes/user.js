const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const User = require('../models/user'); 


router.get('/', (req, res) => res.send('Hello World'))

router.post('/signup', async(req, res) => {
    const { email, password ,businessName ,cuit ,phoneNumber , address } = req.body;
    const newUser = new User ({email, password ,businessName ,cuit ,phoneNumber , address});
    
    try {
         const existingUser = await User.findOne({email: email});

         if (existingUser) {
           return res.status(400).send("Mail Existente");
         }

       } catch (error) {
         console.error(error);
         res.status(500).send("Error al crear cuenta");
       }

    await newUser.save();   
    
    const token = jwt.sign({ _id: newUser._id }, 'secretKey')

    res.status(200).json({token});
});

router.post('/login', async(req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({email})
    if (!user) return res.status(401).send("Email no existe");
    if ( user.password !== password ) return res.status(401).send("Contraseña Incorrecta");

    const token = jwt.sign({ _id: user._id, userBusinessName: user.userBusinessName }, 'secretKey');
    res.status(200).json({token});

});

router.get ('/tasks', (req, res) => {

    res.json([
        {
            _id: 1,
            name: 'task one',
            description: 'lorem ipsum',
            date: "2023-08-27T04:30:38.931+00:00"
        },
        {
            _id: 2,
            name: 'task two',
            description: 'lorem ipsum',
            date: "2023-08-27T04:30:38.931+00:00"
        },
        {
            _id: 3,
            name: 'task three',
            description: 'lorem ipsum',
            date: "2023-08-27T04:30:38.931+00:00"
        }
    ])
});

router.get ('/private-tasks',verifyToken, (req, res) => {

    res.json([
        {
            _id: 1,
            name: 'task one',
            description: 'lorem ipsum',
            date: "2023-08-27T04:30:38.931+00:00"
        },
        {
            _id: 2,
            name: 'task two',
            description: 'lorem ipsum',
            date: "2023-08-27T04:30:38.931+00:00"
        },
        {
            _id: 3,
            name: 'task three',
            description: 'lorem ipsum',
            date: "2023-08-27T04:30:38.931+00:00"
        }
    ])
});




module.exports = router;

function verifyToken (req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send(" Unauthorized request ")
    }

    const token = req.headers.authorization.split(' ')[1]
    if (token  === 'null') {
        return res.status(401).send(" Unauthorized request ") 
    } 

    const payload = jwt.verify(token, 'secretKey')
    req.userId = payload._id
    next();
}   

