import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from '../screens/Inicio';
import CrearCampana from '../screens/campana/CrearCampana';
import DetalleCampana from '../screens/campana/DetalleCampana';
import EditarCampana from '../screens/campana/EditarCampana';
import ProduccionSpot from '../screens/ProduccionSpot';

const InicioStack = () => {
  return (
    <Router>
      <Routes>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/crear-campana" element={<CrearCampana />} />
        <Route path="/detalle-campana" element={<DetalleCampana />} />
        <Route path="/editar-campana" element={<EditarCampana />} />
        <Route path="/produccion-spot" element={<ProduccionSpot />} />
      </Routes>
    </Router>
  );
}

export default InicioStack;
