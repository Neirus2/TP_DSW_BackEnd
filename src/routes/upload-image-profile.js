const multer = require('multer');
const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const { verifyToken } = require('./user');

// Configura Multer para guardar las imágenes en una carpeta
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadsProfileImages/'); // Directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre de archivo único
  },
});

const upload = multer({ storage });

// Ruta para cargar una imagen de perfil
router.post('/upload-profile-image', verifyToken, upload.single('profileImage'), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const userId = req.userId; // Asume que tienes el ID del usuario desde la autenticación

    // Actualiza la ruta de la imagen de perfil en el documento del usuario en MongoDB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.profileImage = imagePath;
    await user.save();

    res.json({ imagePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cargar la imagen de perfil' });
  }
});

// Resto de tus rutas existentes

module.exports = router;
