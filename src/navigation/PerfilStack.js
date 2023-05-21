import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PerfilUsuario from '../screens/auth/PerfilUsuario';

const PerfilStack = () => {
  return (
    <Router>
      <Route path="/perfil-usuario" component={PerfilUsuario} />
    </Router>
  )
}

export default PerfilStack;
