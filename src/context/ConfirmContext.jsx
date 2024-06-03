import { createContext, useState } from "react";
const ConfirmContext = createContext({});

export function ConfirmContextProvider ({children}){
    const [showing, setShowing] = useState(false);
    
    return  <ConfirmContext.Provider value={{showing, setShowing}}>
                {children}
            </ConfirmContext.Provider>
}

export default ConfirmContext;
