import React from 'react';
import './style/ErrorLoadingPage.css'; 


// Componente per il render della pagina di errore (usata dal Componente Chat quando fallisce la ricerca dei messaggi di una Chat)
const ErrorLoadingPage = () => {
  return (
    <div className="err-loading-page">
      <p className="err-loading-text">Errore nel caricamento dei messaggi</p>
    </div>
  );
};

export default ErrorLoadingPage;