const mongoose = require('mongoose');


const Actuality = mongoose.model('Actuality', {

    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    author: { // Référence à l'utilisateur
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Nom du modèle utilisateur
        required: true
    }
});

module.exports = Actuality;