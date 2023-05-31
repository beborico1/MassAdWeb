import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../helpers/firebase'
import { useNavigate } from 'react-router-dom'
import UserCompleteContext from '../../helpers/UserCompleteContext'
import Title from '../../components/TitleComponent'
import TextInputComponent from '../../components/TextInputComponent'
import BigButtonComponent from '../../components/BigButtonComponent'
import { FaSignInAlt } from 'react-icons/fa'

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

      <Title title="Inicio de Sesión" />

      <TextInputComponent
        placeholder='Correo electrónico'
        value={email}
        setValue={setEmail}
        type="email"
        autoComplete="email"
      />

      <TextInputComponent
        placeholder='Contraseña'
        value={password}
        setValue={setPassword}
        type="password"
        autoComplete="current-password"
      />

      {error && (
          <p className="text-red-500 m-2">{error}</p>
      )}

      <BigButtonComponent
        text="Iniciar Sesión"
        loadingText="Iniciando..."
        handleClick={handleInicioSesion}
        loading={loading}
        Icon={FaSignInAlt}
      />
      
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
