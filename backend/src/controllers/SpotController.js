const Spot = require('../models/Spot');


module.exports = {
    async index(req, res){
        const { service } = req.query;

        const spots = await Spot.find({ service: service })

        return res.json(spots);
    },

    async store(req, res) {
        const { filename } = req.file;
        const { type, service, price } = req.body;
        const { suporter_id } = req.headers;

        const spot = await Spot.create({
            suporter: suporter_id,
            thumbnail: filename,
            service,
            type,
            price
        })

        return res.json(spot);
    }
};