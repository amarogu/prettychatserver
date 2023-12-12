const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    origin: {
        type: String,
        enum: ['assistant', 'user'],
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const chatSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    messages: [messageSchema],
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
