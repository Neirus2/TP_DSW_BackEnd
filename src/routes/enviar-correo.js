const { Router } = require('express');
const router = Router();
const nodemailer = require('nodemailer');
const xss = require('xss-clean');
const validator = require('validator');
router.use(xss());
const { verifyToken } = require('./user');
const cors = require('cors');
const checkUserRole = require('../middleware/authMiddleware');
router.use(cors());
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'totalstoreshopping@gmail.com', 
    pass: 'metz daac vlyi iqqe'  //contraseña de aplicación generada en gmail
  }
});
router.post('/enviar-correo', verifyToken, (req, res) => {
  const { name, email, message } = req.body;

  const opcionesCorreo = {
    from: name, 
    to: 'totalstoreshopping@gmail.com',
    subject:  email,
    text: message
  };
      if (!validator.isEmail(email)) { return res.status(401).send('Correo electrónico no válido');}
      if (!validator.isAlpha(name.replace(/ /g, ''))) { return res.status(401).send('Nombre no válido');}
      if(message.length > 500){ return res.status(401).send('El mensaje no puede superar los 500 caractéres')}

  transporter.sendMail(opcionesCorreo, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
      res.status(500).json({ mensaje: 'Error al enviar el correo electrónico' });
    } else {
      console.log('Correo electrónico enviado:', info.response);
      res.status(200).json({ mensaje: 'Correo electrónico enviado correctamente' });
    }
  });
});

module.exports = router;
