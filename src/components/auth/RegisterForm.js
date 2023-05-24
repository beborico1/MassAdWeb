import React from 'react';

const RegisterForm = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => {

    return (
      <div className="flex flex-col mb-5 w-full max-w-2xl">
        <input
          className="box-border p-2 mb-2 border border-gray-300 rounded-md  w-full max-w-2xl  shadow-sm"
          placeholder='Correo electrónico'
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoCapitalize="none"
          autoComplete="email"
          type="email"
        />
     
        <input
          className="box-border p-2 mb-2 border border-gray-300 rounded-md  w-full max-w-2xl  shadow-sm"
          placeholder='Contraseña'
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
     
        <input
          className="box-border p-2 border border-gray-300 rounded-md  w-full max-w-2xl  shadow-sm"
          placeholder='Confirmar contraseña'
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>
    );      
};

export default RegisterForm;
