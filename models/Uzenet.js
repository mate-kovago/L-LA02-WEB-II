
const mongoose = require('mongoose');

const uzenetSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    uzenet: {
        type: String,
        required: true
    },
    bekuldve: {
        type: Date,
        default: Date.now
    }
   
    
},
{
    collection: 'uzenet'
}
);

module.exports = mongoose.model('Uzenet', uzenetSchema);
