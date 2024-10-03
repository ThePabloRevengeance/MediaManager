import React, {useContext, useState, useEffect} from 'react';
import { ContentContext } from '../context/ContentContext';
import { AuthContext } from '../context/AuthContext';
import contentService from '../services/contentService';
import '../styles/AdminPanel.css'
//import { AuthContext } from '../context/AuthContext';

const AdminPanel = () => {
    const { contents, fetchContents } = useContext(ContentContext);
    const { users, fetchUsers, addUser, updateUser, deleteUser} = useContext(AuthContext);

    const [newContent, setNewContent] = useState({
        title: '',
        description: '',
        url: '',
    });
    const [selectedContent, setSelectedContent] = useState(null);

    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchContents();
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        setNewContent({ ...newContent, [e.target.name]: e.target.value });
    };

    const handleCreateContent = async () => {
        try{
            await contentService.createContent(newContent);
            fetchContents(); //Recargar contenidos
            setNewContent({ title: '', description: '', url: ''});
        } catch (error) {
            console.error('Error al crear contenido:', error);
        }
    };

    const handleDeleteContent = async(id) => {
        try{
            await contentService.deleteContent(id);
            fetchContents();
        } catch (error) {
            console.error('Error al eliminar contenido:', error);
        }
    };

    const handleSelectContent = (content) => {
        setSelectedContent(content);
    };

    const handleUpdateContent = async () => {
        try{
            if(selectedContent) {
                await contentService.updateContent(selectedContent.id, selectedContent);
                fetchContents();
                setSelectedContent(null); //Deseleccionar el contenido
            }
        } catch (error) {
            console.error('Error al actualizar contenido:', error);
        }
    };

    //Users Handlers
    const handledAddUser = (e) => {
        e.preventDefault();
        addUser(newUser);
        setNewUser({ name: '', email: '', role: 'user' });
    };

    const handleEditUser = (e) => {
        e.preventDefault();
        updateUser(selectedUser);
        setSelectedUser(null);
    };

    return(
        <div className="admin-panel">
            <h2>Panel de Administración</h2>

            <div className="content-management">
                <h3>Crear nuevo contenido</h3>
                <input 
                    type="text"
                    name="title"
                    placeholder="Titulo"
                    value={newContent.title}
                    onChange={handleInputChange}
                />
                <input 
                    type="text"
                    name="description"
                    placeholder="Descripcion"
                    value={newContent.description}
                    onChange={handleInputChange}
                />
                <input 
                    type="text"
                    name="url"
                    placeholder="URL del contenido"
                    value={newContent.url}
                    onChange={handleInputChange}
                />
                <button onClick={handleCreateContent}>Crear</button>
            

           
                <h3>Lista de contenidos</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Titulo</th>
                            <th>Descripcion</th>
                            <th>Link</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contents && contents.length > 0 ? (
                            contents.map((content) => (
                            <tr key={content.id}>
                                <td>{content.id}</td>
                                <td>{content.title}</td>
                                <td>{content.description}</td>
                                <td><a>{content.fileUrl}</a></td>
                                <td>
                                    <button onClick={() => handleSelectContent(content)}>
                                        Editar
                                    </button>
                                    <button onClick={() => handleDeleteContent(content.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No hay contenidos disponibles</td>
                        </tr>
                    )
                    }
                    </tbody>
                </table>
            

                {selectedContent && (
                    <div className="edit-content-form">
                        <h3>Editar contenido</h3>
                        <input
                            type="text"
                            name="title"
                            placeholder="Título"
                            value={selectedContent.title}
                            onChange={(e) => 
                                setSelectedContent({ ...selectedContent, title: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Descripcion"
                            value={selectedContent.description}
                            onChange={(e) => 
                                setSelectedContent({ ...selectedContent, description: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            name="url"
                            placeholder="URL del contenido"
                            value={selectedContent.url}
                            onChange={(e) => 
                                setSelectedContent({ ...selectedContent, url: e.target.value })
                            }
                        />
                        <button onClick={handleUpdateContent}>Guardar cambios</button>
                        <button onClick={() => setSelectedContent(null)}>Cancelar</button>
                    </div>
                 )}
            </div>

            <div className="user-management">
                <h2>Administrar Usuarios</h2>
                <form onSubmit={handledAddUser}>
                    <input 
                        type="text"
                        placeholder="Nombre"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <input 
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                        <option value="user">Usuario</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Añadir Usuario</button>
                </form>

                <h3>Lista de usuarios</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 ? (
                            users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => setSelectedUser(user)}>Editar</button>
                                    <button onClick={() => deleteUser(user.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="4">No hay contenidos disponibles</td>
                        </tr>
                    )
                    }
                    </tbody>
                </table>

                {selectedUser && (
                    <form onSubmit={handleEditUser}>
                        <h3>Editar Usuario</h3>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={selectedUser.name}
                            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={selectedUser.email}
                            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                        />
                        <select
                            value={selectedUser.role}
                            onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                        >
                            <option value="user">Usuario</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button type="submit">Guardar cambios</button>
                        <button onClick={() => setSelectedUser(null)}>Cancelar</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
/*
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

*/
