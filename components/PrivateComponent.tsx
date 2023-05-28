import { Enum_RoleName } from '@prisma/client';
import { useUserData } from 'hooks/useUserData';
import React from 'react'
interface privateComponentProps{
  role: Enum_RoleName;
  children: React.ReactNode;
}
const PrivateComponent = ({role, children}:privateComponentProps) => {
  const {role:userRole } = useUserData();
  if (!userRole) return <></>;
  if (userRole!==role) return <></>;
  return <>{children}</>
}

export default PrivateComponent
