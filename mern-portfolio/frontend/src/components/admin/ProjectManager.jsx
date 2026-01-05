import { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectManager = ({ onUpdate }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '🚀',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    featured: false
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
      setProjects(response.data.data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim())
      };

      if (editingProject) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/projects/${editingProject._id}`,
          projectData
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/projects`, projectData);
      }

      loadProjects();
      onUpdate();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to save project:', error);
      alert(error.response?.data?.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      icon: project.icon,
      technologies: project.technologies?.join(', ') || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      featured: project.featured
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${id}`);
      loadProjects();
      onUpdate();
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: '🚀',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      featured: false
    });
    setEditingProject(null);
  };

  return (
    <div className="manager-section">
      <div className="manager-header">
        <h2>Projects Management</h2>
        <button
          className="add-button"
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
        >
          {showForm ? '✕ Cancel' : '+ Add Project'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Icon (Emoji)</label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                maxLength={2}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>Technologies (comma separated)</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>GitHub URL</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Live URL</label>
              <input
                type="url"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              Featured Project
            </label>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Saving...' : editingProject ? 'Update Project' : 'Add Project'}
          </button>
        </form>
      )}

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Title</th>
              <th>Technologies</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="icon-cell">{project.icon}</td>
                <td>{project.title}</td>
                <td>
                  {project.technologies?.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </td>
                <td>{project.featured ? '⭐ Yes' : 'No'}</td>
                <td className="action-cell">
                  <button onClick={() => handleEdit(project)} className="edit-btn">
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(project._id)} className="delete-btn">
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectManager;