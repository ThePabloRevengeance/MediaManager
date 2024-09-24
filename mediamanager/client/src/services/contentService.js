import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'; // URL de la API

// Función para obtener todos los contenidos
export const getAllContents = async () => {
  const response = await axios.get(`${API_URL}/contents`);
  return Array.isArray(response.data) ? response.data : [];
};

export const getContentById = async (id) => {
  const response = await axios.get(`${API_URL}/contents/${id}`);
  return response.data;
};

const contentService = {
  getAllContents,
  getContentById
};

export default contentService;
/*export default {
  getAllContents,
};*/
