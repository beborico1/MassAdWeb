import React from 'react'

export default function CrearCampana() {
  return (
    <div>CrearCampana</div>
  )
}

// import React, { useState } from 'react';
// import { addDoc, collection } from 'firebase/firestore';
// import { auth, db } from '../../helpers/firebase';
// import NombreCampana from '../../components/crearcampana/NombreCampana';
// import MetasCampana from '../../components/crearcampana/MetasCampana';
// import SelectMedia from '../../components/crearcampana/SelectMedia';
// import SelectService from '../../components/crearcampana/SelectService';
// import CheckStations from '../../components/crearcampana/CheckStations';
// import Presupuesto from '../../components/crearcampana/Presupuesto';
// import SpotProductionOptions from '../../components/crearcampana/SpotProductionOptions';
// import EspecificacionesPauta from '../../components/crearcampana/EspecificacionesPauta';
// import AdjuntarArchivos from '../../components/crearcampana/AdjuntarArchivos';
// import RegresarButton from '../../components/RegresarButton';
// import ContinuarButton from '../../components/ContinuarButton';

// const CrearCampana = ({history}) => {
//   const [loading, setLoading] = useState(false);
//   const [nombreCampana, setNombreCampana] = useState('');
//   const [metasCampana, setMetasCampana] = useState('');
//   const [selectedMedia, setSelectedMedia] = useState('');
//   const [selectedService, setSelectedService] = useState('');
//   const [budget, setBudget] = useState(0);
//   const [spotProduction, setSpotProduction] = useState('');
//   const [spotProductionDetails, setSpotProductionDetails] = useState('');
//   const [pautaSpecs, setPautaSpecs] = useState('');
//   const [adjuntos, setAdjuntos] = useState([]);
  
//   const [etapa, setEtapa] = useState(1);
  
//   const [stations, setStations] = useState({
//     maxima: false,
//     activa: false,
//     laraza: false,
//     love: false
//   });
  
//   const handleCheck = (station) => {
//     setStations({...stations, [station]: !stations[station]});
//   }
  
//   const nombresEtapas = [
//     'Nombre de la Campaña',
//     'Metas de la Campaña', // Agregamos el nombre de la etapa
//     'Medio de Comunicación',
//     'Servicio',
//     'Estaciones',
//     'Presupuesto',
//     'Producción de Spots',
//     'Especificaciones de la Pauta',
//     '',
//   ];
  
//   const numeroDeEtapas = 9;
  
//   const handleContinuar = (cambio) => {
//     if (etapa === 1 && cambio === -1) {
//       return history.push('/Inicio');  // Aquí usamos history en lugar de navigation
//     }
    
//     if (cambio === 1) {
//       if (etapa === numeroDeEtapas) {
//         return enviarPropuesta();
//       } else if (etapa === 1 && !nombreCampana) {
//         alert('El nombre de la campaña es obligatorio');
//         return;
//       } else if (etapa === 2 && !metasCampana) { // Agregamos validación para las metas de la campaña
//         alert('Las metas de la campaña son obligatorias');
//         return;
//       } else if (etapa === 3 && !selectedMedia) {
//         alert('El medio de comunicación es obligatorio');
//         return;
//       } else if (etapa === 4 && !selectedService) {
//         alert('El servicio es obligatorio');
//         return;
//       } else if (etapa === 5 && (!stations.maxima && !stations.activa && !stations.laraza && !stations.love)) {
//         alert('Debes seleccionar al menos una estación');
//         return;
//       } else if (etapa === 6 && !budget) {
//         alert('El presupuesto es obligatorio');
//         return;
//       } else if (etapa === 7) {
//         if (!spotProduction) {
//           alert('Debes seleccionar una opción');
//           return;
//         }
//         if (spotProduction === "Sí" && !spotProductionDetails) {
//           alert('Debes proporcionar detalles sobre tus necesidades de producción');
//           return;
//         }
//       } else if (etapa === 8 && !pautaSpecs) {
//         alert('Debes proporcionar detalles sobre la pauta');
//         return;
//       }
//       setEtapa(etapa + 1);
//     } else {
//       setEtapa(etapa - 1);
//     }
//   } 

//   const enviarPropuesta = async () => {
//     if (!nombreCampana || !metasCampana || !selectedMedia || !selectedService ) {  // Agregamos validación para las metas de la campaña
//         return alert('Todos los campos son obligatorios');
//       }
  
//       try {
//         setLoading(true);
  
//         await addDoc(collection(db, 'campaigns'), {
//           nombre: nombreCampana,
//           metas: metasCampana,
//           creadaPor: auth.currentUser.uid,
//           medio: selectedMedia,
//           servicio: selectedService,
//           estaciones: stations,
//           presupuesto: budget,
//           produccion: spotProduction,
//           produccionDetalles: spotProductionDetails,
//           pauta: pautaSpecs,
//           adjuntos,
//           status: 'Enviada'
//         });
  
//         history.push('/Inicio');  // Aquí usamos history en lugar de navigation
//       } catch (error) {
//         setLoading(false);
//         alert('Error al enviar la propuesta');
//         console.error('Error al enviar la propuesta: ', error);
//       }
//   }

//   return (
//     <div>
//       <h1 style={{ marginBottom: 20 }}>{nombresEtapas[etapa-1]}</h1>
//       <h1>{nombresEtapas[etapa-1]}</h1>

//       { etapa === 1 && <NombreCampana nombreCampana={nombreCampana} setNombreCampana={setNombreCampana}/> }
//       { etapa === 2 && <MetasCampana metasCampana={metasCampana} setMetasCampana={setMetasCampana}/> }
//       { etapa === 3 && <SelectMedia selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} /> }
//       { etapa === 4 && <SelectService selectedService={selectedService} setSelectedService={setSelectedService}/> }
//       { etapa === 5 && <CheckStations stations={stations} handleCheck={handleCheck}/> }
//       { etapa === 6 && <Presupuesto budget={budget} setBudget={setBudget}/>}
//       { etapa === 7 && <SpotProductionOptions spotProduction={spotProduction} setSpotProduction={setSpotProduction} spotProductionDetails={spotProductionDetails} setSpotProductionDetails={setSpotProductionDetails}/>}
//       { etapa === 8 && <EspecificacionesPauta pautaSpecs={pautaSpecs} setPautaSpecs={setPautaSpecs}/>}
//       { etapa === 9 && <AdjuntarArchivos adjuntos={adjuntos} setAdjuntos={setAdjuntos}/>}

//       <ContinuarButton title={'Enviar Propuesta'} etapa={etapa} numeroDeEtapas={numeroDeEtapas} handleContinuar={handleContinuar} loading={loading} />
//       <RegresarButton etapa={etapa} handleContinuar={handleContinuar} />
//     </div>
//   )
// }

// export default CrearCampana;
