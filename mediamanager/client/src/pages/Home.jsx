import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Contexto de autenticación
import Gallery from '../components/Gallery'; // Componente de galería
import contentService from '../services/contentService'; // Servicio para obtener los contenidos
import './Home.css'; // Estilos específicos para esta página

const Home = () => {
  // Estado para almacenar los contenidos multimedia
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Obtener información del usuario autenticado desde el contexto
  const { user, isAuthenticated } = useContext(AuthContext);

  // Función para cargar el contenido multimedia al montar el componente
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const data = await contentService.getAllContents(); // Llama al servicio para obtener todos los contenidos
        setContents(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el contenido multimedia');
        setLoading(false);
      }
    };
    fetchContents();
  }, []);

  return (
    <div className="home-container">
      {/* Bienvenida y navegación */}
      <header className="home-header">
        <h1>Bienvenido a la Plataforma de Gestión de Contenidos Multimedia</h1>
        <nav>
          <ul>
            {/* Si el usuario está autenticado y tiene rol de administrador, mostrar enlace al panel de administración */}
            {isAuthenticated && user?.role === 'admin' && (
              <li>
                <Link to="/admin">Panel de Administración</Link>
              </li>
            )}
            {/* Enlace al registro si no está autenticado */}
            {!isAuthenticated && (
              <li>
                <Link to="/register">Registrarse</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* Mostrar mensaje de error si ocurre algún problema */}
      {error && <p className="error-message">{error}</p>}

      {/* Mostrar la galería de contenidos multimedia */}
      <section className="gallery-section">
        {loading ? (
          <p>Cargando contenidos...</p>
        ) : (
          <Gallery contents={contents} />
        )}
      </section>

      {/* Pie de página */}
      <footer className="home-footer">
        <p>© 2024 Plataforma de Contenidos Multimedia</p>
      </footer>
    </div>
  );
};

export default Home;
