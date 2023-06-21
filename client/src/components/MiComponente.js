import React, { useEffect, useState } from 'react';

const MiComponente = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error("Hubo un error al obtener los datos: ", error));
  }, []);

  return (
    <div>
      <h1>Respuesta de la API:</h1>
      <p>{message}</p>
    </div>
  );
}

export default MiComponente;
