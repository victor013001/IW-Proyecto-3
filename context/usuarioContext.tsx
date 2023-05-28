import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface UsuarioContextProps {
	openModalUsuario: boolean;
	setOpenModalUsuario: Dispatch<SetStateAction<boolean>>;
}

const UsuarioContext = createContext<UsuarioContextProps>(
  {} as UsuarioContextProps
);

export const useUsuarioContext = () => useContext(UsuarioContext);

interface UsuarioContextProviderProps {
	children: JSX.Element;
}

const UsuarioContextProvider = ({children}:UsuarioContextProviderProps) =>{
	const [openModalUsuario, setOpenModalUsuario] = useState<boolean>(false);

	return (
		<UsuarioContext.Provider 
			value={{openModalUsuario, setOpenModalUsuario}}
		>
			{children}
		</UsuarioContext.Provider>
	);
	
};

export {UsuarioContextProvider}