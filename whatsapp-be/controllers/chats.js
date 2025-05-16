const User = require('../models/users');
const Chat = require('../models/chats');

// File per la definizione dei controllori utili alla gestione delle chat

module.exports = {

    //controllore per la creazione di una nuova chat
    addChat: (req, res) => {
        User.findOne({ _id: req.body.loggedUserId })    //ricerca dell'utente loggato
        .then(loggedUser => {
            if (!loggedUser) { return res.status(404).json({ message: 'Utente non trovato' }) }
            User.findOne({ username: req.body.username })   //ricerca dell'utente con cui si vuole aprire la nuova chat
                .then(user => { if (!user) {return res.status(404).json({ message: 'Utente non trovato' });}
                Chat.findOne({partecipants: { $all: [loggedUser._id, user._id] }})  //check per verificare che i due utenti non abbiano già una chat
                    .then(existingChat => {
                    if (existingChat) { //in caso i due utenti abbiano già una chat, viene ritornata la chat già esistente
                        existingChat.populate('partecipants', 'username ')
                        return existingChat
                    }
                    const newChatData = {   //in caso i due utenti non abbiano già una chat, viene creata una nuova chat
                        partecipants: [loggedUser._id, user._id],
                        messages: []
                    };
                    return Chat.create(newChatData); 
                    })
                    .then(savedChat => { res.json(savedChat) })
                    .catch(error => {res.status(500).json({ message: 'Errore durante la creazione della chat' });});
                    }).catch(error => {res.status(500).json({ message: 'Errore durante la verifica della chat esistente' });})
                }).catch(error => {res.status(500).json({ message: 'Errore durante la ricerca dell\'utente' });})
            },

    //controllore per ottenere una chat già esistente
    getChatsByUsername: (req, res) => {
      User.findOne({username: req.params.username})
      .then( u => Chat.find({ partecipants: { $in: [u._id] } }).populate({
        path: "partecipants",
        select: "username img",
      }))
      .then( r => res.json(r))
    },

}