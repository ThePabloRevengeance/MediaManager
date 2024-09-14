import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'; // URL de la API

// Función para obtener todos los contenidos
const getAllContents = async () => {
  const response = await axios.get(`${API_URL}/contents`);
  return response.data;
};

export default {
  getAllContents,
};
