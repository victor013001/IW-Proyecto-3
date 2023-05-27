import GestionMateriales from '@components/GestionMateriales'
import { MaterialesContextProvider } from '@context/materialesContext'
import Layout from '@layouts/Layout'
import React from 'react'

const materiales = () => {
  return (
    <MaterialesContextProvider>
        <GestionMateriales/>
    </MaterialesContextProvider>
  )
}

export default materiales
