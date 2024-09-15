import React, {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminPanel = () => {
    const { isAuthenticated } = useContext(AuthContext);

    if(!isAuthenticated) {
        return <div>No tienes acceso a este panel</div>
    }

    return (
        <div>
            <h1>Panel de Administracion</h1>
        </div>
    );
};

export default AdminPanel;