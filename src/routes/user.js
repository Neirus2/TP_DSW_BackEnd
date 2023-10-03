const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const User = require('../models/user'); 

const xss = require('xss-clean');

const validator = require('validator');
router.use(xss());
router.get('/', (req, res) => res.send('Hello World'))

router.post('/signup', async(req, res) => {
    const { email, password ,businessName ,cuit ,phoneNumber , address, profileImage } = req.body;
    const newUser = new User ({email, password ,businessName ,cuit ,phoneNumber , address, profileImage});
      if (!validator.isEmail(email)) {
    return res.status(400).send('Correo electrónico no válido');
                                     }
 if (password.length < 8 || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
    return res.status(400).send('La contraseña debe tener al menos 8 caracteres de longitud y contener al menos un carácter especial');
  }
    try {
         const existingUser = await User.findOne({email: email});

         if (existingUser) {
           return res.status(400).send("Mail Existente");
         }
    newUser.profileImage = profileImage;
       } catch (error) {
         console.error(error);
         res.status(500).send("Error al crear cuenta");
       }

    await newUser.save();   
    
    const token = jwt.sign({ _id: newUser._id, profileImage: newUser.profileImage }, 'secretKey')

    res.status(200).json({token});
});

router.post('/login', async(req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({email})
    
    if (!user) return res.status(401).send("Email no existe");
    if ( user.password !== password ) return res.status(401).send("Contraseña Incorrecta");

    const token = jwt.sign({ _id: user._id, userBusinessName: user.userBusinessName, profileImage: user.profileImage}, 'secretKey');
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

module.exports.verifyToken = verifyToken;

router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Aquí puedes seleccionar los campos que deseas enviar al frontend
    const userData = {
      email: user.email,
      businessName: user.businessName,
      cuit: user.cuit,
      phoneNumber: user.phoneNumber,
      address: user.address,
      profileImage: user.profileImage,
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos del usuario' });
  }
});