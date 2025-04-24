const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logRoutes = require('./routes/logRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/productivity');

app.use('/api', logRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
