import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL   || 'http://localhost:3000' ;// process.env.REACT_APP_API_URL ; // URL de la API  
console.log('API_URL:', API_URL);  // Debería mostrar la URL

// Función para obtener todos los contenidos
export const getAllContents = async () => {
  const response = await axios.get(`${API_URL}/contents`);
  return Array.isArray(response.data) ? response.data : [];
};

export const getContentById = async (id) => {
  const response = await axios.get(`${API_URL}/contents/${id}`);
  return response.data;
};

export const createContent = async (newContent) => {
  const response = await axios.post(`${API_URL}/contents`, newContent);
  return response.data;
}

export const deleteContent = async (id) => {
  const response = await axios.delete(`${API_URL}/contents/${id}`);
  return response.data;
}

const contentService = {
  getAllContents,
  getContentById,
  createContent,
  deleteContent
};

export default contentService;
/*export default {
  getAllContents,
};*/
