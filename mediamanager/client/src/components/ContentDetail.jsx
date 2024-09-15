import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { ContentContext } from '../context/ContentContext';
//import '../styles/ContentDetail.css';

const ContentDetail = () => {
    const { id } = useParams();
    const { fetchContentById } = useContext(ContentContext);
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            const fetchedContent = await fetchContentById(id);
            setContent(fetchContent);
            setLoading(false);
        };

        fetchContent();
    }, [id, fetchContentById]);

    if(loading) {
        return <div>Cargando...</div>
    }

    if(!content) {
        return <div>Contentido no encontrado</div>
    }

    const {title, description, type, createdAt, url} = content;

    return(
        <div className='content-detail'>
            <h2>{title}</h2>
            <p>{description}</p>
            <p><strong>Type:</strong> {type} </p>
            <p><strong>Uploaded on: </strong> {new Date(createdAt).toLocaleDateString()}</p>

            {type === 'image' && <img src={url} alt={title} className='content-image' />}
            {type === 'video' && (
                <video controls className='content-video'>
                    <source src={url} type="video/mp4" />
                    Tu navegador no soporta la etiqueta "video"
                </video>
            )}
            {type === 'document' && (
                <a href={url} target="_blank" rel="noopener noreferrer" className='content-link'>
                    Descargar Documento
                </a>
            )}
        </div>
    );
};

export default ContentDetail;
