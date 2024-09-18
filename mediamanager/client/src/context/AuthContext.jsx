import React, { createContext, useState, useEffect} from 'react';
import { Amplify, Auth} from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserAuthentication = async () => {
            try{
                await Auth.currentAuthenticatedUser();
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);  
            }
        };

        checkUserAuthentication();
    }, []);

    if (loading) {
        return <div>Cargando...</div>
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}