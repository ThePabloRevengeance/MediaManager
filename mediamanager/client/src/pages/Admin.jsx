import React, {useState, useContext} from 'react';
import { ContentContext } from '../context/ContentContext';
import { AuthContext } from '../context/AuthContext';
import '../styles/Admin.css';

const Admin = () => {
    const { contents, addContent, updateContent, deleteContent } = useContext(ContentContext);
    const { users, addUser, updateUser, deleteUser} = useContext(AuthContext);

    const [newContent, setNewContent] = useState({ title: '', type: 'image', url: '' });
    const [selectedContent, setSelectedContent] = useState(null);

    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
    const [selectedUser, setSelectedUser] = useState(null);

    const handleAddContent = (e) => {
        e.preventDefault();
        addContent(newContent);
        setNewContent({ title: '', type: 'image', url: '' });
    };

    const handleEditContent = (e) => {
        e.preventDefault();
        updateContent(selectedContent);
        setSelectedContent(null);
    };

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
        <div className='admin-page'>
            <h1>Panel de Admin</h1>

            <section className='content-management'>
                <h2>Administrar contenidos</h2>
                <form onSubmit={handleAddContent}>
                    <input
                        type="text"
                        placeholder='Title'
                        value={newContent.title}
                        onChange={(e) => setNewContent({ ...newContent, title: e.target.value })} 
                    />
                    <select
                        value={newContent.type}
                        onChange={(e) => setNewContent({ ...newContent, title: e.target.value})}
                    >
                       <option value="image">Imagen</option>
                       <option value="video">Video</option> 
                       <option value="document">Documento</option>
                    </select>
                    <input
                        type="text"
                        placeholder='URL'
                        value={newContent.url}
                        onChange={(e) => setNewContent({ ...newContent, url: e.target.value })}
                    />
                    <button type="submit">Añadir Contenido</button>
                </form>
                <div className='content-list'>
                    {contents.map((content) => (
                        <div key={content.id} className='content-item'>
                            <h3>{content.title}</h3>
                            <p>Type: {content.type}</p>
                            <button onClick={() => setSelectedContent(content)}>Editar</button>
                            <button onClick={() => deleteContent(content.id)}>Borrar</button>
                        </div>
                    ))}
                </div>

                {selectedContent && (
                    <form onSubmit={handleEditContent}>
                        <h3>Editar Contenido</h3>
                        <input 
                            type="text"
                            placeholder="Title"
                            value={selectedContent.title}
                            onChange={(e) => setSelectedContent({ ...selectedContent, title: e.target.value })}
                        />
                        <selected
                            value={selectedContent.type}
                            onChange={(e) => setSelectedContent({ ...selectedContent, type: e.target.value})}
                        >
                            <option value="image">Imagen</option>
                            <option value="video">Video</option> 
                            <option value="document">Documento</option>
                        </selected>
                        <input
                        type="text"
                        placeholder='URL'
                        value={selectedContent.url}
                        onChange={(e) => setSelectedContent({ ...selectedContent, url: e.target.value })}
                        />
                        <button type="submit">Actualizar Contenido</button>
                    </form>
                )}
            </section>

            <section className="user-management">
                <h2>Administrar Usuarios</h2>
                <form onSubmit={handledAddUser}>
                    <input 
                        type="text"
                        placeholder="Name"
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

                <div className="user-list">
                    {users.map((user) => (
                        <div key={user.id} className="user-item">
                            <h3>{user.name}</h3>
                            <p>Email: {user.email}</p>
                            <p>Role: {user.role}</p>
                            <button onClick={() => setSelectedUser(user)}>Editar</button>
                            <button onClick={() => deleteUser(user.id)}>Borrar</button>
                        </div>
                    ))}
                </div>

                {selectedUser && (
                    <form onSubmit={handleEditUser}>
                        <h3>Editar Usuario</h3>
                        <input
                            type="text"
                            placeholder="Name"
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
                        <button type="submit">Actualizar Usuario</button>
                    </form>
                )}
            </section>
        </div>
    );
};

export default Admin;