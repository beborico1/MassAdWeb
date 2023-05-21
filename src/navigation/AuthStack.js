import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import InicioSesion from '../screens/auth/InicioSesion';
import Registro from '../screens/auth/Registro';
import '../helpers/estilos/AuthStack.css'; // Archivo CSS para estilos personalizados

const AuthStack = () => {
  return (
    <div className="auth-container">
      <nav className="auth-nav">
        <ul className="auth-nav-list">
          <li className="auth-nav-item">
            <Link to="/inicio-sesion" className="auth-nav-link">Iniciar Sesión</Link>
          </li>
          <li className="auth-nav-item">
            <Link to="/registro" className="auth-nav-link">Crear una nueva Cuenta</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </div>
  );
};

export default AuthStack;

// import React from 'react'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import InicioSesion from '../screens/auth/InicioSesion';
// import Registro from '../screens/auth/Registro';

// const AuthStack = () => {
//   return (
//     <Router>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/inicio-sesion" style={{ color: 'black' }}>Iniciar Sesión</Link>
//           </li>
//           <li>
//             <Link to="/registro" style={{ color: 'black' }}>Crear una nueva Cuenta</Link>
//           </li>
//         </ul>
//       </nav>

//       <Route path="/inicio-sesion" component={InicioSesion} />
//       <Route path="/registro" component={Registro} />
//     </Router>
//   )
// }

// export default AuthStack
