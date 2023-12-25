const mongoose = require('mongoose');

const link = new mongoose.Schema({
    email: { // Email of the user that created the link
        type: String,
        required: true
    },

    shortURL: { // Shortened link
        type: String,
        required: true 
    },

    longURL: { // Destination link
        type: String,
        required: true 
    },

    clicks: { // Amount of clicks on the shortened link
        type: Number,
        default: 0
    },

    createdAt: { // Timestamp the link was created
        type: String,
        required: true
    },

    expiresAt: { // Timestamp the link will expire
        type: String,
        required: true
    }
});

module.exports = mongoose.model('link', link);