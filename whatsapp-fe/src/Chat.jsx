import React, { useState } from 'react'
import "./style/Chat.css"
import { Avatar, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import MessagesContainer from './MessagesContainer';

//Componente Chat in cui sono renderizzati e gestiti i messaggi
function Chat(props) {
    const [inputValue, setInputValue] = useState('') // Stato per la gestione dell'input

    // Funzione per l'aggiunta di un nuovo messaggio
    function addMessage(content, chatId) {
        const now = new Date();
        const year = now.getFullYear(); 
        const month = now.getMonth() + 1; 
        const day = now.getDate(); 
        const hours = now.getHours(); 
        const minutes = now.getMinutes(); // 
        const timeStamp = `${hours}:${minutes} - ${day}/${month}/${year}`;
        
        fetch('http://localhost:3001/api/messages/new', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                author: props.loggedUser._id,
                content: content,
                chatId: chatId,
                timeStamp: timeStamp
            })
        }).then(res => res.json())
        .then(messages => {
            props.setLoading(false); 
            props.setMessages(messages);
            props.socket.emit('sendMessage', chatId)
        })
    }
  
  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar src = {props.chatImg}/>
            <div className='chat_header_info'>
                <h3>{props.chatUsername}</h3>
            </div>
            <div className='chat_header_right'>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <IconButton>
                    <AttachFileIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>
        <div className='chat_body'>
            <div className = 'chat_body_reverse'>
            <MessagesContainer messages = {props.messages} loggedUser = {props.loggedUser} showChat = {props.showChat} />
            </div>
        </div>

        <div className='chat_footer'>
            <InsertEmoticonIcon />
            <form onSubmit={(e) => {
                e.preventDefault();
                let trimmedValue = inputValue.trim();
                if (trimmedValue !== '') {
                    addMessage(trimmedValue, props.showChat);
                    setInputValue('');
                }
                }}>
                <input
                placeholder="Scrivi un messaggio"
                type="text"
                name = 'message'
                value = {inputValue}
                onChange={e => {
                    e.preventDefault();
                    setInputValue(e.target.value)

                }}
                
                />
                <button type="submit">
                    Invia
                </button>
            </form>
            <MicIcon />
        </div>
    </div>
  )
}

export default Chat