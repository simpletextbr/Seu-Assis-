const Request = require('../models/Request');

module.exports = {
async show(req, res){
    const { requests_id } = req.query;
    
    const requests = await Request.find({ request: requests_id });

    return res.json(requests);
        }        
    }