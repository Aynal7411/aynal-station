import { useState, useEffect } from 'react';
import axios from 'axios';

const SkillManager = ({ onUpdate }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '⚡',
    category: 'frontend',
    proficiency: 50
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/skills`);
      setSkills(response.data.data);
    } catch (error) {
      console.error('Failed to load skills:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingSkill) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/skills/${editingSkill._id}`,
          formData
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/skills`, formData);
      }

      loadSkills();
      onUpdate();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to save skill:', error);
      alert(error.response?.data?.message || 'Failed to save skill');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      icon: skill.icon,
      category: skill.category,
      proficiency: skill.proficiency
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/skills/${id}`);
      loadSkills();
      onUpdate();
    } catch (error) {
      console.error('Failed to delete skill:', error);
      alert('Failed to delete skill');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      icon: '⚡',
      category: 'frontend',
      proficiency: 50
    });
    setEditingSkill(null);
  };

  return (
    <div className="manager-section">
      <div className="manager-header">
        <h2>Skills Management</h2>
        <button
          className="add-button"
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
        >
          {showForm ? '✕ Cancel' : '+ Add Skill'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Skill Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
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

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="devops">DevOps</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Proficiency ({formData.proficiency}%)</label>
              <input
                type="range"
                name="proficiency"
                min="0"
                max="100"
                value={formData.proficiency}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Saving...' : editingSkill ? 'Update Skill' : 'Add Skill'}
          </button>
        </form>
      )}

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Category</th>
              <th>Proficiency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill._id}>
                <td className="icon-cell">{skill.icon}</td>
                <td>{skill.name}</td>
                <td>
                  <span className={`category-badge ${skill.category}`}>
                    {skill.category}
                  </span>
                </td>
                <td>
                  <div className="proficiency-bar">
                    <div
                      className="proficiency-fill"
                      style={{ width: `${skill.proficiency}%` }}
                    >
                      {skill.proficiency}%
                    </div>
                  </div>
                </td>
                <td className="action-cell">
                  <button onClick={() => handleEdit(skill)} className="edit-btn">
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(skill._id)} className="delete-btn">
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

export default SkillManager;