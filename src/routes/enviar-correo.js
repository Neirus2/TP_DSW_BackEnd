const { Router } = require('express');
const router = Router();
const nodemailer = require('nodemailer');

// Configura el transporte de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Utiliza el servicio de correo electrónico que prefieras o proporciona la configuración de SMTP
  auth: {
    user: 'enterprisempss@gmail.com', // Tu dirección de correo electrónico
    pass: 'qeng euuo xbbb abus' // Tu contraseña de correo electrónico (asegúrate de que sea segura)
  }
});

// Ruta para enviar correos electrónicos
router.post('/enviar-correo', (req, res) => {
  const { name, email, message } = req.body;

  // Configura las opciones del correo electrónico
  const opcionesCorreo = {
    from: email, // Tu dirección de correo electrónico
    to: 'enterprisempss@gmail.com',
    subject:  email,
    text: message
  };

  // Envía el correo electrónico
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
