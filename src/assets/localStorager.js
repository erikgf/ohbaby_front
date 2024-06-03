const SESSION_NAME = import.meta.env.VITE_SESSION_NAME

export const loadStorage = ()=>{
    try {
        const data  = window.localStorage.getItem(SESSION_NAME);
        if ( data === null){
            return data;
        }
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
};

export const saveStorage = ( data )=>{
    try {
        if (data === null){
            window.localStorage.removeItem(SESSION_NAME);
            return;
        }
        const stringifiedData = JSON.stringify(data);
        window.localStorage.setItem(SESSION_NAME, stringifiedData);
    } catch (error) {
       console.error(error);
    }
};