import React, { useEffect, useState } from 'react'; // Importa el hook useState
import { FaArrowLeft, FaArrowRight, FaQuestion } from 'react-icons/fa'; // Importa los iconos de flecha y pregunta
import Title from '../../components/TitleComponent'; // Importa el componente de título
import TextAreaComponent from '../../components/TextAreaComponent'; // Importa el componente de área de texto
import axios from 'axios'; // Importa axios para hacer llamadas a la API de OpenAI
import ChatbotAclaraciones from '../../components/ChatbotAclaraciones';
import Preguntas from '../../components/Preguntas';

export default function CrearCampana() { // Exporta la función CrearCampana
  const [loading, setLoading] = useState(false); // Define el estado de loading
  const [sobreLaEmpresa, setSobreLaEmpresa] = useState(''); // Define el estado de sobreLaEmpresa
  const [etapa, setEtapa] = useState(1); // Define el estado de etapa

  const [preguntas, setPreguntas] = useState([]); // Define el estado de preguntas
  const [respuestas, setRespuestas] = useState([]); // Define el estado de respuestas
  const [desarrollo, setDesarrollo] = useState(''); // Define el estado de desarrollo de la idea para la campaña publicitaria despues de que el usuario haga las aclaraciones

  const [dots, setDots] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((dots) => (dots + 1) % 4);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [loading]);

  const generarPreguntas = async () => { // Define la función generarPreguntas
    if (!sobreLaEmpresa) { // Si sobreLaEmpresa no tiene valor
      return alert('La información sobre la empresa es obligatoria'); // Muestra un mensaje de alerta
    } // Cierra el if
    setLoading(true); // Cambia el estado de loading a true
    try { // Intenta hacer lo siguiente
      const result = await axios.post('https://api.openai.com/v1/chat/completions', { // Llama a la API de OpenAI
          model: "gpt-3.5-turbo", // Define el modelo
          messages: [ // Define los mensajes
              {"role": "user", "content": `En base a esta idea de empresa: \"${sobreLaEmpresa}\", genera 5 preguntas que se podrian hacer a la empresa para entender mejor la idea, el modelo de negocios, y tener mas contexto que nos haga falta y que nos podria ayudar para generarles una campaña publicitaria en la radio.`}, // Define el mensaje del usuario
          ] // Cierra los mensajes
      }, { // Cierra el primer parámetro
          headers: { // Define los headers
              'Content-Type': 'application/json', // Define el tipo de contenido
              'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Define la autorización
          } // Cierra los headers
      }); // Cierra la llamada a la API de OpenAI
      const content = result.data.choices[0].message.content; // Define el contenido
      setLoading(false); // Cambia el estado de loading a false
      
      const newPreguntas = content.match(/(¿[^?]*\?)/g); // Extract the questions from the content
      console.log(newPreguntas);  // This will be an array of questions

      setPreguntas(newPreguntas); // set preguntas to the array of questions
      setRespuestas(newPreguntas.map(() => '')); // set respuestas to an array of empty strings with the same length as preguntas
      setEtapa(etapa + 1); // set etapa to etapa + 1
    } catch (error) { // Si hay un error
      setLoading(false); // Cambia el estado de loading a false
      console.log('Error al llamar a la API de OpenAI'); // Muestra un mensaje de error
      console.log(error); // Muestra el error
    } // Cierra el catch
  } // Cierra la función generarPreguntas

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center p-8 bg-gray-200 overflow-y-hidden">   
        <div className="flex flex-col items-center w-full max-w-3xl">
          {/* BOTON PARA REGRESAR: */}
          <button onClick={() => window.history.back()} className='cursor-pointer bg-adstream-500 hover:bg-adstream-300 text-white py-2 px-8 text-center text-base font-semibold rounded-md transition duration-400 absolute top-2 left-2 justify-center items-center flex flex-row'>
            <FaArrowLeft size={20} style={{marginRight: '10px'}}/> Inicio
          </button>  

          <Preguntas />

        </div>
      </div>
    </>
  )
}
