import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Components
import Navbar from './components/public/Navbar';
import Hero from './components/public/Hero';
import Services from './components/public/Services';
import Skills from './components/public/Skills';
import Projects from './components/public/Projects';
import Contact from './components/public/Contact';
import Footer from './components/public/Footer';

// Admin Components
import Login from './components/admin/Login';
import Register from './components/admin/Register';
import Dashboard from './components/admin/Dashboard';

import './styles/App.css';

// Public Layout Component
const PublicLayout = () => {
  return (
    <div className="App">
      <div className="floating-shapes">
        <div className="shape">Aynal</div>
        <div className="shape">Haque</div>
        <div className="shape">Milon</div>
      </div>
      <Navbar />
      <Hero />
      <Services />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/register" element={<Register />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Redirect */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;