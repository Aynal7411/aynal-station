import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminNavbar = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-content">
        <div className="admin-logo">
          <span className="admin-icon">⚡</span>
          Admin Dashboard
        </div>
        <div className="admin-nav-right">
          <span className="admin-name">👤 {admin?.name}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;