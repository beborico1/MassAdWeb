import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const ContinuarButton = ({loading, etapa, numeroDeEtapas, title, handleContinuar, loadingText, bgColor}) => {
  const baseClasses = "p-2 text-white border-none rounded-md cursor-pointer text-xl font-semibold shadow-md hover:shadow-xl w-11/12 max-w-xl mb-3 mt-3 h-12 box-border";
  const backgroundColor = bgColor ? bgColor : 'bg-adstream-500 hover:bg-adstream-300';
  
  const [dots, setDots] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((dots) => (dots + 1) % 4);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [loading]);

  const loadingWithDots = loadingText ? loadingText + '.'.repeat(dots) : 'Cargando' + '.'.repeat(dots);

  return (
    <button disabled={loading} onClick={() => handleContinuar(1)} className={`${baseClasses} ${backgroundColor} ${loading && loadingText && "bg-blue-300 hover:bg-blue-300 hover:shadow-md"}`}>
      {loading ? (
        <div role="status">
          <span>{loadingWithDots}</span>
        </div>
      ) : etapa === numeroDeEtapas ? 
          `${title}` :
          "Continuar"
      }
      { etapa !== numeroDeEtapas && !loading && <FaArrowRight className="inline-block ml-3" size={24} /> }
    </button>
  )
}

export default ContinuarButton;
