import React, { useEffect } from 'react'
import { auth } from '../../helpers/firebase'
import { useNavigate } from 'react-router-dom'

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

      <button
        className="logoutButton"
        onClick={handleCerrarSesion}
      >
        Cerrar Sesión
      </button>

      <button onClick={() => navigate('/inicio')}>
        Ver Campañas
      </button>
    </div>
  )
}

export default PerfilUsuario
