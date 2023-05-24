import React from 'react';

function Modal({ title, onClose, onConfirm, children }) {
  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg w-500 max-w-90vw relative'>
        <h2 className='text-2xl mb-4 select-none'>{title}</h2>
        <div className='text-base mb-5 select-none'>{children}</div>
        <div className='flex justify-end'>
          <button className='px-4 py-2 border-none rounded-md ml-2 cursor-pointer bg-gray-500 hover:bg-gray-300 text-white' onClick={onClose}>
            Cancel
          </button>
          <button className='px-4 py-2 border-none rounded-md ml-2 cursor-pointer bg-adstream-500 hover:bg-adstream-300 text-white' onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
