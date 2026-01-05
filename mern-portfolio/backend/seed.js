import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Project from './models/Project.js';
import Skill from './models/Skill.js';

dotenv.config();
connectDB();

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack MERN application with payment integration',
    icon: '🛒',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    featured: true
  },
  {
    title: 'Social Media Dashboard',
    description: 'Real-time analytics dashboard with data visualization',
    icon: '📊',
    technologies: ['React', 'Socket.io', 'Node.js'],
    featured: true
  }
];

const skills = [
  { name: 'React.js', icon: '⚛️', category: 'frontend', proficiency: 90 },
  { name: 'Node.js', icon: '📗', category: 'backend', proficiency: 85 },
  { name: 'MongoDB', icon: '🍃', category: 'database', proficiency: 88 },
  { name: 'Express.js', icon: '🚂', category: 'backend', proficiency: 87 },
  { name: 'JavaScript', icon: '📜', category: 'frontend', proficiency: 92 },
  { name: 'Python', icon: '🐍', category: 'backend', proficiency: 80 },
  { name: 'Docker', icon: '🐳', category: 'devops', proficiency: 75 }
];

const seedData = async () => {
  try {
    await Project.deleteMany();
    await Skill.deleteMany();

    await Project.insertMany(projects);
    await Skill.insertMany(skills);

    console.log('Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();