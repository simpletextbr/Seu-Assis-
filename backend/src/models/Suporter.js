const mongoose = require('mongoose');

const SuporterSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String,
    create: Boolean,
})

module.exports = mongoose.model('Suporter', SuporterSchema);
