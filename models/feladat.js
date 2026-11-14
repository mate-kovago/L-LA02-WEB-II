const mongoose = require('mongoose');

require('./film');
require('./szemely');

const feladatSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  filmid: {
    type: Number,
    ref: 'Film',
    required: true
  },
  szemelyid: {
    type: Number,
    ref: 'Szemely',
    required: true
  },
  megnevezes: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Feladat', feladatSchema, 'feladat');