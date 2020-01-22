const User = require('../models/User');

module.exports = {
    async store(req, res){
        const { name, phone } = req.body;

        let user = await User.findOne({ name, phone });

        if(!user){
            user = await User.create({ name, phone })
        }

        return res.json(user);

    },
    async update(req, res){
        const { user_id, warranty } = req.headers;

        let user = await User.findById({ user_id });

        if(!user){
            return res.status(400).json({error: 'Usuario inexistente'});
        }else
            user = await User.update(warranty);

        return res.status(200).json({ message: 'Atualizado com sucesso' }, warranty);

    }
};