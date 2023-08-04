import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db } from '../../helpers/firebase';
import CheckStations from '../../components/crearcampana/CheckStations';
import Presupuesto from '../../components/crearcampana/Presupuesto';
import SpotProductionOptions from '../../components/crearcampana/SpotProductionOptions';
import AdjuntarArchivos from '../../components/crearcampana/AdjuntarArchivos';
import RegresarButton from '../../components/RegresarButton';
import ContinuarButton from '../../components/ContinuarButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import SelectComponent from '../../components/SelectComponent';
import Title from '../../components/TitleComponent';
import TextAreaComponent from '../../components/TextAreaComponent';
import TextInputComponent from '../../components/TextInputComponent';
import { toast } from 'react-toastify';

export default function EditarCampana() {
  const location = useLocation();
  const campaign = location.state.campaign;

  const navigate = useNavigate();

  const [etapa, setEtapa] = useState(1);
  const [loading, setLoading] = useState(false);

  const [nombreCampana, setNombreCampana] = useState(campaign.nombre || '');
  const [metasCampana, setMetasCampana] = useState(campaign.metas || '');
  const [selectedMedia, setSelectedMedia] = useState(campaign.medio || '');
  const [selectedService, setSelectedService] = useState(campaign.servicio || '');
  const [budget, setBudget] = useState(campaign.presupuesto || 0);
  const [spotProduction, setSpotProduction] = useState(campaign.produccion || '');
  const [spotProductionDetails, setSpotProductionDetails] = useState(campaign.produccionDetalles || '');
  const [pautaSpecs, setPautaSpecs] = useState(campaign.pauta || '');
  const [adjuntos, setAdjuntos] = useState(campaign.adjuntos || []);
  const [stations, setStations] = useState(campaign.estaciones || {
    maxima: false,
    activa: false,
    sonika: false,
    love: false
  });

  const numeroDeEtapas = 9;

  const nombresEtapas = [
    'Editar Nombre de la Campaña',
    'Editar Metas de la Campaña', // Agregamos el nombre de la etapa
    'Editar Medio de Comunicación',
    'Editar Servicio',
    'Editar Estaciones',
    'Editar Presupuesto',
    'Editar Producción de Spots',
    'Editar Especificaciones de la Pauta',
    'Agregar Adjuntos',
  ];

  const handleCheck = (station) => {
    setStations({...stations, [station]: !stations[station]});
  }

  const handleContinuar = (cambio) => {
    if (etapa === 1 && cambio === -1) {
      return;
    }

    if (etapa === numeroDeEtapas && cambio === 1) {
      return editarPropuesta();
    }

    if (cambio === 1) {
      if (etapa === numeroDeEtapas) {
        return editarPropuesta();
      } else if (etapa === 1 && !nombreCampana) {
        toast.error('El nombre de la campaña es obligatorio');
        return;
      } else if (etapa === 2 && !metasCampana) { // Agregamos validación para las metas de la campaña
        toast.error('Las metas de la campaña son obligatorias');
        return;
      } else if (etapa === 3 && !selectedMedia) {
        toast.error('El medio de comunicación es obligatorio');
        return;
      } else if (etapa === 4 && !selectedService) {
        toast.error('El servicio es obligatorio');
        return;
      } else if (etapa === 5 && (!stations.maxima && !stations.activa && !stations.sonika && !stations.love)) {
        toast.error('Debes seleccionar al menos una estación');
        return;
      } else if (etapa === 6 && !budget) {
        toast.error('El presupuesto es obligatorio');
        return;
      } else if (etapa === 7) {
        if (!spotProduction) {
          toast.error('Debes seleccionar una opción');
          return;
        }
        if (spotProduction === "Sí" && !spotProductionDetails) {
          toast.error('Debes proporcionar detalles sobre tus necesidades de producción');
          return;
        }
      } else if (etapa === 8 && !pautaSpecs) {
        toast.error('Debes proporcionar detalles sobre la pauta');
        return;
      }
      setEtapa(etapa + 1);
    } else {
      setEtapa(etapa - 1);
    }
  }

  const editarPropuesta = async () => {
    try {
      setLoading(true);

      const campanaRef = doc(db, 'campaigns', campaign.id);

      await updateDoc(campanaRef, {
        nombre: nombreCampana,
        metas: metasCampana,
        medio: selectedMedia,
        servicio: selectedService,
        estaciones: stations,
        presupuesto: budget,
        produccion: spotProduction,
        produccionDetalles: spotProductionDetails,
        pauta: pautaSpecs,
        adjuntos,
        status: 'Enviada'
      });

      navigate('/detalle-campana', { state: {campaign:{
        nombre: nombreCampana,
        metas: metasCampana,
        medio: selectedMedia,
        servicio: selectedService,
        estaciones: stations,
        presupuesto: budget,
        produccion: spotProduction,
        produccionDetalles: spotProductionDetails,
        pauta: pautaSpecs,
        adjuntos,
        status: 'Enviada'
      }} });

    } catch (error) {
      setLoading(false);
      toast.error('Error al editar la propuesta');
      console.error('Error al editar la propuesta: ', error);
    }
  }

  const handleBorrarCampana = async () => {
    try {
      await deleteDoc(doc(db, 'campaigns', campaign.id));
      console.log('Campaña eliminada');
      navigate('/inicio');
      toast.error('Campaña eliminada');
    } catch (error) {
      console.log(error);
    } 
  }  


  return (
    <div className='flex w-full h-screen justify-center items-center p-8 bg-gray-200 overflow-y-hidden'>
      <div className="flex flex-col items-center w-full max-w-3xl">

        <button onClick={() => window.history.back()} className='cursor-pointer bg-massad-500 hover:bg-massad-300 text-white py-2 px-4 text-center text-base font-semibold rounded-md transition duration-400 absolute top-2 left-2 justify-center items-center flex flex-row'>
          <FaArrowLeft size={20} style={{marginRight: '10px'}}/> Detalle
        </button>  

        <Title title={nombresEtapas[etapa-1]} />

        { etapa === 1 && 
          <TextInputComponent
            value={nombreCampana}
            setValue={setNombreCampana}
            placeholder='Ingresa el Nombre de la Campaña'
            type="text"
            required
          />

        }
        { etapa === 2 && 
          <TextAreaComponent 
            value={metasCampana}
            setValue={setMetasCampana}
            placeholder='Ingresa las Metas de la Campaña'
          />
        }
        { etapa === 3 && 
          <SelectComponent
            selectedValue={selectedMedia} 
            setSelectedValue={setSelectedMedia} 
            options={{
                initialMessage: "Seleccione el Medio de Comunicación",
                values: ["Radio"]
            }} 
          />
        }
        { etapa === 4 && 
          <SelectComponent 
            selectedValue={selectedService} 
            setSelectedValue={setSelectedService} 
            options={{
                initialMessage: "Seleccione el Servicio",
                values: ["Radio SA"]
            }} 
          />
        }
        { etapa === 5 && <CheckStations stations={stations} handleCheck={handleCheck}/> }
        { etapa === 6 && <Presupuesto budget={budget} setBudget={setBudget}/>}
        { etapa === 7 && <SpotProductionOptions spotProduction={spotProduction} setSpotProduction={setSpotProduction} spotProductionDetails={spotProductionDetails} setSpotProductionDetails={setSpotProductionDetails}/>}
        { etapa === 8 && 
          <TextAreaComponent 
            value={pautaSpecs}
            setValue={setPautaSpecs}
            placeholder={'Escribe aquí las especificaciones de la pauta'}
          />
        }
        { etapa === 9 && <AdjuntarArchivos adjuntos={adjuntos} setAdjuntos={setAdjuntos}/>}     


        <ContinuarButton title={'Editar Campaña'} etapa={etapa} numeroDeEtapas={numeroDeEtapas} handleContinuar={handleContinuar} loading={loading} />    

        <RegresarButton etapa={etapa} handleContinuar={handleContinuar} />    

        <button onClick={handleBorrarCampana} className='box-border w-300 p-2 bg-gray-500 text-white border-none rounded-md cursor-pointer text-xl font-semibold shadow-md hover:shadow-xl hover:bg-gray-300 mb-3 mt-3 flex flex-row justify-center h-12 items-center max-w-xl w-11/12'>
            <IoTrashOutline size={24} />
            <span className="pl-3">
              Borrar Campaña
            </span>
        </button>
      </div>
    </div>
  )
}