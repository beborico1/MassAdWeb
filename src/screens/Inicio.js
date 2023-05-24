import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth } from '../helpers/firebase';
import { useNavigate } from 'react-router-dom';
//import '../helpers/estilos/Inicio.css'
import { FaUser } from 'react-icons/fa';

const Inicio = ({history}) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getCampaigns = () => {
    setLoading(true);
    
    const db = getFirestore();
    const q = query(collection(db, "campaigns"), where("creadaPor", "==", auth.currentUser.uid));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let campaignData = [];
      querySnapshot.forEach((doc) => {
        campaignData.push({ id: doc.id, ...doc.data() });
      });
      setCampaigns(campaignData);
      setLoading(false);
    });
  
    return unsubscribe;
  }

  useEffect(() => {
    const unsubscribe = getCampaigns();
    return () => unsubscribe();
  }, []);

  const handleDetail = (campaign) => {
    navigate('/detalle-campana', { state: { campaign } });
  };

  const handleCreateCampaign = () => {
    //history.push('/crear-campana');
    navigate('/crear-campana');
  };

  return (
    <div className="flex w-full h-screen justify-center items-center p-8 bg-gray-200 overflow-y-hidden">
      <div className="flex flex-col items-center w-full max-w-3xl">

          <button className="cursor-pointer bg-adstream-500 hover:bg-adstream-300 text-white py-4 px-8 text-center text-base font-semibold rounded-md transition duration-400 absolute top-2 right-2 flex justify-center items-center" onClick={() => navigate('/perfil-usuario')}>
            <FaUser size={20} className='mr-3'/> Ver Perfil
          </button>

        <h1 className="text-gray-900 text-4xl mb-4 select-none text-center">Campañas:</h1>

        {loading ? 
          <p className="text-gray-700 text-lg my-8">Cargando Campañas...</p> 
            :
         campaigns.length !== 0 ?
          <ul className="list-none p-0 w-full max-w-3xl max-h-96 overflow-y-scroll">
            {campaigns.map((campaign) => (
              <li key={campaign.id} className="flex justify-between items-center border border-gray-300 p-4 mb-4 rounded-md bg-white">
                <p className="text-gray-700 text-lg">{campaign.nombre}</p>
                <button className=" bg-adstream-500 hover:bg-adstream-300 text-white py-4 px-8 text-center text-base font-semibold rounded-md cursor-pointer transition duration-400" onClick={() => handleDetail(campaign)}>
                  Detalle Campaña
                </button>
              </li>
            ))}
          </ul>
           :
          <p className="text-gray-700 text-lg my-8">No hay campañas</p>
        }

        <button className="bg-adstream-500 hover:bg-adstream-300 text-white py-4 px-8 text-center rounded-md cursor-pointer transition duration-400 text-xl font-semibold shadow-md mb-2 mt-2" onClick={handleCreateCampaign}>+ Crear Campaña</button>
      </div>
    </div>
  );
};

export default Inicio;
