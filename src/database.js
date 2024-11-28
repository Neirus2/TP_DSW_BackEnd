
require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
const mongoose = require('mongoose');
    
// Cargar las variables de entorno
const dbURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}/angular-auth`;
// Conectar a MongoDB
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Database is connected');
            
        // Verifica si se debe usar la base de datos de prueba
         if (process.env.NODE_ENV === 'test') {
            // Aquí puedes insertar un documento de prueba o realizar cualquier configuración necesaria
            const TestSchema = new mongoose.Schema({ name: String });
            const TestModel = mongoose.model('Test', TestSchema);
                
            // Crear un documento de prueba (opcional)
            const testDoc = new TestModel({ name: 'Test' });
            return testDoc.save()
                .then(() => console.log('Test document created successfully.'))
                .catch(err => console.error('Error creating test document:', err));
            }
    })
    .catch(err => console.log('Error connecting to the database:', err));