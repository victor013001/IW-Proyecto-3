import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface MaterialesContextProps {
	openModalMateriales: boolean;
	setOpenModalMateriales: Dispatch<SetStateAction<boolean>>;
}

const MaterialesContext = createContext<MaterialesContextProps>(
  {} as MaterialesContextProps
);

export const useMaterialsContext = () => useContext(MaterialesContext);

interface MaterialesContextProviderProps {
	children: JSX.Element;
}

const MaterialesContextProvider = ({children}:MaterialesContextProviderProps) =>{
	const [openModalMateriales, setOpenModalMateriales] = useState<boolean>(false);

	return (
		<MaterialesContext.Provider 
			value={{openModalMateriales, setOpenModalMateriales}}
		>
			{children}
		</MaterialesContext.Provider>
	);
	
};

export {MaterialesContextProvider}