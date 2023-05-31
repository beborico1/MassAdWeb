import React from 'react';
import TextInputComponent from '../TextInputComponent';

const RegisterForm = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => {

    return (
      <div className="flex flex-col mb-5 w-full max-w-2xl items-center">

        <TextInputComponent
          placeholder="Correo electrónico"
          value={email}
          setValue={setEmail}
          type="email"
          required={true}
          autoComplete="email"
        />

        <TextInputComponent
          placeholder="Contraseña"
          value={password}
          setValue={setPassword}
          type="password"
          required={true}
          autoComplete="new-password"
        />

        <TextInputComponent
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          setValue={setConfirmPassword}
          type="password"
          required={true}
          autoComplete="new-password"
        />

      </div>
    );      
};

export default RegisterForm;
