import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import TextAreaComponent from './TextAreaComponent';
import { auth, db } from '../helpers/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Preguntas() {
    const [pregunta, setPregunta] = useState('');
    const [preguntas, setPreguntas] = useState([]);
    const [respuesta, setRespuesta] = useState('');
    const [respuestas, setRespuestas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [generandoCampaña, setGenerandoCampaña] = useState(false);

    const navigate = useNavigate();

    const numPreguntas = 3;

    const handleCallOpenAIAPI = async (prompt) => {
        console.log('handleCallOpenAIAPI');
        console.log('prompt', prompt);
        console.log('process.env.REACT_APP_OPENAI_API_KEY', process.env.REACT_APP_OPENAI_API_KEY);
        
        
        setLoading(true);
        
        try {
            const result = await axios.post('https://api.openai.com/v1/chat/completions', { // Llama a la API de OpenAI
                model: "gpt-3.5-turbo", // Define el modelo
                temperature: 0.0, // Define la temperatura
                messages: [ // Define los mensajes
                    {"role": "system", "content": prompt}, // Define el mensaje del usuario
                ] // Cierra los mensajes
            }, { // Cierra el primer parámetro
                headers: { // Define los headers
                    'Content-Type': 'application/json', // Define el tipo de contenido
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Define la autorización
                } // Cierra los headers
            }); // Cierra la llamada a la API de OpenAI
            setLoading(false);
            if (result && result.data && result.data.choices && result.data.choices[0] && result.data.choices[0].message && result.data.choices[0].message.content) {
                console.log(result.data.choices[0].message.content); // Muestra el contenido
                setError(null);
                return result.data.choices[0].message.content; // Define el contenido
            } else {
                setLoading(false);
                console.error('Error calling OpenAI API 1');
                setError('Hubo un error al querer generar la pregunta, por favor intenta de nuevo.');
                throw new Error('Error calling OpenAI API 1'); // Lanza un error
            }
        } catch (error) {
            setLoading(false);
            console.error('Error calling OpenAI API 2', error);
            setError('Hubo un error al querer generar la pregunta, por favor intenta de nuevo.');
            throw error;  // Lanzamos el error para que sea manejado por el código que llama a esta función
        }
    }

    const generateQuestionPrompt = (preguntasParametro, respuestasParametro) => {
        console.log('generateQuestionPrompt');
        let prompt = `
Imagina que trabajas haciendo campañas publicitarias para la Radio.
Y te acercas a un potencial cliente para ofrecerle tus servicios, aún no sabes lo que su compañía hace.\n`;
    
        preguntasParametro.forEach((pregunta, index) => {
            prompt += `
Entonces le preguntas: ${pregunta}.
Y te responde: ${respuestasParametro[index]}.`;
        });

        if (preguntasParametro.length === 0) {
            prompt += '¿Cuál fuera la primera pregunta que le harías?, asegurate de comenzar la pregunta con el signo ¿ y terminarla con el signo ?';
        } else {
            prompt += `\n¿Si tuvieras que dar un número del 0 al 100, hasta ahora qué tanta información hay para generar una campaña publicitaria para esta compañía? Y cuál fuera la siguiente pregunta que le harías, para extraer información que sea necesaria para generar su campaña publicitaria?, ten en cuenta que solo tendrás ${numPreguntas-preguntas.length} más, asegurate de no hacer una pregunta que se haya hecho antes, asegurate de comenzar la pregunta con el signo ¿ y terminarla con el signo ?`;
        }
    
        return prompt;
    }; 
    
    const handleQuestionExtraction = (response) => {
        console.log('handleQuestionExtraction');
        const preguntasExtract = response.match(/(¿[^?]*\?)/g);
        if (preguntasExtract === null) {
            return '';
        }
        return preguntasExtract[0];
    };

    const generarPregunta = async (respuestasParametro) => {
        console.log('generarPregunta');

        console.log(preguntas,preguntas.length);

        // Si la ultima respuesta es undefined o null, no se genera la pregunta
        if (preguntas.length !== 0 && !error && (respuestasParametro[respuestasParametro.length - 1] === undefined || respuestasParametro[respuestasParametro.length - 1] === null)) {
            toast.error('Por favor, ingresa una respuesta.');
            return;
        }

        // respuestas y preguntas debene tener la misma longitud si no no se genera la pregunta
        if (preguntas.length !== 0 && !error && (respuestasParametro.length !== preguntas.length)) {
            toast.error('Por favor, ingresa una respuesta.');
            return;
        }
        
        try {
            const response = await handleCallOpenAIAPI(generateQuestionPrompt(preguntas, respuestasParametro));
            const nuevaPregunta = handleQuestionExtraction(response);
            setPregunta(nuevaPregunta);
            setPreguntas([...preguntas, nuevaPregunta]);
            setLoading(false);
        } catch (error) {
            console.error('Error generating question', error);
            setError('Hubo un error al querer generar la pregunta, por favor intenta de nuevo.');
            // Aquí puedes manejar el error, por ejemplo mostrando un mensaje al usuario
        }
    }

    const handleRespuesta = async () => {
        console.log('handleRespuesta');

        if (pregunta === '') {
            toast.error('Por favor, genera una pregunta primero.');
            return;
        }

        if (respuesta === '') {
            toast.error('Por favor, ingresa una respuesta.');
            return;
        }

        const newRespuestas = [...respuestas, respuesta];
        console.log(newRespuestas);
        setRespuestas(newRespuestas);
        setRespuesta('');
        setPregunta('');

        if (preguntas.length >= numPreguntas) {
            handleGenerarCampaña(preguntas, newRespuestas);
            return;
        }

        generarPregunta(newRespuestas);
    }

    const handleGenerarCampañaPrompt = (preguntasParametro, respuestasParametro) => {
        console.log('handleGenerarCampañaPrompt');
        let prompt = `
Imagina que trabajas haciendo campañas publicitarias para la Radio.
Y te acercas a un potencial cliente para ofrecerle tus servicios, aún no sabes lo que su compañía hace.\n`;

        preguntasParametro.forEach((pregunta, index) => {
            prompt += `
Entonces le preguntas: ${pregunta}.
Y te responde: ${respuestasParametro[index]}.`;

        });

        prompt += `
Con base en esta conversación que acabas de tener, generas una campaña publicitaria en la Radio para esta compañía. 
La respuesta debe ser con el formato siguiente:
Nombre de la campaña: [Nombre de la campaña (Texto), ejemplo: Siente VerdeVida: Tu Elección Sostenible]
Metas de la campaña: [Metas de la campaña (Texto), ejemplo: Atraer Nuevos Clientes: Incrementar el tráfico en nuestra tienda en línea y las ventas en un 25% durante y después de la duración de la campaña. Esto se puede medir a través del análisis de las métricas de la web y los datos de ventas.]
Estaciones: [Estaciones, separadas por comas sin espacios en minúsculas, (las opciones son maxima, activa, laraza y love) debes elegir al menos una. Ejemplo: maxima, activa]
Presupuesto: [Presupuesto en pesos mexicanos (Número del 0 al 100000), ejemplo: 60000]
Detalles de Producción del Spot de Radio: [Detalles de Producción del Spot de Radio (Texto), ejemplo: Spot \"El Amanecer Verde\": Este anuncio comienza con el sonido de un despertador y el bullicio matutino de una casa. Luego, una voz en off explica cómo cada decisión que tomamos, incluso desde el momento en que nos levantamos, puede ayudar al medio ambiente. Se mencionan los productos de limpieza y cuidado personal de VerdeVida, destacando su sostenibilidad y los beneficios para la salud. El anuncio termina con el sonido de pájaros cantando y la frase: \"VerdeVida: Comienza tu día de la forma más verde\".]
Especificaciones de la pauta: [Especificaciones de la pauta (Texto), ejemplo: Propuesta "Vida Verde en cada Hogar":
Esta campaña se centraría en los productos de limpieza para el hogar de VerdeVida, destacando su eficacia y su respeto por el medio ambiente. Los anuncios se emitirían durante las horas punta (mañana y tarde) en todas las estaciones de radio seleccionadas para llegar a un público amplio, con un enfoque especial en las familias jóvenes. Los anuncios de 30 segundos se complementarían con segmentos patrocinados en programas relevantes donde se podrían discutir en profundidad los beneficios de los productos de limpieza ecológicos.]
`;

        return prompt;
    };

    const handleGenerarCampaña = async (preguntasParametro, respuestasParametro) => {
        console.log('handleGenerarCampaña');
        setGenerandoCampaña(true);
        try {
            setLoading(true);
            const response = await handleCallOpenAIAPI(handleGenerarCampañaPrompt(preguntasParametro, respuestasParametro));
            const secciones = response.split('\n');

            let nombreCampana = '';
            let metasCampana = '';
            let budget = '';
            let estaciones = '';
            let spotProduction = '';
            let pautaSpecs = '';

            for(let i = 0; i < secciones.length; i++) {
                const seccion = secciones[i];

                if(seccion.startsWith('Nombre de la campaña: ')) {
                    nombreCampana = seccion.substring('Nombre de la campaña: '.length);
                }  
                if(seccion.startsWith('Metas de la campaña: ')) {
                    metasCampana = seccion.substring('Metas de la campaña: '.length);
                }
                if(seccion.startsWith('Estaciones: ')) {
                    estaciones = seccion.substring('Estaciones: '.length);
                }
                if(seccion.startsWith('Presupuesto: ')) {
                    budget = seccion.substring('Presupuesto: '.length);
                }
                if(seccion.startsWith('Detalles de Producción del Spot de Radio: ')) {
                    spotProduction = seccion.substring('Detalles de Producción del Spot de Radio: '.length);
                }
                if(seccion.startsWith('Especificaciones de la pauta: ')) {
                    pautaSpecs = seccion.substring('Especificaciones de la pauta: '.length);
                }
            }

            estaciones = estaciones.toLowerCase();

            const stations = {
                maxima: estaciones.includes('maxima'),
                activa: estaciones.includes('activa'),
                laraza: estaciones.includes('laraza'),
                love: estaciones.includes('love')
            };

            const result = await addDoc(collection(db, 'campaigns'), {
                nombre: nombreCampana,
                metas: metasCampana,
                creadaPor: auth.currentUser.uid,
                medio: 'Radio',
                servicio: 'Radio SA',
                estaciones: stations,
                presupuesto: budget,
                produccion: 'Sí',
                produccionDetalles: spotProduction,
                pauta: pautaSpecs,
                adjuntos: [],
                status: 'Generada por IA',
                preguntas,
                respuestas
             });

             const campaign = {
                nombre: nombreCampana,
                metas: metasCampana,
                creadaPor: auth.currentUser.uid,
                medio: 'Radio',
                servicio: 'Radio SA',
                estaciones: stations,
                presupuesto: budget,
                produccion: 'Sí',
                produccionDetalles: spotProduction,
                pauta: pautaSpecs,
                adjuntos: [],
                status: 'Generada por IA',
                id: result.id,
                preguntas,
                respuestas
                };

             setGenerandoCampaña(false);
             setLoading(false);
             navigate('/detalle-campana', { state: { campaign } });
        } catch (error) {
            console.error('Error generating question', error); 
            setGenerandoCampaña(false);
            // Aquí puedes manejar el error, por ejemplo mostrando un mensaje al usuario
        }
    }

    useEffect(() => {
        if (preguntas.length === 0) {
            generarPregunta([]);
        } else if (preguntas.length === numPreguntas) {
            handleGenerarCampaña(preguntas, respuestas);
        }
    }, []);

    const [dots, setDots] = useState(0);

    useEffect(() => {
      if (loading) {
        const interval = setInterval(() => {
          setDots((dots) => (dots + 1) % 4);
        }, 500);
  
        return () => clearInterval(interval);
      }
    }, [loading]);


  return (
    <div className='text-center flex flex-col items-center w-11/12 max-w-xl'>
        <h1 className="text-gray-900 text-2xl mb-8 text-center w-11/12 max-w-xl"> 
            {pregunta}
        </h1>

        {error && <>
            <p className='text-red-500'>{error}</p>
            <button
                onClick={() => {
                    setError(null);
                    generarPregunta(respuestas);
                }}
                className='text-blue-500 mb-2'
            >
                Volver a intentar
            </button>
        </>}
        {loading && <img src={require('../assets/optimized.gif')} alt="Loading" className="w-20 h-24 select-none object-cover" />}
        {!loading && respuestas.length < numPreguntas && <TextAreaComponent
            value={respuesta}
            setValue={setRespuesta}
            placeholder='Ingresa tu respuesta aquí...'
        />}

        <button 
            onClick={() => {if (respuesta !== '') { handleRespuesta() } else toast.error('Por favor, ingresa una respuesta')}}
            className={`p-2 text-white border-none rounded-md cursor-pointer text-xl font-semibold w-11/12 max-w-xl mt-3 h-12 box-border ${loading ? 'bg-blue-300 hover:bg-blue-300 shadow-md hover:shadow-md' : 'bg-blue-500 hover:bg-blue-300 shadow-md hover:shadow-xl'}`}
        >
            {loading ? (
                <div role="status">
                    <span>{`${generandoCampaña ? "Generando" : "Pensando"}${'.'.repeat(dots)}`}</span>
                </div>
            ) : 'Responder'}
        </button>

        <div className="w-11/12 max-w-xl mt-3 h-1 rounded-full bg-gray-300 overflow-hidden">
            <div
                className="h-full bg-blue-500"
                style={{ width: `${(respuestas.length / numPreguntas) * 100}%` }}
            />
        </div>

    </div>
  )
}
