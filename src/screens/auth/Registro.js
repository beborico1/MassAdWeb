import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserCompleteContext from '../../helpers/UserCompleteContext'
import i18n from 'i18next'; // Usa i18next o alguna otra librería de internacionalización que funcione con React
import { auth, db } from '../../helpers/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import IdentificacionForm from '../../components/auth/IdentificacionForm';
import '../../helpers/estilos/Registro.css'
import ContinuarButton from '../../components/ContinuarButton';
import RegisterForm from '../../components/auth/RegisterForm';
import EmpresaForm from '../../components/auth/EmpresaForm';
import DemograficosForm from '../../components/auth/DemograficosForm';
import SelectSexo from '../../components/auth/SelectSexo';
import SelectPais from '../../components/auth/SelectPais';
import SelectEstado from '../../components/auth/SelectEstado';

export default function Registro() {
  // estados informativos
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // estados para los datos de identificación
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [edad, setEdad] = useState('')
  const [sexo, setSexo] = useState('')
  const [telefono, setTelefono] = useState('')
  
  // estados para los datos demográficos
  const [pais, setPais] = useState('')
  const [estado, setEstado] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [codigoPostal, setCodigoPostal] = useState('')
  
  // estados para los datos de la empresa
  const [nombreEmpresa, setNombreEmpresa] = useState('')
  const [puesto, setPuesto] = useState('')
  const [rfc, setRfc] = useState('')
  const [direccionEmpresa, setDireccionEmpresa] = useState('')
  const [telefonoEmpresa, setTelefonoEmpresa] = useState('')

  // estados para los datos de la cuenta
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [etapa, setEtapa] = useState(1);

  const { setUserComplete } = useContext(UserCompleteContext);

  //const locales = i18n.language;

  const nombresEtapas = [
    'Identificación', // Nombre completo, edad y teléfono
    'Genero', // Sexo
    'País', // País
    'Estado', // Estado
    'Demográficos', // Ciudad y código postal
    'Empresa', // Nombre de la empresa y puesto
    'Cuenta', // Correo electrónico, contraseña y confirmar contraseña
  ];

  const numeroDeEtapas = 7;
  
  const navigate = useNavigate()

  const handleIniciarSesion = async () => {
    navigate('/inicio-sesion')
  }

  const handleContinuar = (cambio) => {
    if (cambio === -1 && etapa >= 1) {
      setEtapa(etapa-1);
      return;
    } else if (etapa === 1) {
      if (!nombreCompleto || !edad || !telefono) {
        setError('Por favor llena todos los campos de identificación');
        return;
      } else if (edad < 13 || edad > 100) {
        setError('La edad debe ser entre 13 y 100 años');
        return;
      }
    } else if (etapa === 2 && !sexo) {
      setError('Por favor selecciona tu sexo');
      return;
    } else if (etapa === 3) {
      if (!pais) {
        setError('Por favor selecciona tu país');
        return;
      }
    } else if (etapa === 4 && (!estado)) {
      setError('Por favor selecciona tu estado');
      return;
    } else if (etapa === 5 && (!ciudad || !codigoPostal)) {
      setError('Por favor llena todos los campos demográficos');
      return;
    } else if (etapa === 6 && (!nombreEmpresa || !puesto)) {
      setError('Por favor llena todos los campos de la empresa');
      return;
    }

    if (etapa+cambio<1) {
      setEtapa(1);
    } else if (etapa+cambio>numeroDeEtapas) {
      handleRegistro();
      setEtapa(numeroDeEtapas);
    } else if (cambio === 1) {
      setEtapa(etapa+1);
      setError('');
    }
  }


  const handleRegistro = async () => {
    try {
      setUserComplete(false);
      if (password !== confirmPassword) {
        //throw new Error('Las contraseñas no coinciden');
        setError('Las contraseñas no coinciden');
        return;
      }
  
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Signed in 
      const user = userCredential.user;
      console.log(user)
  
      // Creamos un documento de usuario en FireStore
      const docRef = doc(db, 'users', user.uid);

      await setDoc(docRef, {
        nombreCompleto,
        edad,
        sexo,
        telefono,
        pais,
        estado,
        ciudad,
        codigoPostal,
        nombreEmpresa,
        puesto,
        rfc,
        direccionEmpresa,
        telefonoEmpresa,
        email,
        uid: user.uid,
        // locales,
      });
  
      console.log('Usuario registrado correctamente');

      setUserComplete(true);
    } catch (error) {
      setLoading(false);
      let errorMessage = '';
  
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este correo electrónico ya está en uso';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El formato del correo electrónico es incorrecto';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'La operación no fue permitida';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es demasiado débil';
          break;
        default:
          console.log(error);
          errorMessage = 'Ocurrió un error desconocido';
      }
  
      setError(errorMessage);
    }
  }

  return (
    <div className="center">
      <img src={require('../../assets/logo.png')} alt="Logo" className="logo" />


      {/* <h1 className="titleText">
        Registro
      </h1> */}

      <h1 className="titleText">
        {nombresEtapas[etapa-1]}
      </h1>

      { etapa === 1 && <IdentificacionForm nombreCompleto={nombreCompleto} setNombreCompleto={setNombreCompleto} edad={edad} setEdad={setEdad} telefono={telefono} setTelefono={setTelefono} />}
      { etapa === 2 && <SelectSexo sexo={sexo} setSexo={setSexo} /> }
      { etapa === 3 && <SelectPais pais={pais} setPais={setPais} />}
      { etapa === 4 && <SelectEstado estado={estado} setEstado={setEstado} />}
      { etapa === 5 && <DemograficosForm pais={pais} setPais={setPais} estado={estado} setEstado={setEstado} ciudad={ciudad} setCiudad={setCiudad} codigoPostal={codigoPostal} setCodigoPostal={setCodigoPostal} />}
      { etapa === 6 && <EmpresaForm nombreEmpresa={nombreEmpresa} setNombreEmpresa={setNombreEmpresa} puesto={puesto} setPuesto={setPuesto} rfc={rfc} setRfc={setRfc} direccionEmpresa={direccionEmpresa} setDireccionEmpresa={setDireccionEmpresa} telefonoEmpresa={telefonoEmpresa} setTelefonoEmpresa={setTelefonoEmpresa} />}
      { etapa === 7 && <RegisterForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />}

      {error && (
        <div className="errorText">{error}</div>
      )}

      <ContinuarButton loading = {loading} etapa = {etapa} numeroDeEtapas={numeroDeEtapas} handleContinuar={handleContinuar} title = {'Registrarse'}/>

      <p>o</p>

      <button onClick={handleIniciarSesion} className="inicioSesionButton">
        Iniciar Sesión 
      </button>

      
    </div>
  )
}

// import React, { useContext, useState } from 'react'
// import { auth, db } from '../../helpers/firebase'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import RegisterForm from '../../components/auth/RegisterForm'
// import IdentificacionForm from '../../components/auth/IdentificacionForm'
// import DemograficosForm from '../../components/auth/DemograficosForm'
// import EmpresaForm from '../../components/auth/EmpresaForm'
// import { doc, setDoc } from "firebase/firestore"
// import UserCompleteContext from '../../helpers/UserCompleteContext'
// import SelectSexo from '../../components/auth/SelectSexo'
// import SelectPais from '../../components/auth/SelectPais'
// import SelectEstado from '../../components/auth/SelectEstado'
// import i18n from 'i18next'; // Usa i18next o alguna otra librería de internacionalización que funcione con React

// const Registro = () => {
//   // estados informativos
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)

//   // estados para los datos de identificación
//   const [nombreCompleto, setNombreCompleto] = useState('')
//   const [edad, setEdad] = useState('')
//   const [sexo, setSexo] = useState('')
//   const [telefono, setTelefono] = useState('')
  
//   // estados para los datos demográficos
//   const [pais, setPais] = useState('')
//   const [estado, setEstado] = useState('')
//   const [ciudad, setCiudad] = useState('')
//   const [codigoPostal, setCodigoPostal] = useState('')
  
//   // estados para los datos de la empresa
//   const [nombreEmpresa, setNombreEmpresa] = useState('')
//   const [puesto, setPuesto] = useState('')
//   const [rfc, setRfc] = useState('')
//   const [direccionEmpresa, setDireccionEmpresa] = useState('')
//   const [telefonoEmpresa, setTelefonoEmpresa] = useState('')

//   // estados para los datos de la cuenta
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
  
//   const [etapa, setEtapa] = useState(1);

//   const { setUserComplete } = useContext(UserCompleteContext);

//   const locales = i18n.language;

//   const nombresEtapas = [
//     'Identificación', // Nombre completo, edad y teléfono
//     'Genero', // Sexo
//     'País', // País
//     'Estado', // Estado
//     'Demográficos', // Ciudad y código postal
//     'Empresa', // Nombre de la empresa y puesto
//     'Cuenta', // Correo electrónico, contraseña y confirmar contraseña
//   ];

//   const numeroDeEtapas = 7;

//   const handleContinuar = (cambio) => {

//     if (cambio === -1 && etapa >= 1) {
//       setEtapa(etapa-1);
//       return;
//     } else if (etapa === 1) {
//       if (!nombreCompleto || !edad || !telefono) {
//         setError('Por favor llena todos los campos de identificación');
//         return;
//       } else if (edad < 13 || edad > 100) {
//         setError('La edad debe ser entre 13 y 100 años');
//         return;
//       }
//     } else if (etapa === 2 && !sexo) {
//       setError('Por favor selecciona tu sexo');
//       return;
//     } else if (etapa === 3) {
//       if (!pais) {
//         setError('Por favor selecciona tu país');
//         return;
//       }
//     } else if (etapa === 4 && (!estado)) {
//       setError('Por favor selecciona tu estado');
//       return;
//     } else if (etapa === 5 && (!ciudad || !codigoPostal)) {
//       setError('Por favor llena todos los campos demográficos');
//       return;
//     } else if (etapa === 6 && (!nombreEmpresa || !puesto)) {
//       setError('Por favor llena todos los campos de la empresa');
//       return;
//     }

//     if (etapa+cambio<1) {
//       setEtapa(1);
//     } else if (etapa+cambio>numeroDeEtapas) {
//       handleRegistro();
//       setEtapa(numeroDeEtapas);
//     } else if (cambio === 1) {
//       setEtapa(etapa+1);
//       setError('');
//     }
//   }

//   const handleRegistro = async () => {
//     try {
//       setUserComplete(false);
//       if (password !== confirmPassword) {
//         throw new Error('Las contraseñas no coinciden');
//       }
  
//       setLoading(true);
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
//       // Signed in 
//       const user = userCredential.user;
//       console.log(user)
  
//       // Creamos un documento de usuario en FireStore
//       const docRef = doc(db, 'users', user.uid);

//       await setDoc(docRef, {
//         nombreCompleto,
//         edad,
//         sexo,
//         telefono,
//         pais,
//         estado,
//         ciudad,
//         codigoPostal,
//         nombreEmpresa,
//         puesto,
//         rfc,
//         direccionEmpresa,
//         telefonoEmpresa,
//         email,
//         uid: user.uid,
//         locales,
//       });
  
//       console.log('Usuario registrado correctamente');
//       setUserComplete(true);
//     } catch (error) {
//       setLoading(false);
//       let errorMessage = '';
  
//       switch (error.code) {
//         case 'auth/email-already-in-use':
//           errorMessage = 'Este correo electrónico ya está en uso';
//           break;
//         case 'auth/invalid-email':
//           errorMessage = 'El formato del correo electrónico es incorrecto';
//           break;
//         case 'auth/operation-not-allowed':
//           errorMessage = 'La operación no fue permitida';
//           break;
//         case 'auth/weak-password':
//           errorMessage = 'La contraseña es demasiado débil';
//           break;
//         default:
//           console.log(error);
//           errorMessage = 'Ocurrió un error desconocido';
//       }
  
//       setError(errorMessage);
//     }
//   }  

//   return (
//     <div>
//       <h1>{nombresEtapas[etapa-1]}</h1>

//       { etapa === 1 && <IdentificacionForm nombreCompleto={nombreCompleto} setNombreCompleto={setNombreCompleto} edad={edad} setEdad={setEdad} telefono={telefono} setTelefono={setTelefono} />}
//       { etapa === 2 && <SelectSexo sexo={sexo} setSexo={setSexo} /> }
//       { etapa === 3 && <SelectPais pais={pais} setPais={setPais} />}
//       { etapa === 4 && <SelectEstado estado={estado} setEstado={setEstado} />}
//       { etapa === 5 && <DemograficosForm pais={pais} setPais={setPais} estado={estado} setEstado={setEstado} ciudad={ciudad} setCiudad={setCiudad} codigoPostal={codigoPostal} setCodigoPostal={setCodigoPostal} />}
//       { etapa === 6 && <EmpresaForm nombreEmpresa={nombreEmpresa} setNombreEmpresa={setNombreEmpresa} puesto={puesto} setPuesto={setPuesto} rfc={rfc} setRfc={setRfc} direccionEmpresa={direccionEmpresa} setDireccionEmpresa={setDireccionEmpresa} telefonoEmpresa={telefonoEmpresa} setTelefonoEmpresa={setTelefonoEmpresa} />}
//       { etapa === 7 && <RegisterForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />}

//       {error && (
//         <div>{error}</div>
//       )}

//       <button onClick={() => handleContinuar(1)}>
//         {loading ? 'Cargando...' : 'Continuar'}
//       </button>

//       {etapa > 1 && (
//         <button onClick={() => handleContinuar(-1)}>
//           Regresar
//         </button>
//       )}
//     </div>
//   )
// }

// export default Registro


// // import React, { useContext, useState } from 'react'
// // import { auth, db } from '../../helpers/firebase'
// // import { createUserWithEmailAndPassword } from 'firebase/auth'
// // import RegisterForm from '../../components/auth/RegisterForm'
// // import IdentificacionForm from '../../components/auth/IdentificacionForm'
// // import DemograficosForm from '../../components/auth/DemograficosForm'
// // import EmpresaForm from '../../components/auth/EmpresaForm'
// // import { doc, setDoc } from "firebase/firestore"
// // import UserCompleteContext from '../../helpers/UserCompleteContext'
// // import SelectSexo from '../../components/auth/SelectSexo'
// // import SelectPais from '../../components/auth/SelectPais'
// // import SelectEstado from '../../components/auth/SelectEstado'
// // import * as Localization from 'expo-localization'

// // const Registro = () => {
// //   // ... Todos tus estados se mantienen

// //   // Lógica del manejo de etapas

// //   // Esta es tu lógica de manejo de registro
// //   const handleRegistro = async () => {
// //     // ...
// //   }

// //   return (
// //     <div className="container">
// //       <h1 className="titleText">{nombresEtapas[etapa-1]}</h1>

// //       { etapa === 1 && <IdentificacionForm /* tus props */ /> }
// //       { etapa === 2 && <SelectSexo /* tus props */ /> }
// //       { etapa === 3 && <SelectPais /* tus props */ />}
// //       { etapa === 4 && <SelectEstado /* tus props */ />}
// //       { etapa === 5 && <DemograficosForm /* tus props */ />}
// //       { etapa === 6 && <EmpresaForm /* tus props */ />}
// //       { etapa === 7 && <RegisterForm /* tus props */ />}

// //       {error && (
// //         <div className="errorText">{error}</div>
// //       )}

// //       <button className="continuarButton" onClick={() => handleContinuar(1)}>
// //         {loading ? 'Cargando...' : 'Continuar'}
// //       </button>

// //       {etapa > 1 && (
// //         <button className="regresarButton" onClick={() => handleContinuar(-1)}>
// //           Regresar
// //         </button>
// //       )}
// //     </div>
// //   )
// // }

// // export default Registro

// // // Para los estilos, debes utilizar CSS normal o alguna librería como styled-components o emotion. Los componentes de formulario deben ser convertidos o reemplazados con versiones adecuadas para la web.

// // // Por último, los componentes que utilizas para la navegación deben ser reemplazados con un enrutador adecuado para la web, como react-router-dom.

// // // Además, la biblioteca expo-localization que estás utilizando no es compatible con la web. Podrías reemplazarla con una librería de internacionalización que funcione tanto en web como en React Native, como react-intl o i18next.

// // // Por favor, ten en cuenta que esta es una conversión aproximada. Es posible que debas hacer ajustes adicionales para que funcione correctamente en un entorno web.




