import React, { useEffect, useState } from 'react'
import { auth } from '../../helpers/firebase'
import { useNavigate } from 'react-router-dom'
import { FaRegKeyboard, FaRegListAlt, FaSignOutAlt, FaTools, FaUserCog } from 'react-icons/fa'
import Title from '../../components/TitleComponent'
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../helpers/firebase';
import UserInfo from '../../components/UserInfo'
import ChatWidget from '../../components/ChatWidget'

const PerfilUsuario = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleCerrarSesion = () => {
    auth.signOut()
      .then(() => {
        console.log('Sesión cerrada')
      })
      .catch((error) => {
        console.log(`Error al cerrar sesión: ${error.message}`)
      })
  }

  const getUsuario = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsuario({ id: docSnap.id, ...docSnap.data() });
          if (docSnap.data().admin) {
            setIsAdmin(true);
          }
        } else {
          console.log("No such document!");
        }
      } else {
        console.log('Usuario no logueado');
      }
    } catch (error) {
      console.log(`Error al obtener datos del usuario: ${error.message}`)
    }
  }

  useEffect(() => {
    getUsuario();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200 box-border overflow-hidden pt-2">

      <Title title="Perfil Usuario" />

      {usuario ?
        <UserInfo usuario={usuario} />
        :
        <p className="text-gray-700 text-lg my-8 select-none">Cargando informacion de usuario...</p>
      }

      <button className="cursor-pointer bg-massad-500 hover:bg-massad-300 text-white py-2 px-8 text-center text-base font-semibold rounded-md transition duration-400 absolute top-2 right-2 flex justify-center items-center" onClick={() => navigate('/inicio')}>
        <FaRegListAlt size={20} style={{ marginRight: '10px' }} />
        Ver Campañas
      </button>

      {isAdmin &&
        <button className="cursor-pointer bg-massad-500 hover:bg-massad-300 text-white py-2 px-8 text-center text-base font-semibold rounded-md transition duration-400 absolute top-2 left-2 flex justify-center items-center" onClick={() => navigate('/admin')}>
          <FaTools size={20} style={{ marginRight: '10px' }} />
          Ver Admin
        </button>
      }

      <button className="bg-massad-500 hover:bg-massad-300 text-white py-4 px-8 text-center rounded-md cursor-pointer transition duration-400 text-xl font-semibold shadow-md flex flex-row items-center" onClick={handleCerrarSesion}>
        Cerrar Sesión
        <FaSignOutAlt size={20} style={{ marginLeft: '10px' }} />
      </button>

      <ChatWidget />

    </div>
  )
}

export default PerfilUsuario
