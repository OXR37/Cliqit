const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    email: { // User's email
        type: String,
        required: true
    },

    type: { // Admin or User
            // true     false
        type: String,
        default: false
    },

    premium: { // 
        type: Boolean,
        default: false
    },

    links: { // Amount of links shortened
        type: Number,
        default: 0
    },

    createdAt: { // Timestamp the account was created
        type: String,
        required: true
    }
});

module.exports = mongoose.model('account', accountSchema);