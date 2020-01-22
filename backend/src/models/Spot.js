const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    service: String,
    type: String,
    price: Number,
    suporter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Suporter'
    }
}, {
    toJSON: {
        virtuals: true,
    }
});

SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://192.168.1.12:3333/files/${this.thumbnail}`
})


module.exports = mongoose.model('Spot', SpotSchema);
