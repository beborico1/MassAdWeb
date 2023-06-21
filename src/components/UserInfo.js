import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaSave, FaCheck } from 'react-icons/fa';
import { db } from '../helpers/firebase';

export default function UserInfo({usuario}) {
  const [state, setState] = useState('edit');

  const [nombreEditable, setNombreEditable] = useState(usuario.nombreCompleto);
  const [nombreEmpresaEditable, setNombreEmpresaEditable] = useState(usuario.nombreEmpresa);
  const [telefonoEmpresaEditable, setTelefonoEmpresaEditable] = useState(usuario.nombreEmpresa);
  const [rfcEditable, setRfcEditable] = useState(usuario.rfc);   
  const [direccionEmpresaEditable, setDireccionEmpresaEditable] = useState(usuario.direccionEmpresa);
  const [edadEditable, setEdadEditable] = useState(usuario.edad);
  const [telefonoEditable, setTelefonoEditable] = useState(usuario.telefono);
  const [codigoPostalEditable, setCodigoPostalEditable] = useState(usuario.codigoPostal);
  const [puestoEditable, setPuestoEditable] = useState(usuario.puesto);
    
  const handleClick = async () => {
    if (state === 'edit') {
      setState('save');
    } else if (state === 'save') {
      setState('saving');

      const docRef = doc(db, 'users', usuario.id);

      await updateDoc(docRef, {
          nombreCompleto: nombreEditable,
          nombreEmpresa: nombreEmpresaEditable,
          telefonoEmpresa: telefonoEmpresaEditable,
          rfc: rfcEditable,
          direccionEmpresa: direccionEmpresaEditable,
          edad: edadEditable,
          telefono: telefonoEditable,
          codigoPostal: codigoPostalEditable,
          puesto: puestoEditable,
      });

      setState('saved');
    } else if (state === 'saved') {
      await new Promise(resolve => setTimeout(resolve, 5000));
      setState('edit');
    }
  };

  useEffect(() => {
    if (state === 'saved') {
      const timer = setTimeout(() => setState('edit'), 1000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg w-3/4  max-w-3xl h-2/3 overflow-y-scroll m-4 relative">
      
      <button
        onClick={handleClick}
        className={`absolute right-4 top-4 bg-transparent px-3 py-2 rounded-full hover:bg-gray-200 flex flex-row items-center justify-center transition-colors duration-200  
          ${state === 'save' ? 'font-medium text-adstream-500 transition-colors duration-200' : 
            state === 'saving' ? 'text-gray-400 transition-colors duration-200' : 
            state === 'saved' ? 'text-green-500 transition-colors duration-200' : 
            'text-adstream-500 transition-none duration-0'}`}
      >
        {state === 'edit' && <><FaPencilAlt size={20} className='mr-0 md:mr-2'/><p>Editar</p></>}
        {state === 'save' && <><FaSave size={20} className='mr-0 md:mr-2'/><p>Guardar</p></>}
        {state === 'saving' && <p>Guardando...</p>}
        {state === 'saved' && <><FaCheck size={20} className='mr-0 md:mr-2'/><p>Guardado</p></>}
      </button>

      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 select-none">
          Información Personal
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 select-none">
          Detalles de la cuenta del usuario.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 select-none">
              Nombre Completo
            </dt>

            <dd className="mt-1 text-sm text-gray-900">
            {state === 'save' ?
                <input
                    type="text"
                    value={nombreEditable}
                    onChange={e => setNombreEditable(e.target.value)}
                    className="border-none focus:outline-none text-gray-400"
                />
                    : 
                nombreEditable
              }
            </dd> 
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 select-none">
              Email
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {usuario.email}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 select-none">
              Edad
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
                {state === 'save' ?
                    <input
                        type="number"
                        value={edadEditable}
                        onChange={e => setEdadEditable(e.target.value)}
                        className="border-none focus:outline-none text-gray-400"
                    />
                        :
                    edadEditable
                }
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 select-none">
              Sexo
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {usuario.sexo}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 select-none">
              Teléfono
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
                {state === 'save' ?
                    <input
                        type="tel"
                        value={telefonoEditable}
                        onChange={e => setTelefonoEditable(e.target.value)}
                        className="border-none focus:outline-none text-gray-400"
                    />
                        :
                    telefonoEditable
                }
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 select-none">
              País
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {usuario.pais}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 select-none">
              Estado
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {usuario.estado}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 select-none">
              Ciudad
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {usuario.ciudad}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 select-none">
              Código Postal
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
                {state === 'save' ?
                    <input
                        type="number"
                        value={codigoPostalEditable}
                        onChange={e => setCodigoPostalEditable(e.target.value)}
                        className="border-none focus:outline-none text-gray-400"
                    />
                        :
                    codigoPostalEditable
                }
            </dd>
          </div>
        </dl>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 select-none">
          Información de la Empresa
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 select-none">
          Detalles de la empresa del usuario.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 select-none">
              Nombre de la Empresa
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
            {state === 'save' ?
                <input
                    type="text"
                    value={nombreEmpresaEditable}
                    onChange={e => setNombreEmpresaEditable(e.target.value)}
                    className="border-none focus:outline-none text-gray-400"
                />
                    :
                nombreEmpresaEditable
            }
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 select-none">
              Puesto
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
                {state === 'save' ?
                    <input
                        type="text"
                        value={puestoEditable}
                        onChange={e => setPuestoEditable(e.target.value)}
                        className="border-none focus:outline-none text-gray-400"
                    />
                        :
                    puestoEditable
                }
            </dd>
          </div>
          {usuario.rfc && 
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 select-none">
                RFC
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {state === 'save' ?
                    <input
                        type="text"
                        value={rfcEditable}
                        onChange={e => setRfcEditable(e.target.value)}
                        className="border-none focus:outline-none text-gray-400"
                    />
                        :
                    rfcEditable
                }
              </dd>
            </div>
          }
          {usuario.direccionEmpresa && 
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 select-none">
                Dirección de la Empresa
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {state === 'save' ?
                    <input
                        type="text"
                        value={direccionEmpresaEditable}
                        onChange={e => setDireccionEmpresaEditable(e.target.value)}
                        className="border-none focus:outline-none text-gray-400"
                    />
                        :
                    direccionEmpresaEditable
                }
              </dd>
            </div>
          }
          {usuario.telefonoEmpresa && 
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 select-none">
                Teléfono de la Empresa
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {state === 'save' ?
                    <input
                        type="tel"
                        value={telefonoEmpresaEditable}
                        onChange={e => setTelefonoEmpresaEditable(e.target.value)}
                        className="border-none focus:outline-none text-gray-400"
                    />
                        :
                    telefonoEmpresaEditable
                }
              </dd>
            </div>
          }
        </dl>
      </div>
    </div>
  )
}
