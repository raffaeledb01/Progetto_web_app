import React from 'react'
import "./style/SidebarChat.css"
import "./style/Friend.css"
import { Avatar } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

// Componente per il render nella Sidebar del singolo amico
function Friend(props) {

  return (
    <div className='sidebarFriend'>
        <Avatar src = {props.img} />
        <div className='sidebarChat_info'>
            <h2>{props.username}</h2>
        </div>
        <div className='buttonRequest'>
        <DeleteIcon onClick = {() => {props.removeFriend(props.username); props.setLoading(true)}} />
        <SendIcon onClick = {() => {props.addChat(props.username); props.setChatUsername(props.username); props.setChatImg(props.img)}} />
        </div>
    </div>
  )
}

export default Friend