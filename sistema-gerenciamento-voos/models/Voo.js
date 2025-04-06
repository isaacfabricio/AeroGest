// models/Voo.js
const mongoose = require('mongoose');

const vooSchema = new mongoose.Schema({
  origem: String,
  destino: String,
  duracao: Number,
  status: String,
  companhiaAerea: String,
});

module.exports = mongoose.model('Voo', vooSchema);