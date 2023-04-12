import { createContext, useState } from 'react';

const AuthContext = createContext();

export default AuthContext;


export const AuthProvider = ({children}) => { 

    // all global variables need to be here 
    let [isloggedin, setIsloggedin] = useState(false)
    let [isHost, setIsHost] = useState(false)
    let [properties, setProperties] = useState([])

    let contextData = {
        isloggedin: isloggedin,
        setIsloggedin: setIsloggedin,
        isHost: isHost,
        setIsHost: setIsHost,
        properties: properties,
        setProperties: setProperties,

    }


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
