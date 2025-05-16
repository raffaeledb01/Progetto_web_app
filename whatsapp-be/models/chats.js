const mongoose = require('mongoose');

// Definizione del modello dell chat

const chatSchema = mongoose.Schema({
    partecipants: [{    //array contenente gli objectId dei partecipanti alla chat
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [{    //array contenente gli objectId dei messaggi della chat
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
});

module.exports = mongoose.model('Chat', chatSchema);