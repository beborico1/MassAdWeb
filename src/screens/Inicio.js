import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth } from '../helpers/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Inicio = ({history}) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirigir a la página de inicio de sesión u otra página
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

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
    //history.push('/detalle-campana', { campaign });
  };

  const handleCreateCampaign = () => {
    //history.push('/crear-campana');
  };

  return (
    <div className="container">
      <h1 className="titleText">Campañas:</h1>

      {loading ? 
        <p className="loadingText">Cargando Campañas...</p> 
          :
       campaigns.length !== 0 ?
        <ul className="campaignList">
          {campaigns.map((campaign) => (
            <li key={campaign.id} className="listItem">
              <p className="listItemText">{campaign.nombre}</p>
              <button className="detailButton" onClick={() => handleDetail(campaign)}>
                Detalle Campaña
              </button>
            </li>
          ))}
        </ul>
         :
        <p className="emptyText">No hay campañas</p>
      }
      
      <button className="createButton" onClick={handleCreateCampaign}>+ Crear Campaña</button>

      <button onClick={() => navigate('/perfil-usuario')}>
        Ver Perfil
      </button>

    </div>
  );
};

export default Inicio;
