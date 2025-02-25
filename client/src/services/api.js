import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:3001', // La URL base de JSON Server
  timeout: 5000, // Tiempo máximo de espera (opcional)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener usuarios con paginación y filtro de estado
export const getUsers = async (params = {}) => {
  try {
    const response = await api.get('/users', {
      params: { ...params }, // Pasar los parámetros de búsqueda, límite, inicio, etc.
    });
    return response.data; // Devuelve los datos
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Agregar un usuario
export const addUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data; // Devuelve los datos del usuario agregado
  } catch (error) {
    console.error('Error al agregar el usuario:', error);
    throw error;
  }
};

// Función para eliminar un usuario
export const deleteUser = async (userId) => {
  try {
    await api.delete(`/users/${userId}`); // Realiza la solicitud DELETE
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Actualizar un usuario
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

export default api;
