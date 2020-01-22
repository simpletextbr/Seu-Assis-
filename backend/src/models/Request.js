const mongoose = require('mongoose');

const RequestShema = new mongoose.Schema({
    problem: String,
    detail: String,
    anynumber: Number,
    approved:Boolean,
    frist:Boolean,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    spot:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    }
});

module.exports = mongoose.model('Request', RequestShema);