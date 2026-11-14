const mongoose = require('mongoose');

const szemelySchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  nev: { type: String, required: true, trim: true },
  nem: {
    type: String,
    enum: ['férfi', 'nő'],
    required: true
  }
});

module.exports = mongoose.model('Szemely', szemelySchema, 'szemely');