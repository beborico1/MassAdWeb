import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AdjuntoItem from '../../components/AdjuntoItem';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../../helpers/firebase';
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import Modal from '../../components/Modal';
import { FaArrowLeft, FaCheckCircle, FaPencilAlt, FaPlayCircle } from 'react-icons/fa';
import Card from '../../components/Card';
import Title from '../../components/TitleComponent';
import NoAdjuntos from '../../components/NoAdjuntos';

export default function DetalleCampana() {
  const location = useLocation();
  const campaign = location.state.campaign;

  const navigate = useNavigate();

  const [adjuntos, setAdjuntos] = useState([]);
  const [estaciones, setEstaciones] = useState([]);
  const [borrando, setBorrando] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAdjunto, setSelectedAdjunto] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    setAdjuntos(campaign?.adjuntos || []);

    // for key in campaign.estaciones if true we add it to the array of estaciones
    const newEstaciones = [];

    for (const key in campaign.estaciones) {
      if (campaign.estaciones[key]) {
        newEstaciones.push(key);
      }
    }
    setEstaciones(newEstaciones);


    if (!usuario && campaign.creadaPor) {
      console.log('getting user');
      try {
        const userId = campaign.creadaPor;

        const docRef = doc(db, 'users', userId);
        getDoc(docRef).then((doc) => {
          if (doc.exists()) {
            setUsuario(doc.data());
          } else {
            console.log('No such document!');
          }
        }).catch((error) => {
          console.log('Error getting document:', error);
        });
      } catch (error) {
        console.log('Error getting document:', error);
      }
    }

    if (!campaign || !campaign.id || !adjuntos || adjuntos.length === 0 || !campaign.adjuntos) {
      return;
    }

    // we only update the doc if the adjuntos array has more items than the one in the doc
    if (adjuntos.length > (campaign.adjuntos ? campaign.adjuntos.length : 0)) {
      // we update the doc with new adjuntos
      const campanaRef = doc(db, 'campaigns', campaign.id);
      updateDoc(campanaRef, {
        adjuntos
      });

      campaign.adjuntos = adjuntos;

      console.log('Adjuntos actualizados correctamente');
    }

  }, []);

  const handleDeleteAdjunto = async (adjunto) => {
    if (borrando) {
      return;
    }
    
    setSelectedAdjunto(adjunto);
    setShowModal(true);
  }

  const confirmDeleteAdjunto = async () => {
    
    // continue your delete process here
    setBorrando(true);
    // Primero, elimina el archivo de Google Storage
    const storageRef = ref(storage, selectedAdjunto.path);
    
    try {
      await deleteObject(storageRef);
      console.log('Documento eliminado correctamente');
    } catch (error) {
      console.log('Error al eliminar el documento: ', error);
    }

    // Luego, actualiza el documento en Firestore
    const campanaRef = doc(db, 'campaigns', campaign.id);
    try {
      await updateDoc(campanaRef, {
        adjuntos: arrayRemove(selectedAdjunto)
      });
      console.log('Documento actualizado correctamente');
    } catch (error) {
      setBorrando(false);
      console.log('Error al actualizar el documento: ', error);
    }

    campaign.adjuntos = campaign.adjuntos.filter(item => item !== selectedAdjunto);
    setAdjuntos(adjuntos.filter(item => item !== selectedAdjunto));
    setBorrando(false);
    setShowModal(false);
  }

  const handlePagar = async () => {
    const response = await fetch('https://adstreamserver-d962608709d6.herokuapp.com/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: campaign.presupuesto, name: campaign.nombre, campaignId: campaign.id }),
    });
  
    if (response.ok) {
      console.log("response", response);
      const { url } = await response.json();
      console.log("url", url);
      window.location = url;
    } else {
      const { message } = await response.json();
      console.error(message);
    }
  }; 

  return (
    <div className="overflow-x-hidden">
      <div className="header flex justify-between bg-gray-200">
        <div className="left flex">
          <button onClick={() => navigate('/inicio')} className='px-2 py-2 m-2 text-base rounded-md bg-adstream-500 border-none text-white cursor-pointer transition duration-300 flex justify-center items-center hover:bg-adstream-300'>
            <FaArrowLeft size={20} className='mr-0 md:mr-2'/>
            <span className="hidden md:inline">Inicio</span>
          </button>
        </div>
        <div className="right flex">
          <button onClick={() => navigate('/editar-campana', { state: { campaign } })} className='px-10 py-2 m-2 text-base rounded-md bg-adstream-500 border-none text-white cursor-pointer transition duration-300 flex justify-center items-center hover:bg-adstream-300'>
            <FaPencilAlt size={20} className='mr-0 md:mr-2'/>
            <span className="hidden md:inline">Editar</span>
          
          </button>
          <button onClick={() => navigate('/produccion-spot')} className='px-10 py-2 m-2 text-base rounded-md bg-adstream-500 border-none text-white cursor-pointer transition duration-300 flex justify-center items-center hover:bg-adstream-300'>
            <FaPlayCircle size={20} className='mr-0 md:mr-2'/>
            <span className="hidden md:inline">Produccion Spot</span>
          </button>
        </div>
      </div>

      <div className="p-8 bg-gray-200 overflow-y-scroll overflow-x-hidden items-center flex flex-col w-full">

        <Title title={campaign.nombre} />
        <Card titulo= 'Metas:' descripcion={campaign.metas} />
        <Card titulo='Medio:' descripcion={campaign.medio} />
        <Card titulo='Servicio:' descripcion={campaign.servicio} />
        <Card titulo='Status:' descripcion={campaign.status} />
        <Card titulo='Pauta:' descripcion={campaign.pauta} />

        <div className="p-2 border border-gray-300 rounded-lg mb-6 shadow-md bg-white pb-5 pt-5 text-gray-800 w-full">
          <h1 className='text-2xl mb-2 ml-5 mr-5 text-adstream-500 select-none'>Presupuesto</h1>
          <div className="flex flex-row items-center justify-between">
            <p className="text-base text-gray-700 ml-5 break-words">
              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(campaign.presupuesto)} MXN
            </p>

            { campaign.pagada ?
                <div
                  className='flex flex-row items-center'
                >
                  <p className="text-base text-gray-500 ml-5 break-words select-none">Pagada</p>
                  <FaCheckCircle size={16} className='text-green-500 mr-4 ml-2' />
                </div>
                :
               <button
                onClick={handlePagar}
                className='text-adstream-500 hover:text-adstream-300 mr-4'
              >
                Pagar
              </button>
            }
          </div>
        </div>

        <Card titulo = 'Producción' descripcion={campaign.produccion} />
        <Card titulo = 'Detalles de la Producción' descripcion={campaign.produccionDetalles} />
        <Card titulo='Creada Por:' descripcion={usuario && usuario.nombreCompleto ? usuario.nombreCompleto : campaign.creadaPor} />

        <div className="p-2 border border-gray-300 rounded-lg mb-6 shadow-md bg-white pb-5 pt-5 text-gray-800 w-full">
          <h1 className='text-2xl mb-2 ml-5 mr-5 text-adstream-500 select-none'>Estaciones:</h1>
          <p className="text-base text-gray-700 ml-5">
            {estaciones.map((estacion, index) => (
              <span key={index}>
                { estacion === "laraza" ? 
                "La Raza" : estacion === "activa" ?
                "Activa" : estacion === "love" ?
                "Love" : estacion === "maxima" ?
                "Maxima" : estacion }{index === estaciones.length - 1 ? '.' : index === estaciones.length - 2 ? ' y ' : ', '}</span>
            ))}
          </p>
        </div>

        <div className="p-2 border border-gray-300 rounded-lg shadow-md bg-white pb-5 pt-5 w-full flex flex-col items-center">
          <h1 className='text-2xl mb-2 ml-5 mr-5 text-adstream-500 select-none'>Adjuntos:</h1>
          
          {borrando && <p className="text-base text-gray-500 ml-5 my-3">Borrando...</p>}
          
          {adjuntos.length === 0 ? 
              <NoAdjuntos 
                adjuntos={adjuntos}
                setAdjuntos={setAdjuntos}
              /> :
            adjuntos.map((adjunto, index) => (
              <AdjuntoItem adjunto={adjunto} index={index} key={index} handleDeleteAdjunto={handleDeleteAdjunto}/>
            ))
          }
        </div>

        {showModal && 
          <Modal
            title="Confirmar Eliminación"
            onClose={() => setShowModal(false)}
            onConfirm={confirmDeleteAdjunto}
          >
            <p className="text-base text-gray-700">¿Estás seguro de que quieres eliminar este adjunto?</p>
          </Modal>
        }
      </div>
    </div>
  )
}

// 2. **Add Loading Indicator**: When the data is loading, show a loading indicator. This could be a simple spinner or a more complex skeleton screen that shows the shape of the content before it's loaded.

// 4. **Implement Error Handling UI**: Currently, if there's an error in deleting an attachment, it's only logged in the console. Show a toast message or an error message near the attachment to inform the user.

// 5. **Enhance Button Styles**: The current buttons are fairly basic. Consider adding more effects, like a subtle box-shadow for a 3D effect, or a transition effect to smoothly change color on hover.

// 6. **Organize Campaign Details**: Instead of having all the campaign details under each other, organize related details into sections. For example, 'Metas', 'Medio', and 'Servicio' can be under a section called 'Campaign Overview'. 

// 7. **Responsive Design**: Make sure the design looks good on all screen sizes. For smaller screens, consider making the content scrollable or use a collapsible layout.

// 8. **Add Empty State Illustrations**: If there are no attachments, display a friendly illustration with some helpful text, instead of just a 'No hay adjuntos' message.

// 9. **Use Tooltips**: For information that might need more context, consider using tooltips. They can provide helpful information when users hover over or focus on an item.

// 10. **Improve Readability**: Increase the line-height and limit the maximum line length (around 60-70 characters is often recommended for a single column of text). This makes it easier for users to read the content.

