const router = require('express').Router();
const { isAuthenticated } = require('../middleware');
const Chat = require('../models/Chat');

router.get('/chats', isAuthenticated, async (req, res) => {
    try {
        const chats = await Chat.find({ user: req.user._id });
        res.send(chats);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/chats', isAuthenticated, async (req, res) => {
    try {
        const chat = new Chat(req.body);
        chat.user = req.user._id;
        await chat.save();
        res.send(chat);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;