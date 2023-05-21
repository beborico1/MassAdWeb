import React from 'react'

export default function EditarCampana() {
  return (
    <div>EditarCampana</div>
  )
}

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import { BsTrash } from 'react-icons/bs';
// import { doc, deleteDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
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

// const EditarCampana = ({ location }) => {
//   const { campana } = location.state;

//   const navigate = useNavigate();

//   const [etapa, setEtapa] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const handleContinuar = (cambio) => {
//     if (etapa === 1 && cambio === -1) {
//       return navigate('Inicio');
//     }

//     if (cambio === 1) {
//       if (etapa === numeroDeEtapas) {
//         return enviarPropuesta();
//       } else if (etapa === 1 && !nombreCampana) {
//         alert('El nombre de la campaña es obligatorio');
//         return;
//       } else if (etapa === 2 && !metasCampana) {
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
//         if (spotProduction === 'Sí' && !spotProductionDetails) {
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
//   };

//   const handleBorrarCampana = () => {
//     alert(
//         "Eliminar Campaña", // Título
//         "¿Estás seguro de que quieres eliminar esta campaña?", // Mensaje
//         [
//           {
//             text: "Cancelar",
//             onPress: () => console.log("Cancel Pressed"),
//             style: "cancel"
//           },
//           { 
//             text: "OK", 
//             onPress: async () => {
//               try {
//                 await deleteDoc(doc(db, 'campaigns', campana.id));
//                 console.log('Campaña eliminada');
//                 alert('Campaña eliminada');
//                 navigate('Inicio');
//               } catch (error) {
//                 console.log(error);
//               }
//             } 
//           }
//         ],
//         { cancelable: false } // Esto hace que el usuario deba seleccionar una de las opciones
//       );
//   };

//   const enviarPropuesta = async () => {
//     if (!nombreCampana || !metasCampana || !selectedMedia || !selectedService) {
//       alert('Todos los campos son obligatorios');
//       return;
//     }

//     try {
//       setLoading(true);

//       await addDoc(collection(db, 'campaigns'), {
//         nombre: nombreCampana,
//         metas: metasCampana,
//         creadaPor: auth.currentUser.uid,
//         medio: selectedMedia,
//         servicio: selectedService,
//         estaciones: stations,
//         presupuesto: budget,
//         produccion: spotProduction,
//         produccionDetalles: spotProductionDetails,
//         pauta: pautaSpecs,
//         adjuntos,
//         status: 'Enviada'
//       });

//       navigate('Inicio');
//     } catch (error) {
//       setLoading(false);
//       alert('Error al enviar la propuesta');
//       console.error('Error al enviar la propuesta: ', error);
//     }
//   };

//   const nombresEtapas = [
//     'Nombre de la Campaña',
//     'Metas de la Campaña',
//     'Medio de Comunicación',
//     'Servicio',
//     'Estaciones',
//     'Presupuesto',
//     'Producción de Spots',
//     'Especificaciones de la Pauta',
//     ''
//   ];

//   const numeroDeEtapas = 9;

//   const [nombreCampana, setNombreCampana] = useState('');
//   const [metasCampana, setMetasCampana] = useState('');
//   const [selectedMedia, setSelectedMedia] = useState('');
//   const [selectedService, setSelectedService] = useState('');
//   const [budget, setBudget] = useState(0);
//   const [spotProduction, setSpotProduction] = useState('');
//   const [spotProductionDetails, setSpotProductionDetails] = useState('');
//   const [pautaSpecs, setPautaSpecs] = useState('');
//   const [adjuntos, setAdjuntos] = useState([]);

//   const [stations, setStations] = useState({
//     maxima: false,
//     activa: false,
//     laraza: false,
//     love: false
//   });

//   const handleCheck = (station) => {
//     setStations({ ...stations, [station]: !stations[station] });
//   };

//   return (
//     <div className="container">
//       <h1 className="titleText">{nombresEtapas[etapa - 1]}</h1>

//       {etapa === 1 && (
//         <NombreCampana nombreCampana={nombreCampana} setNombreCampana={setNombreCampana} />
//       )}
//       {etapa === 2 && (
//         <MetasCampana metasCampana={metasCampana} setMetasCampana={setMetasCampana} />
//       )}
//       {etapa === 3 && (
//         <SelectMedia selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} />
//       )}
//       {etapa === 4 && (
//         <SelectService
//           selectedService={selectedService}
//           setSelectedService={setSelectedService}
//         />
//       )}
//       {etapa === 5 && <CheckStations stations={stations} handleCheck={handleCheck} />}
//       {etapa === 6 && <Presupuesto budget={budget} setBudget={setBudget} />}
//       {etapa === 7 && (
//         <SpotProductionOptions
//           spotProduction={spotProduction}
//           setSpotProduction={setSpotProduction}
//           spotProductionDetails={spotProductionDetails}
//           setSpotProductionDetails={setSpotProductionDetails}
//         />
//       )}
//       {etapa === 8 && (
//         <EspecificacionesPauta pautaSpecs={pautaSpecs} setPautaSpecs={setPautaSpecs} />
//       )}
//       {etapa === 9 && <AdjuntarArchivos adjuntos={adjuntos} setAdjuntos={setAdjuntos} />}

//       <ContinuarButton
//         title={'Editar Campaña'}
//         etapa={etapa}
//         numeroDeEtapas={numeroDeEtapas}
//         handleContinuar={handleContinuar}
//         loading={loading}
//       />

//       <RegresarButton etapa={etapa} handleContinuar={handleContinuar} />

//       <Button onClick={handleBorrarCampana} variant="danger" className="deleteButton">
//         <BsTrash size={24} />
//         <span className="buttonText">Borrar Campaña</span>
//       </Button>
//     </div>
//   );
// };

// export default EditarCampana;
