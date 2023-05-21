import React from 'react';
import '../../helpers/estilos/RegisterForm.css'

const RegisterForm = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => {

    return (
      <div className="register-form-container">
        <input
          className="register-input"
          placeholder='Correo electrónico'
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoCapitalize="none"
          autoComplete="email"
          type="email"
        />
     
        <input
          className="register-input"
          placeholder='Contraseña'
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
     
        <input
          className="register-input"
          placeholder='Confirmar contraseña'
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>
    );      
};

export default RegisterForm;
