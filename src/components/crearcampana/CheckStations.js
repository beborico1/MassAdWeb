import React from 'react';
import colors from '../../helpers/colors';

const CheckStations = ({ stations, handleCheck }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={stations.maxima}
                        onChange={() => handleCheck('maxima')}
                        style={{ marginRight: 5 }}
                    />
                    Máxima 96.3 FM
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={stations.activa}
                        onChange={() => handleCheck('activa')}
                        style={{ marginRight: 5 }}
                    />
                    Activa 89.7 FM
                </label>
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={stations.laraza}
                        onChange={() => handleCheck('laraza')}
                        style={{ marginRight: 5 }}
                    />
                    LaRaza 105.1 FM
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={stations.love}
                        onChange={() => handleCheck('love')}
                        style={{ marginRight: 5 }}
                    />
                    Love 93.1 FM
                </label>
            </div>
        </div>
    );
};

export default CheckStations;
