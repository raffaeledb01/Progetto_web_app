import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import "./style/Sidebar.css"
import PeopleIcon from '@mui/icons-material/People';
import { Avatar, IconButton } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import ChatsContainer from './ChatsContainer';
import FriendsContainer from './FriendsContainer';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import RequestsContainer from './RequestsContainer';
import LogoutIcon from '@mui/icons-material/Logout';


//Componente per il render della barra laterale in cui mostro e gestisco il logout e l'elenco degli amici, delle chat e delle notifiche
function Sidebar(props) {

    const [showFriends, setShowFriends] = useState(false);  //Stato per gestire la visualizzazione della lista di amici
    const [showListChats, setShowListChats] = useState(true); //Stato per gestire la visualizzazione della lista di chat
    const [showRequests, setShowRequests] = useState(false) //Stato per gestire la visualizzazione della lista di richieste
    const [friends, setFriends] = useState([]); //Stato per la lista di amici
    const [requests, setRequests] = useState([]); //Stato per la lista di richieste
    const [inputValueFriend, setInputValueFriend] = useState(''); //Stato per la gestione dell'input nell'aggiunta di un amico
    
    const navigate = useNavigate()

    // Handler per settare lo stato showFriends
    const handleClickFriends = (e) => {
        e.preventDefault();
        setShowFriends(true);
        setShowListChats(false);
        setShowRequests(false);
    }

    // Handler per settare lo stato showListChats
    const handleClickChats = (e) => {
        e.preventDefault();
        setShowListChats(true);
        setShowFriends(false);
        setShowRequests(false);
    }

    // Handler per settare lo stato showRequests
    const handleClickRequests = (e) => {
      e.preventDefault()
      setShowRequests(true)
      setShowListChats(false)
      setShowFriends(false)
    }

    // Handler per eseguire la funzione addFriend per l' aggiunta di un amico
    const handleClickAddFriend = (e) => {
      let trimmedValueFriend = inputValueFriend.trim();
      if (trimmedValueFriend !== '') {
        addFriend(inputValueFriend);
        setInputValueFriend('');
      }
    }

     // Handler per gestire la disconnessione
    const handleLogout = (e) => {
      e.preventDefault();
      props.setLoggedUser(null);
      props.setLoading(true);
      navigate('/');
    }

    // Funzione per l'aggiunta di un nuovo amico
    const addFriend = (username) => {
        fetch('http://localhost:3001/api/users/addFriend', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'username': username, 'loggedUserId': props.loggedUser._id})
          })
          .then(res => res.json())
          .catch(error => {
            console.error(error);
          });
    }

    // Funzione per caricare la lista di amici
    const fetchFriends = () => {
      fetch(`http://localhost:3001/api/users/getFriends/${props.loggedUser._id}`)
            .then(res => {
              if (res.ok) return res.json();
              else throw new Error('Si è verificato un errore nella comunicazione con il server');
            })
            .then(obj => {
              setFriends(obj.friends);
            })
            .catch(error => {
              console.log(error);
            });
    }

    // Funzione per caricare la lista di richieste
    const fetchRequests = () => {
      fetch(`http://localhost:3001/api/users/getRequests/${props.loggedUser._id}`)
            .then(res => {
              if (res.ok) return res.json();
              else throw new Error('Si è verificato un errore nella comunicazione con il server');
            })
            .then(obj => {
              setRequests(obj.requests);
            })
            .catch(error => {
              console.log(error);
            });
    }

    // useEffect per gestire il cambiamento dello stato showListChats e visualizzare nella SidebarChat la lista di chat, di amici o di richieste
    useEffect(() => {
      
      // Esecuzione della funzione fetchFriends quando lo stato showFriends è vero
        if (showFriends && !showListChats && !showRequests) {
          fetchFriends();
      }}, [showFriends]);

      // Esecuzione della funzione fetchRequests quando lo stato showRequests è vero
      useEffect(() => {
        if (!showFriends && !showListChats && showRequests) {
          fetchRequests();
      }}, [showRequests]);

      // Esecuzione della funzione fetchFriends quando lo stato showListChats è vero
      useEffect(() => {
        if (!showFriends && showListChats && !showRequests) {
          props.fetchAllChats();
      }}, [showListChats])

      // Funzione per accettare una richiesta di amicizia
      const acceptRequest = (username) => {
        fetch('http://localhost:3001/api/users/acceptRequest', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'username': username, 'loggedUserId': props.loggedUser._id})
        })
        .then(res => res.json())
        .then(() => fetchRequests())
        .catch(error => {
          console.error(error);
        });
      }

      // Funzione per rifiutare una richiesta di amicizia
      const declineRequest = (username) => {
        fetch('http://localhost:3001/api/users/declineRequest', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'username': username, 'loggedUserId': props.loggedUser._id})
        })
        .then(res => res.json())
        .then(() => fetchRequests())
        .catch(error => {
          console.error(error);
        });
      }

      // Funzione per rimuovere un amico
      const removeFriend = (username) => {
        fetch('http://localhost:3001/api/users/removeFriend', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'username': username, 'loggedUserId': props.loggedUser._id})
        })
        .then(res => res.json())
        .then(() => fetchFriends())
        .catch(error => {
          console.error(error);
        });
      }

    return (
    <div className='sidebar'>
        <div className='sidebar_header'>
            <Avatar src= {props.loggedUser.img}/>
            <h3>{props.loggedUser.username}</h3>
            <div className='sidebar_header_right'>
                <IconButton onClick = {handleClickFriends}>
                    <PeopleIcon />
                </IconButton>
                <IconButton onClick = {handleClickChats}>
                    <ChatIcon />
                </IconButton>
                <IconButton onClick = {handleClickRequests}>
                    <NotificationsActiveIcon />
                </IconButton>
                <IconButton onClick = {handleLogout}>
                    <LogoutIcon />
                </IconButton> 
            </div>
        </div>
        <div className='sidebar_search'>
           <div className='sidebar_search_container'>
            {showFriends ? <><PersonAddIcon  />
            <input 
            type='text' 
            value = {inputValueFriend} 
            onChange = {(e => {
                setInputValueFriend(e.target.value)
            })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleClickAddFriend();
              }
            }}
            placeholder='Aggiungi amico ...' /></> : showListChats ?
            <><SearchIcon /><input type='text' placeholder='Cerca Chat' /></> : <></>
            }
                
           </div>
        </div>
        <div className='sidebarChats'>
            {showFriends ? 
              <FriendsContainer
                friends = {friends}
                loggedUser = {props.loggedUser}
                removeFriend = {removeFriend}
                addChat = {props.addChat}
                setChatUsername= {props.setChatUsername}
                setChatImg = {props.setChatImg}
                setLoading = {props.setLoading}/> : showListChats ? 
              <ChatsContainer chats={props.chats}
                loggedUser = {props.loggedUser}
                setShowChat = {props.setShowChat}
                setChatUsername= {props.setChatUsername}
                setChatImg = {props.setChatImg}/> :
              <RequestsContainer 
                requests = {requests}
                loggedUser = {props.loggedUser}
                acceptRequest = {acceptRequest}
                declineRequest = {declineRequest}/>
            }
        </div>
    </div>
  )
}

export default Sidebar