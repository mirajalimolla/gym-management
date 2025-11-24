import { createContext, useContext, useState } from "react";

const LoadContext = createContext();
export const useLoader = () => useContext(LoadContext);

export default function LoaderProvider({children}){
    const [loading, setLoading] = useState(null);

    return (
        <LoadContext.Provider value={{loading, setLoading}}>
            {children}
        </LoadContext.Provider>
    )
}