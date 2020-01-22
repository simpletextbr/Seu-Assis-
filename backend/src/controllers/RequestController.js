const Request = require('../models/Request');

module.exports = {
    async store(req, res){
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { problem, detail, anynumber, first } = req.body;

           // if(warranty==true){
                if(first==true){
                    const request = await Request.create({
                        user: user_id,
                        spot: spot_id,
                        problem,
                        detail,
                    });
                    await request.populate('spot').populate('user').execPopulate();
                    return res.json(request);
                }else{
                    const request = await Request.create({
                        user: user_id,
                        spot: spot_id,
                        problem,
                        detail,
                        anynumber,
                    });
                    await request.populate('spot').populate('user').execPopulate();

                    const ownerSocket = req.connectedUsers[request.spot.suporter]

                    if(ownerSocket){
                        req.io.to(ownerSocket).emit('requested', request);
                    }

                    return res.json(request);
                }
            },
}