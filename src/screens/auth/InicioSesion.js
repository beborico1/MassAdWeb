import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../helpers/firebase'
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
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-200">
      <img src={require('../../assets/logo.png')} alt="Logo" className="h-32" />

      <h1 className="text-gray-900 text-4xl mb-8  text-center"> Inicio de Sesión </h1>
      
      <input
        className="w-80 p-2 mb-2 border border-gray-300 rounded-md"
        placeholder='Correo electrónico'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />

      <input
        className="w-80 p-2 mb-2 border border-gray-300 rounded-md"
        placeholder='Contraseña'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
          <p className="text-red-500 m-2">{error}</p>
      )}

      <button className="w-80 p-2 bg-adstream-500 hover:bg-adstream-300 text-white border-none rounded-md cursor-pointer text-xl font-semibold shadow-md hover:shadow-lg transition duration-400" onClick={handleInicioSesion} >
        {loading ? ( 
          <div className="spinner"></div>
        ) : 'Iniciar Sesión'
        }
      </button>
      
      <div className="divider">
        <p className="m-3 select-none">o</p>
      </div>

      <button
        className="bg-transparent border-none text-adstream-600 cursor-pointer hover:underline hover:bg-transparent"
        onClick={handleRegister}
      >
        Registrarse
      </button>
    </div>
  )
}

export default InicioSesion
