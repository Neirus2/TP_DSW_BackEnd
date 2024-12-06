const multer = require('multer');
const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const { verifyToken } = require('./user');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadsProfileImages/'); // Directorio donde se guardan las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre de archivo único
  },
});

const upload = multer({ storage });

router.post('/upload-profile-image', verifyToken, upload.single('profileImage'), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const userId = req.userId; 

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


module.exports = router;