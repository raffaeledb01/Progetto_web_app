import React from "react";
import Request from "./Request";

// Componente per mappare l'array di richieste e renderizzarle
export default function RequestsContainer(props) {
    return  props.requests.map( request => <Request 
        username = {request.username}
        img = {request.img} 
        key = {request._id} 
        loggedUser = {props.loggedUser}
        acceptRequest = {props.acceptRequest}
        declineRequest = {props.declineRequest} /> ) 
}