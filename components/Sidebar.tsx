import { signOut } from "next-auth/react"
import PrivateComponent from "./PrivateComponent"

const Sidebar = () => {
  return (
    <aside className="flex flex-col h-screen w-72 bg-color-sidebar justify-between">
        <div className='flex flex-col gap-2'>
        <div className='flex justify-center m-5 rounded-full h-48 w-48 self-center items-stretch'>
          <img className="object-fill rounded-full" src='media/bg.jpg' alt='logo' />
        </div>
        <nav>
          <ul className='flex flex-col gap-2'>
            <li className="bg-buttom-sidebar m-4 p-4 rounded-lg font-semibold text-xl hover:cursor-pointer hover:bg-buttom-hover-sidebar">Inventarios</li>
            <li className="bg-buttom-sidebar m-4 p-4 rounded-lg font-semibold text-xl hover:cursor-pointer hover:bg-buttom-hover-sidebar">Materiales</li>
            <PrivateComponent role='ADMIN'>        
            <li className="bg-buttom-sidebar m-4 p-4 rounded-lg font-semibold text-xl hover:cursor-pointer hover:bg-buttom-hover-sidebar">Usuarios</li>
          </PrivateComponent>   
          </ul>
        </nav>
      </div> 
        <button className="m-4 p-2 rounded-lg font-semibold text-xl hover:cursor-pointer bg-buttom-logout-sidebar hover:bg-buttom-logout-hover-sidebar" type='button' onClick={() => signOut()}>
            Log out
        </button>
    </aside>
  )
}

export {Sidebar}
