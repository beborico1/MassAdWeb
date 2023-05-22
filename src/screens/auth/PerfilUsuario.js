import React, { useEffect } from 'react'
import { auth } from '../../helpers/firebase'
import { useNavigate } from 'react-router-dom'
import '../../helpers/estilos/PerfilUsuario.css'
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
    <div className="container">
      <h1 className="titleText">Perfil Usuario</h1>

      <button className="campaignButton" onClick={() => navigate('/inicio')}>
        <FaRegListAlt size={20} style={{ marginRight: '10px' }} />
        Ver Campañas
      </button>
  
      <button className="logoutButton" onClick={handleCerrarSesion}>
        Cerrar Sesión
        <FaSignOutAlt size={20} style={{ marginLeft: '10px' }} />
      </button>

    </div>  
  )
}

export default PerfilUsuario
