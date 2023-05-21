import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../helpers/firebase'
import '../../helpers/estilos/InicioSesion.css'
import { useNavigate } from 'react-router-dom'
import UserCompleteContext from '../../helpers/UserCompleteContext'

const InicioSesion = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { setUserComplete } = useContext(UserCompleteContext);

  const navigate = useNavigate(); // Obtener la función navigate de React Router

  const handleInicioSesion = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUserComplete(true);
        console.log(user)
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        let errorMessage = '';
    
        switch (errorCode) {
          case 'auth/invalid-email':
            errorMessage = 'El formato del correo electrónico es incorrecto';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Este usuario ha sido deshabilitado';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No existe un usuario con este correo electrónico';
            break;
          case 'auth/wrong-password':
            errorMessage = 'La contraseña es incorrecta';
            break;
          default:
            errorMessage = 'Ocurrió un error desconocido';
        }
    
        setError(errorMessage);
      });
  }

  const handleRegister = () => {
    // navigate to register page
    navigate('/registro');
  }

  return (
    <div className="center">
      <img src={require('../../assets/logo.png')} alt="Logo" className="logo" />

      <h1 className="titleText"> Inicio de Sesión </h1>
      
      <input
        className="input"
        placeholder='Correo electrónico'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />

      <input
        className="input"
        placeholder='Contraseña'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
          <p className="errorText">{error}</p>
      )}

      <button className="button" onClick={handleInicioSesion} >
        {loading ? ( 
          <div className="spinner"></div>
        ) : 'Iniciar Sesión'
        }
      </button>

      <p>o</p>

      <button
        className="registerButton"
        onClick={handleRegister}
      >
        Registrarse
      </button>
    </div>
  )
}

export default InicioSesion
