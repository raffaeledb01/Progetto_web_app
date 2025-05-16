import React from "react";
import { Link } from "react-router-dom";
import "./style/Button.css";

//Pulsante utilizzato per Login e Sign Up
export default function Button({ description, url }) {
  return (
    <div className="button-container">
      <Link to={url}>{description}</Link>
    </div>
  );
}