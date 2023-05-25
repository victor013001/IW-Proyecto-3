import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface MovimientosContextProps {
	openModalMovimientos: boolean;
	setOpenModalMovimientos: Dispatch<SetStateAction<boolean>>;
}

const MovimientosContext = createContext<MovimientosContextProps>(
  {} as MovimientosContextProps
);

export const useMovivientosContext = () => useContext(MovimientosContext);

interface MovimientosContextProviderProps {
	children: JSX.Element;
}

const MovimientosContextProvider = ({children}:MovimientosContextProviderProps) =>{
	const [openModalMovimientos, setOpenModalMovimientos] = useState<boolean>(false);

	return (
		<MovimientosContext.Provider 
			value={{openModalMovimientos, setOpenModalMovimientos}}
		>
			{children}
		</MovimientosContext.Provider>
	);
	
};

export {MovimientosContextProvider}