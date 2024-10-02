const dotenv = require('dotenv');
const express = require('express');
const contentRoutes = require('./routes/contentRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const cors = require('cors');

dotenv.config();
//app.use(cors());
app.use(cors({
    origin: '*',  // Permitir todos los orígenes, o puedes especificar el dominio de tu front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
/*app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // O puedes restringirlo a 'http://localhost:3000' si quieres.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});*/
app.use(express.json());

app.use('/api/contents', contentRoutes); //app.use('/api/content', contentRoutes);
app.use('/api/users', userRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(process.env.PORT);
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

module.exports = app;