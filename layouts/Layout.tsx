import React from 'react'

interface LayoutProps {
    children: JSX.Element
}


const Layout = ({children}: LayoutProps) => {
  return (
    <main className='flex h-screen w-full'>
        <aside className='debug w-96 flex flex-col justify-between px-3 py-5'> 
            <div className='flex flex-col gap-4'>
                <div>Perfil</div> 
                <div>
                    <div>Inventarios</div>
                    <div>Materiales</div>
                    <div>Usuarios</div>  
                </div>
                
            </div>
            <div>Log out</div>
        </aside>
        <section className='w-full h-full flex'>
            {children}
        </section>
    </main>
  )
}

export default Layout