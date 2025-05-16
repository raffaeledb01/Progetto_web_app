const express = require('express');
const chatsControllers = require('../controllers/chats');
const router = express.Router();

// Configurazione delle routes di chats
router.post('/new', chatsControllers.addChat)
router.get('/all/:username', chatsControllers.getChatsByUsername)

module.exports = router;