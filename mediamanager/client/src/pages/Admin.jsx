import React, {useState, useContext} from 'react';
import AdminPanel from '../components/AdminPanel'
//import { ContentContext } from '../context/ContentContext';
//import '../styles/Admin.css';

const Admin = () => {
    //const { contents, addContent, updateContent, deleteContent } = useContext(ContentContext);

    return(
        <div className='admin-page'>
            <h1>Panel de Admin</h1>
            <AdminPanel />
        </div>
    );
};

export default Admin;