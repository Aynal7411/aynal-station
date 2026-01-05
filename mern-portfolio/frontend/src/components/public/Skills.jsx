import { useState, useEffect } from 'react';
import { fetchSkills } from '../../utils/api';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await fetchSkills();
      setSkills(response.data);
    } catch (error) {
      console.error('Error loading skills:', error);
      // Fallback to default skills if API fails
      setSkills([
        { name: 'React.js', icon: '⚛️', category: 'frontend' },
        { name: 'Node.js', icon: '📗', category: 'backend' },
        { name: 'MongoDB', icon: '🍃', category: 'database' },
        { name: 'Express.js', icon: '🚂', category: 'backend' },
        { name: 'JavaScript', icon: '📜', category: 'frontend' },
        { name: 'Python', icon: '🐍', category: 'backend' },
        { name: 'PostgreSQL', icon: '🐘', category: 'database' },
        { name: 'Docker', icon: '🐳', category: 'devops' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading skills...</div>;
  }

  return (
    <section className="skills-section" id="skills">
      <h2 className="section-title">Technical Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-item" key={index}>
            <div className="skill-icon">{skill.icon}</div>
            <div className="skill-name">{skill.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;