import React from 'react'

export default function DetalleCampana() {
  return (
    <div>DetalleCampana</div>
  )
}

// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { db, storage } from '../../helpers/firebase'
// import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
// import { deleteObject, ref } from 'firebase/storage'
// import AdjuntoItem from '../../components/AdjuntoItem'

// const DetalleCampana = () => {
//   const navigate = useNavigate();  // Utiliza useNavigate en lugar de useHistory
//   const { id } = useParams();
//   const [campana, setCampana] = useState(null);
//   const [adjuntos, setAdjuntos] = useState([]);
//   const [borrando, setBorrando] = useState(false);

//   useEffect(() => {
//     // Fetch the campaign from the database using the id from the URL
//     // and update the state accordingly.
//     // Code for fetching goes here...
//   }, [id]);

//   useEffect(() => {
//     setAdjuntos(campana?.adjuntos || []);
//   }, [campana]);

//   const handleDeleteAdjunto = async (adjunto) => {
//     // ...rest of your code
//   }

//   if (!campana) return null; // Or a loading spinner...

//   return (
//     <div>
//       <div>
//         <button onClick={() => navigate(`/editarCampana/${campana.id}`)}>Editar Campaña</button>
//         <button onClick={() => navigate(`/produccionSpot`)}>Produccion Spot</button>
//       </div>

//       <h1>Nombre: {campana.nombre}</h1>
//       <h1>Metas: {campana.metas}</h1>
//       <h1>Medio: {campana.medio}</h1>
//       <h1>Servicio: {campana.servicio}</h1>
//       <h1>Status: {campana.status}</h1>
//       <h1>Pauta: {campana.pauta}</h1>
//       <h1>Presupuesto: {campana.presupuesto}</h1>
//       <h1>Producción: {campana.produccion}</h1>
//       <h1>Detalles de la Producción: {campana.produccionDetalles}</h1>
//       <h1>Creada Por: {campana.creadaPor}</h1>

//       <h1>Estaciones:</h1>
//       {Object.keys(campana.estaciones).map((estacion, index) => (
//         <p key={index}>{estacion}: {campana.estaciones[estacion] ? 'Si' : 'No'}</p>
//       ))}

//       <h1>Adjuntos:</h1>

//       {borrando && <p>Borrando...</p>}

//       {adjuntos.map((adjunto, index) => (
//         <AdjuntoItem adjunto={adjunto} index={index} key={index} handleDeleteAdjunto={handleDeleteAdjunto}/>
//       ))}
//     </div>
//   )
// }

// export default DetalleCampana
