import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCommentDots } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

// Hola yo soy Streamy, tu asistente virtual, y estoy aquí para ayudarte a generar ideas para tu campaña publicitaria en la radio.

export default function ChatbotAclaraciones({ sobreLaEmpresa, preguntas, respuestas, setDesarollo, loading, setLoading}) {
    const [aclaracion, setAclaracion] = useState('');
    const [respuesta, setRespuesta] = useState('');
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [currentMessages, setCurrentMessages] = useState(['']);
    const textAreaRef = useRef(null);

    const handleCallOpenAIAPI = async (promptParameter) => {
        setLoading(true);
        setCurrentMessageIndex(0);
            
        try {
            const result = await axios.post('https://api.openai.com/v1/chat/completions', { // Llama a la API de OpenAI
                model: "gpt-4", // Define el modelo
                messages: [ // Define los mensajes
                    {"role": "user", "content": promptParameter},
                ] // Cierra los mensajes
            }, { // Cierra el primer parámetro
                headers: { // Define los headers
                    'Content-Type': 'application/json', // Define el tipo de contenido
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Define la autorización
                } // Cierra los headers
            }); // Cierra la llamada a la API de OpenAI
            const content = result.data.choices[0].message.content; // Define el contenido
            setRespuesta(content);
            setCurrentMessages(
                content.split('.').map((sentence, index, arr) =>
                    sentence = index < arr.length - 1 ? sentence.trim() + '.' : sentence.trim()
                ), () => {
                    // Move text cutting and adjusting inside setState callback
                    setCurrentMessages((currentMessages) => currentMessages.slice(0, -1));
                    setLoading(false);
                }
            );

            // quitamos el ultimo elemento del array
            setCurrentMessages((currentMessages) => currentMessages.slice(0, -1));
            setLoading(false); // Cambia el estado de loading a false
        } catch (error) { // Si hay un error
            setLoading(false); // Cambia el estado de loading a false
            console.log('Error al llamar a la API de OpenAI'); // Muestra un mensaje de error
            console.log(error); // Muestra el error
        } // Cierra el catch
    }

    const handleAclarar = async () => {
        if (!aclaracion) { // Si sobreLaEmpresa no tiene valor
            return toast.err('La aclaración es obligatoria'); // Muestra un mensaje de alerta
        } // Cierra el if
        setLoading(true); // Cambia el estado de loading a true
        try { // Intenta hacer lo siguiente
            await handleCallOpenAIAPI(`Cambia esta idea de empresa: ${respuesta}, con la aclaración o corrección que se hizo: ${aclaracion}, vuelve a redactar el texto.`);
            setAclaracion('');
            setLoading(false); // Cambia el estado de loading a false
        } catch (error) { // Si hay un error
            setLoading(false); // Cambia el estado de loading a false
            console.log('Error al llamar a la API de OpenAI'); // Muestra un mensaje de error
            console.log(error); // Muestra el error
        } // Cierra el catch
    }

    useEffect(() => {
        // llamamos a handleCallOpenAIAPI
        // con un prompt parameter
        // que desarrolle la idea de la empresa usando sobreLaEmpresa, preguntas y respuestas
        
        // primero que nada creamos un string que vaya alternando entre una pregunta y una respuesta
        const promptParameter = preguntas.map((pregunta, index) => {
            return `${index+1}. ${pregunta} ${respuestas[index]}`;
        }).join('\n');

        handleCallOpenAIAPI(`Nos dieron esta informacion sobre una empresa y su idea de negocio: ${sobreLaEmpresa}. \nPara complementar la informacion hicimos las preguntas: ${promptParameter}. En base a esta informacion, desarrolla la idea, no puedes terminar diciendo en resumen, o en conclusion o algo similar. No debes sugerir ninguna estrategia publicitaria mas que una campaña en la radio, debes hablar siempre de la empresa y la idea en tercera persona, sin hacerlo sonar como un comercial, comienza con: Entendí que su empresa...`);
    }, [sobreLaEmpresa, preguntas, respuestas]);

    useEffect(() => {
        // Check if textarea ref is defined
        if (textAreaRef.current) {
            // Reset the height of the textarea
            textAreaRef.current.style.height = 'auto';
            // Then immediately set the height to the scroll height
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [currentMessages, currentMessageIndex]);  // Add dependencies here
    
    if (!sobreLaEmpresa) return null;

    if (loading) return <img src={require('../assets/optimized.gif')} alt="Loading" className="w-18 h-24 select-none object-cover" />
    
    return <div className='flex flex-row items-start w-11/12 max-w-xl bg-white rounded-md shadow-md p-4 overflow-y-scroll'>
        <img src={require('../assets/robot_head.png')}alt="AI Robot" className="w-24 h-24 select-none object-cover" />
        <div className="flex flex-col items-center w-full">
            <p className="text-xl font-semibold text-blue-900 mb-2 w-11/12 max-w-xl ">Entendí lo siguiente:</p>

            {!loading && currentMessages.map((message, index) => (
                currentMessageIndex === index && (
                    <textarea
                        key={index}
                        ref={textAreaRef}
                        className={`my-2 bg-transparent w-11/12 max-w-xl overflow-y-hidden border-none resize-none text-blue-900`}
                        value={message}
                    />
                )
            ))}

            {/* Flechas para cambiar de mensaje */}
            { currentMessages.length > 1 && !loading && 
                <div className='flex flex-row justify-end items-center w-full max-w-xl'>
                    <button
                        disabled={currentMessageIndex === 0}
                        onClick={() => setCurrentMessageIndex(currentMessageIndex - 1)}
                        className={`text-blue-500 hover:text-blue-300 font-medium ${currentMessageIndex === 0 && 'cursor-not-allowed text-gray-400 hover:text-gray-400'}`}
                    >
                        <FaArrowLeft className='inline-block mr-2' size={16} />
                    </button>
                    <p className='font-medium mx-2 select-none text-blue-900'>
                        {currentMessageIndex+1}
                    </p>
                    <button
                        disabled={currentMessageIndex === currentMessages.length - 1}
                        onClick={() => setCurrentMessageIndex(currentMessageIndex + 1)}
                        className={`text-blue-500 hover:text-blue-300 font-medium ${currentMessageIndex === currentMessages.length - 1 && 'cursor-not-allowed text-gray-400 hover:text-gray-400'}`}
                    >
                        <FaArrowRight className='inline-block ml-2' size={16} />
                    </button>
                </div>
            }


            <textarea
                className="my-2 bg-transparent w-11/12 max-w-xl overflow-y-hidden border-none resize-none text-blue-900 border-blue-900 h-9 p-1"
                style={{ borderTop: "1px solid blue", borderBottom: "1px solid blue" }}  // add this line
                value={aclaracion}
                onChange={(e) => setAclaracion(e.target.value)}
                placeholder="Hacer aclaración a Streamy..."
            />

            <button
                onClick={() => handleAclarar()}
                className=" hover:bg-gray-200 text-blue-500 py-2 px-8 text-center text-base font-semibold rounded-md transition duration-400 mt-4 flex flex-row items-center"
            >
                <FaCommentDots className='inline-block mr-2' size={16} />
                Aclarar
            </button>
        </div>
    </div>
}