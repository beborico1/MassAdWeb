import React from 'react';

const CheckStations = ({ stations, handleCheck }) => {
    return (
            <div className="p-2 border border-gray-300 rounded-lg mb-6 shadow-md bg-white pb-5 pt-5 text-gray-800 px-8 flex flex-row items-center w-full max-w-2xl justify-center">
                <div>
                <label className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        checked={stations.maxima}
                        onChange={() => handleCheck('maxima')}
                        className="form-checkbox h-5 w-5 text-blue-600 space-x-2"
                    />
                    <span className="text-gray-900 ml-2">Máxima 96.3 FM</span>
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={stations.activa}
                        onChange={() => handleCheck('activa')}
                        className="form-checkbox h-5 w-5 text-massad-500 space-x-2"
                    />
                    <span className="text-gray-900 ml-2">Activa 89.7 FM</span>
                </label>
                </div>
                <div className="ml-4">
                <label className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        checked={stations.laraza}
                        onChange={() => handleCheck('laraza')}
                        className="form-checkbox h-5 w-5 text-blue-600 space-x-2"
                    />
                    <span className="text-gray-900 ml-2">LaRaza 105.1 FM</span>
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={stations.love}
                        onChange={() => handleCheck('love')}
                        className="form-checkbox h-5 w-5 text-blue-600 space-x-2"
                    />
                    <span className="text-gray-900 ml-2">Love 93.1 FM</span>
                </label>
                </div>
            </div>
    );
};

export default CheckStations;
