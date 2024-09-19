const express = require('express');
const contentRoutes = require('./routes/contentRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());

app.use('/api', contentRoutes);
app.use('/api', userRoutes);

module.exports = app;