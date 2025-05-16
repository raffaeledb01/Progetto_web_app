import React from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import "./style/App.css";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import { useState } from 'react';
import { useEffect } from 'react';
import Home from './Home';
import { io } from 'socket.io-client';
import { useRef } from 'react';
import LoadingPage from './LoadingPage';
import ErrorLoadingPage from './ErrorLoadingPage';


//Componente App per il render e la gestione dell'intera applicazione
function App() {
  const [loggedUser, setLoggedUser] = useState(null); // Stato per l'utente loggato
  const [loading, setLoading] = useState(true); // Stato per la pagina di caricamento delle chat
  const [error, setError] = useState(false); // Stato per gli errori
  const [chats, setChats] = useState([]); // Stato per l'elenco delle chats nella Sidebar
  const navigate = useNavigate(); // Hook per la navigazione
  const [showChat, setShowChat] = useState(null); // Stato per la chat attualmente visualizzata
  const [chatUsername, setChatUsername] = useState(''); // Stato per il nome utente della chat attualmente visualizzata
  const [chatImg, setChatImg] = useState(''); // Stato per l'immagine della chat attualmente visualizzata
  const [messages, setMessages] = useState([]); // Stato per i messaggi della chat attualmente visualizzata
  const [socket, setSocket] = useState(null); // Stato per il socket di Socket.io
  const previousShowChat = useRef(showChat); // Riferimento al valore precedente di showChat


  // useEffect per la gestione della creazione e disconnessione del socket
  useEffect(() => {
    const newSocket = io('http://localhost:3001'); // Crea un nuovo socket
    setSocket(newSocket); 

    return () => {
      newSocket.disconnect(); // Disconnessione del socket 
    };
  }, []);


  // useEffect per gestire gli eventi di connessione, disconnessione ed errore del socke
  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Connected to Socket.io'); // Gestisce l'evento di connessione al socket
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from Socket.io'); // Gestisce l'evento di disconnessione dal socket
      });

      socket.on('error', (error) => {
        console.error('Socket.io Error:', error); // Gestisce gli errori di Socket.io
      });
    }
  }, [socket]);


  // Funzione per caricare tutte le chat
  const fetchAllChats = () => {
    fetch(`http://localhost:3001/api/chats/all/${loggedUser.username}`)
      .then(res => {
        if (res.ok) return res.json();
        else throw new Error('Si è verificato un errore nella comunicazione con il server');
      })
      .then(obj => {
        setChats(obj);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
        setError(true);
      });
  }


  // Funzione per cambiare l'utente loggato
  function changeLoggedUser(username, password) {
    fetch('http://localhost:3001/api/users/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'username': username, 'password': password })
    })
      .then(res => res.json())
      .then(user => {
        if (user.error === 'Utente non trovato') {
          alert('Utente non trovato');
        } else if (user.error === 'Password errata') {
          alert('Password errata');
        } else {
          setLoggedUser(user);
          navigate(`/${user.username}`);
          return user;
        }
      })
      .catch(error => {
        setError(error);
        console.error(error);
      });
  };


  // Funzione per registrare un nuovo utente
  const signUpUser = (username, password, img) => {
    fetch('http://localhost:3001/api/users/new', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'username': username, 'password': password, 'img': img })
    })
      .then(res => res.json())
      .then(user => {
        if (user.error === 'Utente già esistente') {
          alert('Utente già esistente');
        } else {
          setLoggedUser(user);
          navigate(`/${user.username}`);
          return user;
        }
      })
      .catch(error => {
        setError(error);
        console.error(error);
      });
  };


  // useEffect per caricare le chats dell'utente loggato quando cambia
  useEffect(() => {
    if (loggedUser)
      fetchAllChats();
  }, [loggedUser]);


  // useEffect per gestire gli eventi joinRoom, leaveRoom e newMessage al variare degli stati socket e showChat
  useEffect(() => {
    if (socket && previousShowChat.current) {
      socket.emit('leaveRoom', previousShowChat.current); // emit dell'evento di leaveRoom quando l'utente cambia la chat attualmente visualizzata
    }

    if (socket && showChat) {
      socket.emit('joinRoom', showChat); // emit dell'evento di joinRoom quando l'utente visualizza una nuova chat
      fetch(`http://localhost:3001/api/messages/getAllMessages/${showChat}`)
        .then(res => res.json())
        .then(messages => {
          setLoading(false);
          setMessages(messages);
        })
        .catch(error => {
          setError(error);
          console.error(error);
        });
    }

    if (socket && showChat) {
      socket.on('newMessage', (roomId) => { //on dell'evento di newMessage che carica i messaggi della chat attualmente visualizzata
        if (showChat === roomId) {
          fetch(`http://localhost:3001/api/messages/getAllMessages/${showChat}`)
            .then(res => res.json())
            .then(messages => {
              setLoading(false);
              setMessages(messages);
            })
            .catch(error => {
              setError(error);
              console.error(error);
            });
        }
      });
    }

    previousShowChat.current = showChat; //salvataggio del valore precedente di showChat per rilevare il cambio di chat attualmente visualizzata

    return () => {
      if (socket && previousShowChat.current) {
        socket.emit('leaveRoom', previousShowChat.current); // emit dell'evento di leaveRoom quando cambia la chat visualizzata
      }
    };
  }, [socket, showChat]);

  // Aggiungi una nuova chat
  const addChat = (username) => {
    fetch('http://localhost:3001/api/chats/new', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'username': username, 'loggedUserId': loggedUser._id })
    })
      .then(res => { return res.json() })
      .then(obj => { setShowChat(obj._id) })
      .catch(error => {
        console.error(error);
      });
  }


  
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login changeLoggedUser={changeLoggedUser} loggedUser={loggedUser} />} />
      <Route path='/signup' element={<SignUp signUpUser={signUpUser} loggedUser={loggedUser} />} />
      <Route
        path=':username'
        element={
          <div className='app'>
            <div className='app_body'>
              <Sidebar
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
                chats={chats}
                setShowChat={setShowChat}
                addChat={addChat}
                fetchAllChats={fetchAllChats}
                setChatUsername={setChatUsername}
                setChatImg={setChatImg}
                setLoading={setLoading}
              />
              {loading ? <LoadingPage /> : error ? <ErrorLoadingPage /> :
                <Chat
                  loggedUser={loggedUser}
                  messages={messages}
                  showChat={showChat}
                  chatUsername={chatUsername}
                  chatImg={chatImg}
                  setShowChat={setShowChat}
                  setMessages={setMessages}
                  setLoading={setLoading}
                  socket={socket}
                />
              }
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;

