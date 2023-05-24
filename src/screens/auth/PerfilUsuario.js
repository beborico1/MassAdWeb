import React, { useEffect } from 'react'
import { auth } from '../../helpers/firebase'
import { useNavigate } from 'react-router-dom'
import { FaRegListAlt, FaSignOutAlt } from 'react-icons/fa'

const PerfilUsuario = () => {

  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    auth.signOut()
    .then(() => {
      console.log('Sesión cerrada')
      //history.push('/'); // Redirige a la página de inicio después de cerrar la sesión
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const getUsuario = () => {
    const user = auth.currentUser;
    if (user) {
    } else {
      console.log('Usuario no logueado');
    }
  }

  useEffect(() => {
    getUsuario();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200 box-border overflow-hidden">
      <h1 className="text-gray-900 text-4xl mb-4 select-none  text-center">Perfil Usuario</h1>

      <button className="cursor-pointer bg-adstream-500 hover:bg-adstream-300 text-white py-4 px-8 text-center text-base font-semibold rounded-md transition duration-400 absolute top-2 right-2 flex justify-center items-center" onClick={() => navigate('/inicio')}>
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
