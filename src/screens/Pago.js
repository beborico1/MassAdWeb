import React, { useEffect } from 'react'
import { db } from '../helpers/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Pago() {
    const [message, setMessage] = React.useState("");

    const navigate = useNavigate();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Pago exitoso!");
      // we get the parameter from the url named campana
      const campanaId = query.get("campana");
      console.log(campanaId);

      // with the document from firestore that has the id campanaId
      // we update the status to "pagada"
      const docRef = doc(db, "campaigns", campanaId);
      updateDoc(docRef, {
        status: "Pagada"
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
        status: "Pago Cancelado"
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
        <p
            className="text-2xl font-semibold text-center mb-4"
        >{message}</p>
        <button
            className="cursor-pointer bg-adstream-500 hover:bg-adstream-300 text-white py-2 px-8 text-center text-base font-semibold rounded-md transition duration-400 flex justify-center items-center"
            onClick={() => navigate('/inicio')}
        >
            Volver a Inicio
        </button>
    </div>
  )
}
