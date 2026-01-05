import { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import ProjectManager from './ProjectManager';
import SkillManager from './SkillManager';
import ContactManager from './ContactManager';
import axios from 'axios';
import '../../styles/Admin.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    contacts: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [projects, skills, contacts] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/projects`),
        axios.get(`${import.meta.env.VITE_API_URL}/skills`),
        axios.get(`${import.meta.env.VITE_API_URL}/contact`)
      ]);

      setStats({
        projects: projects.data.count,
        skills: skills.data.count,
        contacts: contacts.data.count
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  return (
    <div className="admin-layout">
      <AdminNavbar />
      
      <div className="admin-container">
        <div className="admin-sidebar">
          <button
            className={`sidebar-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            🚀 Projects
          </button>
          <button
            className={`sidebar-btn ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            ⚡ Skills
          </button>
          <button
            className={`sidebar-btn ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            📧 Messages
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <h1 className="dashboard-title">Dashboard Overview</h1>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">🚀</div>
                  <div className="stat-info">
                    <h3>{stats.projects}</h3>
                    <p>Total Projects</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⚡</div>
                  <div className="stat-info">
                    <h3>{stats.skills}</h3>
                    <p>Total Skills</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📧</div>
                  <div className="stat-info">
                    <h3>{stats.contacts}</h3>
                    <p>Total Messages</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && <ProjectManager onUpdate={loadStats} />}
          {activeTab === 'skills' && <SkillManager onUpdate={loadStats} />}
          {activeTab === 'contacts' && <ContactManager onUpdate={loadStats} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;