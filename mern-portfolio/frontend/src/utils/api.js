import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects API
export const fetchProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const fetchFeaturedProjects = async () => {
  const response = await api.get('/projects/featured');
  return response.data;
};

// Skills API
export const fetchSkills = async () => {
  const response = await api.get('/skills');
  return response.data;
};

// Contact API
export const submitContact = async (formData) => {
  const response = await api.post('/contact', formData);
  return response.data;
};

export default api;