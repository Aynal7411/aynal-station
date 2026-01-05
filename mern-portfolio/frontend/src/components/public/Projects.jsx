import { useState, useEffect } from 'react';
import { fetchProjects } from '../../utils/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetchProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error loading projects:', error);
      // Fallback to default projects
      setProjects([
        {
          title: 'E-Commerce Platform',
          description: 'Full-stack MERN application with payment integration, cart management, and admin dashboard.',
          icon: '🛒',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express']
        },
        {
          title: 'Social Media Dashboard',
          description: 'Real-time social media analytics dashboard with data visualization and user engagement metrics.',
          icon: '📊',
          technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB']
        },
        {
          title: 'Task Management App',
          description: 'Collaborative task management system with real-time updates, team collaboration, and notifications.',
          icon: '✅',
          technologies: ['React', 'Express', 'MongoDB', 'Redux']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title">Featured Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <div className="project-image">{project.icon}</div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.technologies && (
                <div className="project-tech">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;