import React from "react";
import Button from "./Button";
import "./style/Home.css";


//Componente per il render della pagina iniziale per scegliere se loggarsi o iscriversi
function Home() {
  return (
    <div className="container">
      <h1>Benvenut@ nella nostra app di messaggistica</h1>
      <div className="button-container">
        <Button description="LOG IN" url="./login" />
        <Button description="SIGN UP" url="./signup" />
      </div>
    </div>
  );
}

export default Home;