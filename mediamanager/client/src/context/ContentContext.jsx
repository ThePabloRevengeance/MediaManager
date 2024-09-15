import React, { createContext, useState, useEffect } from 'react';
import { getAllContents, getContentById } from '../services/contentService';

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContents = async () => {
            const data = await getAllContents();
            setContents(data);
            setLoading(false);
        };
        fetchContents();
    }, []);

    const fetchContentById = async(id) => {
        return await getContentById(id);
    };

    return (
        <ContentContext.Provider value = {{ contents, loading, fetchContentById}}>
            {children}
        </ContentContext.Provider>
    )
}