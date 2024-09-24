const express = require('express');
const contentRoutes = require('./routes/contentRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());

app.use('/api/content', contentRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

module.exports = app;