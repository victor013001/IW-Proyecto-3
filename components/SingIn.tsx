import React from 'react';
import { signIn } from 'next-auth/react';

const SingIn = () => (
  <button
    onClick={() => signIn('auth0')}
    className='bg-color-background-buttom p-2  text-white font-semibold rounded-md hover:cursor-pointer hover:scale-105'
  >
    Iniciar Sesión
  </button>
);

export { SingIn };
