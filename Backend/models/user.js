const mongoose = require('mongoose');

const User = mongoose.model('User', {

    username: {
        type: String
    },

    password: {
        type: String,
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },

    email: {
        type: String,
    },
    status: {
        type: String,
        enum: ['activate', 'desactivate'],
        default: 'activate'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


});

module.exports = User;