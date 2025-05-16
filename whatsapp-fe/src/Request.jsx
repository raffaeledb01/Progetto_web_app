import React from 'react'
import "./style/SidebarChat.css"
import "./style/Friend.css"
import { Avatar } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


// Componente per il render nella Sidebar della singola richiesta
function Request(props) {

  return (
    <div className='sidebarFriend'>
        <Avatar src = {props.img} />
        <div className='sidebarChat_info'>
            <h2>{props.username}</h2>
        </div>
        <div className='buttonRequest'>
        <CancelIcon onClick = {() => props.declineRequest(props.username)} />
        <CheckCircleIcon onClick = {() => props.acceptRequest(props.username)} />
        
        </div>
    </div>
  )
}

export default Request