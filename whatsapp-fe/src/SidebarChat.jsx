import React from 'react'
import "./style/SidebarChat.css"
import { Avatar } from '@mui/material'


// Componente per il render nella Sidebar della singola chat
function SidebarChat(props) {

  const nameChat = props.data.partecipants.filter(u => u._id !== props.loggedUser._id)[0].username;
  const imgChat = props.data.partecipants.filter(u => u._id !== props.loggedUser._id)[0].img;
  const user = props.data.partecipants.filter(u => u._id !== props.loggedUser._id)[0]

  const idChat = props.data._id;

  const handleClick = (e) => {
    e.preventDefault();
    props.setShowChat(idChat);
    props.setChatUsername(nameChat);
    props.setChatImg(imgChat)
  }

  return (
    <div className='sidebarChat' onClick = {handleClick}>
        <Avatar src = {imgChat}/>
        <div className='sidebarChat_info'>
            <h2>{nameChat}</h2>
        </div>
    </div>
  )
}

export default SidebarChat