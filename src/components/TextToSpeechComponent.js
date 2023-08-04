import React, { useState } from 'react';

const TextToSpeechComponent = () => {
  const [text, setText] = useState('');

  const synthesizeSpeech = async () => {
    // Definir la URL del servidor
    const serverUrl = `https://adstreamserver-d962608709d6.herokuapp.com/synthesizeSpeech?text=${text}&languageCode=es-US&ssmlGender=MALE&voiceName=es-US-Neural2-B`;

    // Realizar la solicitud al servidor
    const response = await fetch(serverUrl);

    // Comprobar si la solicitud fue exitosa
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Obtener los datos de audio de la respuesta
    const audioContent = await response.blob();
    
    // Crear un objeto Blob con los datos de audio y reproducirlo
    const audioUrl = window.URL.createObjectURL(audioContent);
    new Audio(audioUrl).play();
  };

  return (
    <div>
      <textarea 
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Escribe aquí el texto a convertir a voz"
      />
      <button onClick={synthesizeSpeech}>Leer en voz alta</button>
    </div>
  );
};

export default TextToSpeechComponent;
