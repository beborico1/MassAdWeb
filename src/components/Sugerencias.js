import React, { useEffect } from 'react'

export default function Sugerencias() {

    const handleCallOpenAIAPI = (prompt) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        };

        fetch('https://api.openai.com/v1/engines/davinci/completions', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

  return (
    <div>Sugerencias</div>
  )
}
