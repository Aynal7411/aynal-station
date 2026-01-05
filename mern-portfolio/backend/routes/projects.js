import express from 'express';
import {
  getAllProjects,
  getFeaturedProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/featured', getFeaturedProjects);
router.post('/', protect, createProject);
router.get('/:id', getProjectById);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;