import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';

const TextToSpeechComponent = () => {
  const maleVoices = [
    { realName: 'es-US-Neural2-B', nickname: 'Neural Hombre 1' },
    { realName: 'es-US-Neural2-C', nickname: 'Neural Hombre 2' },
    { realName: 'es-US-News-D', nickname: 'Noticias Hombre 1' },
    { realName: 'es-US-News-E', nickname: 'Noticias Hombre 2' },
    { realName: 'es-US-Polyglot-1', nickname: 'Políglota Hombre 1' },
    { realName: 'es-US-Standard-B', nickname: 'Estándar Hombre 1' },
    { realName: 'es-US-Standard-C', nickname: 'Estándar Hombre 2' },
    { realName: 'es-US-Studio-B', nickname: 'Estudio Hombre 1' },
    { realName: 'es-US-Wavenet-B', nickname: 'Wavenet Hombre 1' },
    { realName: 'es-US-Wavenet-C', nickname: 'Wavenet Hombre 2' },
  ];

  const femaleVoices = [
    { realName: 'es-US-Neural2-A', nickname: 'Neural Mujer 1' },
    { realName: 'es-US-News-F', nickname: 'Noticias Mujer 1' },
    { realName: 'es-US-News-G', nickname: 'Noticias Mujer 2' },
    { realName: 'es-US-Standard-A', nickname: 'Estándar Mujer 1' },
    { realName: 'es-US-Wavenet-A', nickname: 'Wavenet Mujer 1' },
  ];

  const [text, setText] = useState('Hola, ¿cómo estás?');
  const [voice, setVoice] = useState(maleVoices[0].realName);

  const synthesizeSpeech = async () => {
    const serverUrl = `https://adstreamserver-d962608709d6.herokuapp.com/synthesizeSpeech?text=${text}&languageCode=es-US&ssmlGender=${voice.includes('A') || voice.includes('F') || voice.includes('G') ? 'FEMALE' : 'MALE'}&voiceName=${voice}`;

    const response = await fetch(serverUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const audioContent = await response.blob();
    const audioUrl = window.URL.createObjectURL(audioContent);
    new Audio(audioUrl).play();
  };

  return (
    <div className='flex flex-row items-center justify-center h-screen'>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Escribe aquí el texto a convertir a voz"
        className='border border-gray-400 rounded-lg p-4 w-96 h-20'
      />
      <select 
        value={voice} 
        onChange={e => setVoice(e.target.value)}
        className='border border-gray-400 rounded-lg p-2 w-48 h-10 ml-4'
      >
        <optgroup label="Male Voices">
          {maleVoices.map((voiceOption, index) => (
            <option value={voiceOption.realName} key={index}>
              {voiceOption.nickname}
            </option>
          ))}
        </optgroup>
        <optgroup label="Female Voices">
          {femaleVoices.map((voiceOption, index) => (
            <option value={voiceOption.realName} key={index}>
              {voiceOption.nickname}
            </option>
          ))}
        </optgroup>
      </select>
      <button
        onClick={synthesizeSpeech}
        className='rounded-full h-12 w-12 bg-massad-500 flex justify-center items-center shadow-sm ml-4 text-white'
      >
        <FaPlay size={20} />
      </button>
    </div>
  );
};

export default TextToSpeechComponent;
