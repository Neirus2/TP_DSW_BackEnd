const { Router } = require('express');
const router = Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const xss = require('xss-clean');
const validator = require('validator');
const carpetaRelativa = '';
const rutaAbsoluta = path.resolve(carpetaRelativa);
const bcrypt = require('bcryptjs');

module.exports = router;

module.exports.verifyToken = verifyToken;

  router.get('/user/:cuit', verifyToken, async(req,res)=>{
        const userCuit= req.params.cuit;      
  try {
    const cliente = await User.findOne({ cuit: userCuit }).exec();

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al buscar el cliente', error: error });
  }

  });

router.use(xss());

router.get('/', (req, res) => res.send('Hello World'));

router.post('/signup', async (req, res) => {
  const role = 'Usuario Comun';
  const { email, password, businessName, cuit, phoneNumber, address, profileImage } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).send('Correo electrónico no válido');
  }

  if (password.length < 8 || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
    return res.status(400).send('La contraseña debe tener al menos 8 caracteres de longitud y contener al menos un carácter especial');
  }

  try {
    const existingUserEmail = await User.findOne({ email });
    const existingUserCuit = await User.findOne({ cuit });

    if (existingUserEmail) {
      return res.status(400).send("Mail Existente");
    }

    if (existingUserCuit) {
      return res.status(400).send("CUIT Existente");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      businessName,
      cuit,
      phoneNumber,
      address,
      profileImage,
      role,
    });

    newUser.profileImage = profileImage;

    await newUser.save();

    const token = jwt.sign({ _id: newUser._id, profileImage: newUser.profileImage }, 'secretKey');

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear cuenta");
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Faltan credenciales");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("Credenciales inválidas");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Credenciales inválidas");
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, 'secretKey');
    res.status(200).json({ token });
    console.log(user.role);
  } catch (error) {
    console.error("Error en la autenticación:", error);
    res.status(500).send("Error en la autenticación");
  }
});

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

router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const userData = {
      id:user._id,
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


router.get('/getUserImage/:userId', async (req, res) => {    
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.profileImage) {
      const imagePath = path.join(rutaAbsoluta, user.profileImage);
      res.status(200).sendFile(imagePath);
    } else {
      return res.status(404).json({ message: 'Imagen de perfil no encontrada para el usuario' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la imagen del usuario' });
  }
});

  router.delete('/deleteUser/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    try {
      const deletedUser = await User.findByIdAndDelete(userId);  
  
      if (!deletedUser) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
  
      res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
  });

  router.patch('/asignPrivileges/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { role } = req.body;
    const updateOps = {role}
  
    try {
      const result = await User.findByIdAndUpdate( userId, updateOps );
  
      if (!result) {
        return res.status(404).json({ error: 'User no encontrado' });
      }
  
      res.json({message:"Privilegios asignados correctamente"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar privilegios' });
    }
  });