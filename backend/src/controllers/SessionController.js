const Suporter = require('../models/Suporter');

module.exports = {
    async store(req, res) {
        const { name, email, phone, password, create } = req.body;

        let suporter = await Suporter.findOne({ email, password });

        if(!suporter){
            if(create==true){
                suporter = await Suporter.create({name, email, phone, password});
                return res.json(suporter);
            }else{
                return res.status(400).json({error: "Usuario e Senha Incorretos"});
            }
        }else{
            if(create==false){
                return res.json(suporter);
            }else{
                return res.status(400).json({error: "Usuario e Senha ja cadastrados"});
            }
        }
    }
};