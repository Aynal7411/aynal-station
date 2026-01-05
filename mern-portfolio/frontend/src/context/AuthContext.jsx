import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      loadAdmin();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadAdmin = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`);
      setAdmin(response.data.data);
    } catch (error) {
      console.error('Failed to load admin:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        name,
        email,
        password
      });
      
      const { token: newToken, ...adminData } = response.data.data;
      localStorage.setItem('adminToken', newToken);
      setToken(newToken);
      setAdmin(adminData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password
      });
      
      const { token: newToken, ...adminData } = response.data.data;
      localStorage.setItem('adminToken', newToken);
      setToken(newToken);
      setAdmin(adminData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    admin,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!admin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};