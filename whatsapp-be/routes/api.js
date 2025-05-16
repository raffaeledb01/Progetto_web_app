const express = require('express')
const messagesRouter = require('./messages')
const chatsRouter = require('./chats')
const usersRouter = require('./users')

const router = express.Router()

// Configurazione delle routes principali
router.use('/messages', messagesRouter)
router.use('/users', usersRouter)
router.use('/chats', chatsRouter)

module.exports = router