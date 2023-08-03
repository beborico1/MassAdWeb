import React, { useEffect } from 'react'
import { db } from '../helpers/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function Pago() {
    const [message, setMessage] = React.useState("");

    const navigate = useNavigate();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("¡Pago exitoso!");
      // we get the parameter from the url named campana
      const campanaId = query.get("campana");
      console.log(campanaId);

      // with the document from firestore that has the id campanaId
      // we update the status to "pagada"
      const docRef = doc(db, "campaigns", campanaId);
      updateDoc(docRef, {
        pagada: true,
      });

      const campaign = getDoc(docRef);
      // we add id to the campaign object
      campaign.id = campanaId;

    }

    if (query.get("canceled")) {
        setMessage("Pago cancelado");

      // we get the parameter from the url named campana
      const campanaId = query.get("campana");
      console.log(campanaId);

      // with the document from firestore that has the id campanaId
      // we update the status to "pagada"
      const docRef = doc(db, "campaigns", campanaId);
      updateDoc(docRef, {
        pagada: false,
      });

      const campaign = getDoc(docRef);
      // we add id to the campaign object
      campaign.id = campanaId;
    }
  }, []);

  return (
    <div
        className="flex flex-col items-center justify-center h-screen"
    >
        <div
            className="flex flex-row items-center justify-center"
        >
            <p className="text-2xl font-semibold text-center">
                {message}
            </p>

            {message === "¡Pago exitoso!" ? (
                <FaCheckCircle size={22} className="text-green-500 ml-4" />
            ) : ( message === "Pago cancelado" &&
                <FaTimesCircle size={22} className="text-red-500 ml-4" /> 
            )
            }
        </div>


        <button
            className="cursor-pointer bg-massad-500 hover:bg-massad-300 text-white py-2 px-8 text-center text-base font-semibold rounded-md transition duration-400 flex justify-center items-center mt-8"
            onClick={() => navigate('/inicio')}
        >
            Volver a Inicio
        </button>
    </div>
  )
}
