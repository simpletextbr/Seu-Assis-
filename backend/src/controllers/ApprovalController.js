const Request = require('../models/Request');

module.exports ={
    async store(req, res) {
        const { requests_id } = req.params;
    
        const requests = await Request.findById( requests_id ).populate('spot');

        requests.approved = true;

        await requests.save();

        const requestUserSocket = req.connectedUsers[requests.user]

        if(requestUserSocket){
            req.io.to(ownerSocket).emit('request_response', request);
        }

        return res.json( requests );
    }
};