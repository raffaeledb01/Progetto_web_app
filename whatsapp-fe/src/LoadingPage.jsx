import React from 'react';
import './style/LoadingPage.css'; 


// Componente per il render della pagina di caricamento (usata dal Componente Chat quando non è stata ancora selezionata una chat da visualizzare)
const LoadingPage = () => {
  return (
    <div className="loading-page">
      <p className="loading-text">Seleziona una chat per iniziare a messaggiare</p>
    </div>
  );
};

export default LoadingPage;
