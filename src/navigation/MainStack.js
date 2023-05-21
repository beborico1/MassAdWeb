import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Inicio from '../screens/Inicio';
import CrearCampana from '../screens/campana/CrearCampana';
import DetalleCampana from '../screens/campana/DetalleCampana';
import EditarCampana from '../screens/campana/EditarCampana';
import ProduccionSpot from '../screens/ProduccionSpot';

const MainStack = () => {
  return (
    <div className="container">
      <ul className="nav nav-tabs" style={{ marginBottom: "20px" }}>
        <li className="nav-item">
          <Link to="/inicio" className="nav-link">Inicio</Link>
        </li>
        <li className="nav-item">
          <Link to="/crear-campana" className="nav-link">Crear Campaña</Link>
        </li>
        <li className="nav-item">
          <Link to="/detalle-campana" className="nav-link">Detalle Campaña</Link>
        </li>
        <li className="nav-item">
          <Link to="/editar-campana" className="nav-link">Editar Campaña</Link>
        </li>
        <li className="nav-item">
          <Link to="/produccion-spot" className="nav-link">Producción Spot</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/crear-campana" element={<CrearCampana />} />
        <Route path="/detalle-campana" element={<DetalleCampana />} />
        <Route path="/editar-campana" element={<EditarCampana />} />
        <Route path="/produccion-spot" element={<ProduccionSpot />} />
      </Routes>
    </div>
  );
}

export default MainStack;


// import React from 'react';
// import { Route, Routes, Link } from 'react-router-dom'; // Agrega 'Link' al import
// import 'bootstrap/dist/css/bootstrap.css';
// import Inicio from '../screens/Inicio';
// import CrearCampana from '../screens/campana/CrearCampana';
// import DetalleCampana from '../screens/campana/DetalleCampana';
// import EditarCampana from '../screens/campana/EditarCampana';
// import ProduccionSpot from '../screens/ProduccionSpot';

// const MainStack = () => {
//   return (
//     <div className="container">
//       <ul className="nav nav-tabs" style={{ marginBottom: "20px" }}>
//         <li className="nav-item">
//           <Link to="/inicio" className="nav-link">Inicio</Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/crear-campana" className="nav-link">Crear Campaña</Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/detalle-campana" className="nav-link">Detalle Campaña</Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/editar-campana" className="nav-link">Editar Campaña</Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/produccion-spot" className="nav-link">Producción Spot</Link>
//         </li>
//       </ul>

//       <Routes>
//         <Route path="/inicio" element={<Inicio />} />
//         <Route path="/crear-campana" element={<CrearCampana />} />
//         <Route path="/detalle-campana" element={<DetalleCampana />} />
//         <Route path="/editar-campana" element={<EditarCampana />} />
//         <Route path="/produccion-spot" element={<ProduccionSpot />} />
//       </Routes>
//     </div>
//   );
// }

// export default MainStack;


// // import React from 'react';
// // import { Route, Routes } from 'react-router-dom';
// // import 'bootstrap/dist/css/bootstrap.css';
// // import Inicio from '../screens/Inicio';
// // import CrearCampana from '../screens/campana/CrearCampana';
// // import DetalleCampana from '../screens/campana/DetalleCampana';
// // import EditarCampana from '../screens/campana/EditarCampana';
// // import ProduccionSpot from '../screens/ProduccionSpot';

// // const MainStack = () => {
// //   return (
// //     <div className="container">
// //       <ul className="nav nav-tabs" style={{ marginBottom: "20px" }}>
// //         <li className="nav-item">
// //           <Link to="/inicio" className="nav-link">Inicio</Link>
// //         </li>
// //         <li className="nav-item">
// //           <Link to="/crear-campana" className="nav-link">Crear Campaña</Link>
// //         </li>
// //         <li className="nav-item">
// //           <Link to="/detalle-campana" className="nav-link">Detalle Campaña</Link>
// //         </li>
// //         <li className="nav-item">
// //           <Link to="/editar-campana" className="nav-link">Editar Campaña</Link>
// //         </li>
// //         <li className="nav-item">
// //           <Link to="/produccion-spot" className="nav-link">Producción Spot</Link>
// //         </li>
// //       </ul>

// //       <Routes>
// //         <Route path="/inicio" element={<Inicio />} />
// //         <Route path="/crear-campana" element={<CrearCampana />} />
// //         <Route path="/detalle-campana" element={<DetalleCampana />} />
// //         <Route path="/editar-campana" element={<EditarCampana />} />
// //         <Route path="/produccion-spot" element={<ProduccionSpot />} />
// //       </Routes>
// //     </div>
// //   );
// // }

// // export default MainStack;

// // // import React from 'react';
// // // import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// // // import 'bootstrap/dist/css/bootstrap.css';
// // // import InicioStack from './InicioStack';
// // // import PerfilStack from './PerfilStack';

// // // const MainStack = () => {
// // //   return (
// // //     <Router>
// // //       <div className="container">
// // //         <ul className="nav nav-tabs" style={{ marginBottom: "20px" }}>
// // //           <li className="nav-item">
// // //             <Link to="/inicio" className="nav-link">Inicio</Link>
// // //           </li>
// // //           <li className="nav-item">
// // //             <Link to="/perfil" className="nav-link">Perfil</Link>
// // //           </li>
// // //         </ul>

// // //         <Routes>
// // //           <Route path="/inicio" element={<InicioStack />} />
// // //           <Route path="/perfil" element={<PerfilStack />} />
// // //         </Routes>
// // //       </div>
// // //     </Router>
// // //   )
// // // }

// // // export default MainStack;
