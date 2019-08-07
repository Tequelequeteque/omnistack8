const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const loggedUser = await Dev.findById(user);

        const users = await Dev.find({
            $and:[
                { _id: { $ne: user }},
                { _id: { $nin: loggedUser.likes }},
                { _id: { $nin: loggedUser.dislikes }},
            ]
        });
        return res.json(users);
    },

    async store(req, res) {
        const { username: user } = req.body;

        const userExists = await Dev.findOne({ user: user });

        if (userExists) {
            return res.json(userExists);
        }

        const { name, bio, avatar_url: avatar } = (await axios.get(`https://api.github.com/users/${user}`)).data;
        
        const dev = await Dev.create({ name, user, bio, avatar });
        
        return res.json(dev);
    }
};