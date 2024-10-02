import React, { createContext, useState, useEffect} from 'react';
import {Amplify} from 'aws-amplify';
//import { Auth } from 'aws-amplify';
import { signUp, updateUserAttributes, deleteUser } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth'
import awsconfig from '../aws-exports';
import { fetchUsers as fetchUsersService } from '../services/authService';

Amplify.configure(awsconfig);

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const checkUserAuthentication = async () => {
            try{
                await fetchAuthSession.currentAuthenticatedUser();
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);  
            }
        };
        checkUserAuthentication();
    }, []);

    // Función para obtener todos los usuarios (de Cognito o donde se almacenen)
    const fetchUsers = async () => {
        try {
            const usersList = await fetchUsersService(); // Esto depende de cómo gestionas los usuarios en Cognito
            setUsers(usersList.Users); // Ajusta según el formato de los datos que recibes
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Función para agregar un usuario
    const addUser = async (newUser) => {
        try {
            await signUp({
                username: newUser.email,
                password: 'SomeRandomPassword123!', // Usa una contraseña más segura en producción
                attributes: {
                    email: newUser.email,
                    name: newUser.name,
                    'custom:role': newUser.role,
                },
            });
            fetchUsers(); // Actualizar la lista de usuarios después de agregar uno
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    // Función para actualizar un usuario
    const updateUser = async (user) => {
        try {
            // Aquí puedes usar Cognito Admin SDK o alguna función personalizada para actualizar
            // Por ejemplo, actualizar atributos del usuario
            await updateUserAttributes(user, {
                name: user.name,
                'custom:role': user.role,
            });
            fetchUsers(); // Actualizar la lista de usuarios
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Función para eliminar un usuario
    const deleteUser = async (userId) => {
        try {
            // Usa la función de Amplify/Cognito para eliminar un usuario
            await deleteUser(userId);
            fetchUsers(); // Actualizar la lista de usuarios después de eliminar
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    if (loading) {
        return <div>Cargando...</div>
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, users, fetchUsers, addUser, updateUser, deleteUser}}>
            {children}
        </AuthContext.Provider>
    )
}