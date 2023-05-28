import { useUserData } from '@hooks/useUserData';
import { Enum_RoleName } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { Loading } from './Loading';
import { SingIn } from './SingIn';

interface PrivateRouteProps {
  role?: Enum_RoleName;
  children: React.ReactNode;
}

const PrivateRoute = ({ role, children }: PrivateRouteProps) => {
  const { status, loading, session, role: userRole } = useUserData();

  if (status === 'loading' || loading) return <Loading />;

  if (!session)
    return (
      <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
        <h1>
          Se requiere autenticación para acceder a esta ruta. Por favor, inicia
          sesión para continuar.
        </h1>
        <SingIn />
      </div>
    );

  if (!userRole || (role && role !== userRole))
    return (
      <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
        <h1>No tienes los permisos necesarios para acceder a esta ruta.</h1>
        <Link href='/inventarios'>Ir a la ruta Inventarios.</Link>
      </div>
    );

  return <>{children}</>;
};

export default PrivateRoute;
