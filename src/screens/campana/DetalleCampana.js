import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AdjuntoItem from '../../components/AdjuntoItem';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../../helpers/firebase';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import Modal from '../../components/Modal';
import { FaArrowLeft, FaPencilAlt, FaPlayCircle } from 'react-icons/fa';
import Card from '../../components/Card';
import Title from '../../components/TitleComponent';

export default function DetalleCampana() {
  const location = useLocation();
  const campaign = location.state.campaign;

  const navigate = useNavigate();

  const [adjuntos, setAdjuntos] = useState([]);
  const [borrando, setBorrando] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAdjunto, setSelectedAdjunto] = useState(null);

  useEffect(() => {
    setAdjuntos(campaign?.adjuntos || []);
  }, [campaign]);

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

  // rest of your code

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

      <div className="p-8 bg-gray-200 overflow-y-scroll overflow-x-hidden">

        <Title title={campaign.nombre} />
        <Card titulo= 'Metas:' descripcion={campaign.metas} />
        <Card titulo='Medio:' descripcion={campaign.medio} />
        <Card titulo='Servicio:' descripcion={campaign.servicio} />
        <Card titulo='Status:' descripcion={campaign.status} />
        <Card titulo='Pauta:' descripcion={campaign.pauta} />
        <Card titulo = 'Presupuesto' descripcion={campaign.presupuesto} />
        <Card titulo = 'Producción' descripcion={campaign.produccion} />
        <Card titulo = 'Detalles de la Producción' descripcion={campaign.produccionDetalles} />
        <Card titulo='Creada Por:' descripcion={campaign.creadaPor} />

        <div className="p-2 border border-gray-300 rounded-lg mb-6 shadow-md bg-white pb-5 pt-5 text-gray-800">
          <h1 className='text-2xl mb-2 ml-5 mr-5 text-adstream-500 select-none'>Estaciones:</h1>
          {Object.keys(campaign.estaciones).map((estacion, index) => (
            <p className="text-base text-gray-700 ml-5" key={index}>{estacion}: {campaign.estaciones[estacion] ? 'Si' : 'No'}</p>
          ))}
        </div>

        <div className="p-2 border border-gray-300 rounded-lg shadow-md bg-white pb-5 pt-5">
          <h1 className='text-2xl mb-2 ml-5 mr-5 text-adstream-500 select-none'>Adjuntos:</h1>
          
          {borrando && <p className="text-base text-gray-700 ml-5">Borrando...</p>}
          
          {adjuntos.length === 0 ? <div className="text-center p-20 text-base text-gray-500">No hay adjuntos</div> :
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

