const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    warranty: {
        type: Boolean,
        default: false
    }
    });

module.exports = mongoose.model('User', UserSchema);
