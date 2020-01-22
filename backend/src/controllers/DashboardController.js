const Spot = require('../models/Spot');


module.exports = {
    async show(req, res){
        const { suporter_id } = req.headers;

        const spots = await Spot.find({ suporter: suporter_id });

        return res.json(spots);
    }

}