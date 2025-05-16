const mongoose = require('mongoose')

// Definizione del modello degli utenti

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    friends: [{     //array contenente gli objectId degli amici dell'utente
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    requests: [{    //array contenente gli objectId delle richieste di amicizia ricevute dall'utente
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    img: String //immgagine di profilo dell'utente
});

module.exports = mongoose.model('User', userSchema);