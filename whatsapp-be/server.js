const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const router = require('./routes/api')
const cors = require('cors');


// Creazione dell'app Express
const app = express();

// Creazione del server HTTP utilizzando l'app Express
const httpServer = http.createServer(app);

// Creazione di un'istanza di Socket.IO e configurazione delle opzioni
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000" 
    }
})

const port = 3001;
const db_url = '';

// Connessione al database MongoDB
mongoose.connect(db_url);
const db = mongoose.connection;

// Gestione dell'evento di connessione al database
db.once('open', () => {
    console.log('Connesso al db')
})

// Abilitazione del middleware CORS
app.use(cors());

// Abilitazione del middleware per il parsing delle richieste JSON
app.use(express.json())

// Configurazione del router per le API
app.use('/api', router)

// Gestione degli eventi di connessione a Socket.IO
io.on('connection', (socket) => {
    console.log('Nuova connessione Socket.io:', socket.id);

    socket.on('joinRoom', (roomId) => { // Gestione dell'evento 'joinRoom'
        console.log('siamo nella stanza '+ roomId)
      socket.join(roomId);
      console.log(`Utente ${socket.id} connesso alla room ${roomId}`);
    });
  
    socket.on('leaveRoom', (roomId) => { // Gestione dell'evento 'leaveRoom'
      socket.leave(roomId);
      console.log(`Utente ${socket.id} disconnesso dalla room ${roomId}`);
    });
  
    socket.on('sendMessage', (roomId) => { // Gestione dell'evento 'sendMessage'
        const room = socket.adapter.rooms.get(roomId);
        if (room && room.size > 1) {
          const clientsInRoom = Array.from(room).filter((clientId) => clientId !== socket.id);
          io.to(clientsInRoom[0]).emit('newMessage', roomId);
        }
      });
  
    socket.on('disconnect', () => { // Gestione dell'evento di disconnessione da Socket.IO
      console.log('Disconnessione Socket.io:', socket.id);
    });
  });

  // Avvio del server HTTP 
  httpServer.listen(port, () => console.log(`Listening on port ${port}`));
