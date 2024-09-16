import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../context/ContentContext';
import '../styles/ContentPage.css';

const ContentPage = () => {
    const { contents, loading } = useContext(ContentContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const filteredContents = contents.filter(content => {
        const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || content.type === filterType;
        return matchesSearch && matchesFilter;
    });

    if(loading) {
        return <div>Cargando contenido...</div>
    }

    return(
        <div className='content-page'>
            <h1>Libreria de contenido</h1>

            <input
            type="text"
            placeholder="Buscando contenido..."
            value={searchTerm}
            onCharge={(e) => setSearchTerm(e.target.value)}
            className='search-input' 
            />

            <div className='filters'>
                <label>Filtro por Tipo:</label>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="all">Todo</option>
                    <option value="image">Imagenes</option>
                    <option value="video">Videos</option>
                    <option value="document">Documentos</option>
                </select>
            </div>

            <div className='content-grid'>
                {filteredContents.length > 0 ? (
                    filteredContents.map((content) => (
                        <div key={content.id} className='content-item'>
                            <Link to={`/content/${content.id}`}>
                                {content.type === 'image' && <img src={content.url} alt={content.title} />}
                                {content.type === 'video' && <div className='video-thumbnail'>Video</div>}
                                {content.type === 'document' && <div className='document-thumbnail'>Document</div>}
                                <h3>{content.title}</h3>
                            </Link>
                        </div>    
                    ))
                ) : (
                    <p>Contenido no encontrado</p>
                )}
            </div>
        </div>
    );
};

export default ContentPage;