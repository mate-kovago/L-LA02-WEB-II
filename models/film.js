const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  cim: { type: String, required: true, trim: true },
  gyartas: { type: Number, required: true },
  hossz: { type: Number, min: 0, default: null },
  bemutato: {
    type: String,
    default: null,
    match: /^\d{4}-\d{2}-\d{2}$/
  },
  youtube: { type: Boolean, required: true }
});

module.exports = mongoose.model('Film', filmSchema, 'film');