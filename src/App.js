import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './helpers/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import UserCompleteContext from './helpers/UserCompleteContext';
import InicioSesion from './screens/auth/InicioSesion';
import Registro from './screens/auth/Registro';
import Inicio from './screens/Inicio';
import CrearCampana from './screens/campana/CrearCampana';
import DetalleCampana from './screens/campana/DetalleCampana';
import EditarCampana from './screens/campana/EditarCampana';
import ProduccionSpot from './screens/ProduccionSpot';
import PerfilUsuario from './screens/auth/PerfilUsuario';
import CrearCampanaOriginal from './screens/campana/OriginalCrearCampana';
import Pago from './screens/Pago';
import Admin from './screens/Admin';

export default function App() {
  const [user, setUser] = React.useState(null);
  const [userComplete, setUserComplete] = React.useState(true);

  useEffect(() => {
    console.log('user', user);
    console.log('userComplete', userComplete);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setUserComplete(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <UserCompleteContext.Provider value={{ userComplete, setUserComplete }}>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/inicio" /> : <Navigate to="/inicio-sesion" />} />
          <Route path="/inicio-sesion" element={!user ? <InicioSesion /> : <Navigate to="/inicio" />} />
          <Route path="/registro" element={!userComplete ? <Registro /> : <Navigate to="/inicio" />} />
          <Route path="/inicio" element={user ? <Inicio /> : <Navigate to="/inicio-sesion" />} />
          <Route path="/crear-campana" element={user && userComplete ? <CrearCampanaOriginal /> : <Navigate to="/inicio-sesion" />} />
          <Route path="/crear-campana-ai" element={user && userComplete ? <CrearCampana /> : <Navigate to="/inicio-sesion" />} />
          <Route path="/detalle-campana" element={user && userComplete ? <DetalleCampana /> : <Navigate to="/inicio-sesion" />} />
          <Route path="/editar-campana" element={user && userComplete ? <EditarCampana /> : <Navigate to="/inicio-sesion" />} />
          <Route path="/produccion-spot" element={user && userComplete ? <ProduccionSpot /> : <Navigate to="/inicio-sesion" />} />
          <Route path="/perfil-usuario" element={user && userComplete ? <PerfilUsuario /> : <Navigate to="/inicio-sesion" />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </UserCompleteContext.Provider>
  );
}
