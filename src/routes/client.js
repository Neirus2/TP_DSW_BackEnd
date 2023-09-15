const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken'); //  se utiliza para importar el módulo jsonwebtoken en Node.js. 
// jsonwebtoken es una biblioteca que permite generar y verificar JSON Web Tokens (JWT) en aplicaciones 
// Node.js. Los JWT son un formato compacto y seguro para transmitir información entre dos partes de manera 
// que pueda ser verificada y confiable.

const Client = require('../models/client')

//ANDA
router.post('/createNewClient', async(req, res) => {
    const { state, businessName, cuitCuil, address, phoneNumber, email, antiquity } = req.body;
    const newClient = new Client ({state,  businessName, cuitCuil, address, phoneNumber, email, antiquity});
    await newClient.save();  //espere a que le llegue la respuesta de la funcion (promesa), porque la funcion
    //tarda mas que las lineas de codigo.

    const token = jwt.sign({ _id: newClient._id }, 'secretKey')

    res.status(200).json({token});
});
//ANDA
router.get('/client/:clientcuitCuil', async(req, res) => { // el /:clientcuitCuil  es el campo que le estoy mandando
    const clientcuitCuil = req.params.clientcuitCuil;
    const client = await Client.findOne( {cuitCuil: clientcuitCuil} )
    if (!client) return res.status(401).send("Cliente no existe");
    res.json({ data: client })
});

//
 router.delete('/client/:clientcuitCuil', async (req, res) => {
    const clientcuitCuil = req.params.clientcuitCuil;
  
    try {
      const deletedClient = await Client.findOneAndDelete({cuitCuil: clientcuitCuil});
  
      if (!deletedClient) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
  
      res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
  });
 
  
//ANDA   
  router.patch('/client/:clientcuitCuil', async (req, res) => {
    const clientcuitCuil = req.params.clientcuitCuil;
    const { state, businessName, cuitCuil, address, phoneNumber, email, antiquity } = req.body;
    const updateOps = {state, businessName, cuitCuil, address, phoneNumber, email, antiquity}
  
    try {
      const result = await Client.findOneAndUpdate( {cuitCuil: clientcuitCuil}, updateOps );
  
      if (!result) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      const client = await Client.findOne( {cuitCuil: clientcuitCuil} )
  
      res.json({ data: client });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
  });
  
  module.exports = router;