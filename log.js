const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  site: String,
  duration: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
