const express = require('express');
const usersControllers = require('../controllers/users');
const router = express.Router();

// Configurazione delle routes di users
router.post('/new', usersControllers.addUser)
router.post('/login', usersControllers.loginUser)
router.get('/getFriends/:idUser', usersControllers.getAllFriends)
router.post('/addFriend', usersControllers.addFriend)
router.get('/getRequests/:idUser', usersControllers.getAllRequests)
router.post('/acceptRequest', usersControllers.acceptRequest)
router.post('/declineRequest', usersControllers.declineRequest)
router.post('/removeFriend', usersControllers.removeFriend)

module.exports = router;