const Message = require('../models/messages');
const express = require('express');
const Chat = require('../models/chats');
const messages = require('../models/messages');
const User = require('../models/users');

// File per la definizione dei controllori utili alla gestione dei messaggi

module.exports = {

    //controllore per la creazione di un nuovo messaggio alla chat
    addMessage: (req, res) => {
        Message.create({
            author: req.body.author,
            content: req.body.content,
            timeStamp: req.body.timeStamp,
        })
        .then(message => {
            const chatId = req.body.chatId;
            return Chat.findOneAndUpdate(
                {_id: chatId},
                { $push: { messages: message._id}},
                { new: true}
            ).populate({
                path: 'messages',
                populate: {
                  path: 'author',
                  select: 'username' 
                }
              })
        }).then(updatedChat => {
            if(updatedChat) {
                res.json(updatedChat.messages)
            }else {
                throw new Error('Chat not found');  
            }
        }).catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
          });
            
    },
      
    //controllore per ottenere tutti i messaggi di una chat già esistente
    getAllMessagesbyChat: (req, res) => {
       Chat.findOne({_id: req.params.idChat}).populate({
        path: 'messages',
        populate: {
          path: 'author',
          select: 'username' 
        }
      })
       .then(chat => res.json(chat.messages)) 
    }
}