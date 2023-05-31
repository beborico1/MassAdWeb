import React, { useEffect, useState } from 'react'
import { auth } from '../../helpers/firebase'
import { useNavigate } from 'react-router-dom'
import { FaRegListAlt, FaSignOutAlt } from 'react-icons/fa'
import Title from '../../components/TitleComponent'
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../helpers/firebase';
import UserInfo from '../../components/UserInfo'

const PerfilUsuario = () => {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);

  const handleCerrarSesion = () => {
    auth.signOut()
    .then(() => {
      console.log('Sesión cerrada')
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const getUsuario = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setUsuario({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    } else {
      console.log('Usuario no logueado');
    }
  }

  useEffect(() => {
    getUsuario();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200 box-border overflow-hidden pt-2">

      <Title title="Perfil Usuario" />

      {usuario ?
        <UserInfo usuario={usuario}/>
          :
        <p className="text-gray-700 text-lg my-8 select-none">Cargando informacion de usuario...</p>
      }

      <button className="cursor-pointer bg-adstream-500 hover:bg-adstream-300 text-white py-2 px-8 text-center text-base font-semibold rounded-md transition duration-400 absolute top-2 right-2 flex justify-center items-center" onClick={() => navigate('/inicio')}>
        <FaRegListAlt size={20} style={{ marginRight: '10px' }} />
        Ver Campañas
      </button>
  
      <button className="bg-adstream-500 hover:bg-adstream-300 text-white py-4 px-8 text-center rounded-md cursor-pointer transition duration-400 text-xl font-semibold shadow-md flex flex-row items-center" onClick={handleCerrarSesion}>
        Cerrar Sesión
        <FaSignOutAlt size={20} style={{ marginLeft: '10px' }} />
      </button>

    </div>  
  )
}

export default PerfilUsuario
