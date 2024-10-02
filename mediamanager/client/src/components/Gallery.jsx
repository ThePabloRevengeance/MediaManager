import React from 'react';
import { Link } from 'react-router-dom';

const Gallery = ({ contents }) => {
    if (!Array.isArray(contents)) {
        return <p>Error: Los contenidos no están disponibles.</p>;
    }
    
    return (
        <div className='gallery'>
            {contents.length === 0 ? (
                <p>No hay contenido disponible</p>
            ) : (
                contents.map(content => (
                    <div key={content.id} className="gallery-item">
                        <h3>{content.title}</h3>
                        <Link to={`/content/${content.id}`}>
                            <img src={content.imageUrl} alt={content.title} />
                        </Link>
                    </div>
                ))
            )}
        </div>
    )
}

export default Gallery;