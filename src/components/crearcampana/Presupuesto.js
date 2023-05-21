import React from 'react';

const Presupuesto = ({ budget, setBudget }) => {

  return (
    <div style={{width: '100%'}}>
      <p style={{ marginBottom: 30, textAlign: 'center' }}>Presupuesto: ${budget} mxn</p>
      <input
        type="range"
        style={{ width: '100%', height: 40, marginBottom: 20 }}
        min={0}
        max={100000}
        step={200}
        value={budget}
        onChange={event => setBudget(parseInt(event.target.value))}
      />
    </div>
  );
}

export default Presupuesto;
