import GestionMateriales from '@components/GestionMateriales'
import { MaterialesContextProvider } from '@context/materialesContext'
import Layout from '@layouts/Layout'
import Head from 'next/head'
import React from 'react'

const materiales = () => {
  return (
    <>
      <Head>
        <title>Materiales</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
      <MaterialesContextProvider>
        <GestionMateriales/>
      </MaterialesContextProvider>  
      </Layout>
    </>
  )
}

export default materiales
