const User = require('../models/users');
const Chat = require('../models/chats');

// File per la definizione dei controllori utili alla gestione degli utenti

module.exports = {

  //controllore per la creazione di un nuovo utente
  addUser: (req, res) => {
    User.findOne({  //verifico che non esista alcun utente con lo stesso username
      username: req.body.username,
    })
      .then(existingUser => {
        if (existingUser) {   //in caso dovesse già esistere un utente con quello username, viene ritornato un messaggio di errore
          res.json({ "error": "Utente già esistente" });
        } else {
          User.create({   //in caso non esista alcun utente con lo username inserito, viene creato un nuovo utente
            username: req.body.username,
            password: req.body.password,
            img: req.body.img
          })
            .then(newUser => res.json(newUser))
            .catch(error => {
              res.json({ "error": "Errore durante la creazione dell'utente" });
            });
        }
      })
      .catch(error => {
        res.json({ "error": "Errore durante la ricerca dell'utente" });
      });
  },

  //controllore per ottenere un utente già esistente
    loginUser: (req, res) => {
      User.findOne({
        username: req.body.username,
      })
        .then(user => {
          if (user) {   //verifico la correttezza della password
            if (req.body.password === user.password) {
              res.json(user);
            } else {
              res.json({ "error": "Password errata" });
            }
          } else {
            res.json({ "error": "Utente non trovato" });
          }
        })
        .catch(error => {
          res.json({ "error": "Errore durante la ricerca dell'utente" });
        });
    },

    //controllore per ottenere la lista di amici di un utente
    getAllFriends: (req, res) => {
        User.findOne({_id: req.params.idUser})
        .populate('friends')
        .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        res.json({ friends: user.friends });
        })
        .catch(err => {
        res.status(500).json({ message: 'Si è verificato un errore durante la ricerca degli amici' });
        });
    },

    //controllore per aggiungere un nuovo amico agli amici di un utente
    addFriend: (req, res) => {
       User.findOne({ _id: req.body.loggedUserId })
          .then(loggedUser => {
            if (!loggedUser) { return res.status(404).json({ message: 'Utente non trovato' }); }
            User.findOne({ username: req.body.username })
              .then(user => {
                if (!user) { 
                  return res.status(404).json({ message: 'Utente non trovato' }); 
                } 

                //gestisco il caso in cui l'utente è già mio amico
                let isFriendLoggedUser = true;
                if (loggedUser.friends.length !== 0) {
                  isFriendLoggedUser = loggedUser.friends.some(friendId => friendId.equals(user._id))
                } else if (loggedUser.requests.length === 0 ) { 
                  isFriendLoggedUser = false
                }
                if(isFriendLoggedUser) { 
                  return res.status(400).json({ message: "L'utente è già tuo amico" });
                }

                //gestisco il caso in cui l'utente non è nostro amico quindi può avvenire l'invio della richiesta di amicizia
                let isFriendUser = true;
                if (user.requests.length !== 0) {
                  isFriendUser = user.requests.some(requestsId => requestsId.equals(loggedUser._id))
                } else if (user.requests.length === 0) {
                  isFriendUser = false
                }
                if (isFriendUser) { //gestisco il caso in cui l'utente non è nostro amico ma ha già inviato la richiesta di amicizia
                  return res.status(400).json({ message: 'Richiesta gia inviata' }); 
                }

                user.requests.push(loggedUser._id);
                return Promise.all([user.save()]);
              })
              .then(() => {
                res.json({ message: 'Richiesta mandata con successo' });
              })
              .catch(err => {
                res.status(500).json({ message: 'Si è verificato un errore durante la richiesta di amicizia '});
              });
          })
          .catch(err => {
            res.status(500).json({ message: 'Si è verificato un errore durante la ricerca dell\'utente' });
          });
      },

    //controllore per ottenere la lista di richieste di amicizia di un utente
    getAllRequests: (req, res) => {
      User.findOne({_id: req.params.idUser})
      .populate('requests')
      .then(user => {
      if (!user) {
          return res.status(404).json({ message: 'Utente non trovato' });
      }
      res.json({ requests: user.requests });
      })
      .catch(err => {
      res.status(500).json({ message: 'Si è verificato un errore durante la ricerca delle richiesta di amicizia' });
      });
    },

    //controllore per accettare una richiesta di amicizia
    acceptRequest: (req, res) => {
      User.findOne({ _id: req.body.loggedUserId })
        .then(loggedUser => {
        if (!loggedUser) { return res.status(404).json({ message: 'Utente non trovato' }); }
        User.findOne({ username: req.body.username })
          .then(user => {
          if (!user) { return res.status(404).json({ message: 'Utente non trovato' }); }
          loggedUser.requests = loggedUser.requests.filter(request => !request.equals(user._id));
        
          user.friends.push(loggedUser._id);
          loggedUser.friends.push(user._id)
          return Promise.all([user.save(), loggedUser.save()]);
          })
          .then(() => {
            res.json({ message: 'Richiesta mandata con successo' });
          })
          .catch(err => {
            res.status(500).json({ message: 'Si è verificato un errore durante la richiesta di amicizia '});
          });
        })
        .catch(err => {
          res.status(500).json({ message: 'Si è verificato un errore durante la ricerca dell\'utente' });
        })
    },

    //controllore per rifiutare una richiesta di amicizia
    declineRequest: (req, res) => {
      User.findOne({ _id: req.body.loggedUserId })
        .then(loggedUser => {
        if (!loggedUser) { return res.status(404).json({ message: 'Utente non trovato' }); }
        User.findOne({ username: req.body.username })
          .then(user => {
          if (!user) { return res.status(404).json({ message: 'Utente non trovato' }); }

          loggedUser.requests = loggedUser.requests.filter(request => !request.equals(user._id));
          return Promise.all([user.save(), loggedUser.save()]);
        })
        .then(() => {
          res.json({ message: 'Richiesta rifiutato con successo' });
        })
        .catch(err => {
          res.status(500).json({ message: "Si è verificato un errore durante il rifiuto dell'amicizia "});
        });
        })
        .catch(err => {
        res.status(500).json({ message: 'Si è verificato un errore durante la ricerca dell\'utente' });
        })
    },

    //controllore per rimuovere un amico dalla lista di amici
    removeFriend: (req, res) => {
      User.findOne({ _id: req.body.loggedUserId })
        .then(loggedUser => {
          if (!loggedUser) {
            return res.status(404).json({ message: 'Utente non trovato' });
          }
          User.findOne({ username: req.body.username })
            .then(user => {
              if (!user) {
                return res.status(404).json({ message: 'Utente non trovato' });
              }
              loggedUser.friends = loggedUser.friends.filter(friendId => !friendId.equals(user._id));
              user.friends = user.friends.filter(friendId => !friendId.equals(loggedUser._id));
              Chat.findOneAndDelete({ partecipants: { $all: [loggedUser._id, user._id] } })
                .then(() => {
                  return Promise.all([user.save(), loggedUser.save()]);
                })
                .then(() => {
                  res.json({ message: 'Amico rimosso con successo e chat eliminata' });
                })
                .catch(err => {
                  res.status(500).json({ message: 'Si è verificato un errore durante la rimozione dell\'amicizia e della chat' });
                });
            })
            .catch(err => {
              res.status(500).json({ message: 'Si è verificato un errore durante la ricerca dell\'utente' });
            });
        })
        .catch(err => {
          res.status(500).json({ message: 'Si è verificato un errore durante la ricerca dell\'utente' });
        });
    },
  }
