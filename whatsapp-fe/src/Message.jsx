import React from "react";
import './style/Message.css'

// Componente per il render nella Chat del singolo messaggio
function Message(props) {
    return (
        <p className={ props.loggedUser.username === props.author.username ? 'chat_message ' : 'chat_receiver'}>
                <span className='chat_name'>{props.author.username}</span>
                {props.content}
                <span className='chat_timestamp'>{props.timeStamp}</span>
        </p>
    )
}

export default Message