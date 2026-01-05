import express from 'express';
import {
  getAllSkills,
  createSkill,
  getSkillsByCategory,
  updateSkill,
  deleteSkill
} from '../controllers/skillController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllSkills);
router.post('/', protect, createSkill);
router.get('/category/:category', getSkillsByCategory);
router.put('/:id', protect, updateSkill);
router.delete('/:id', protect, deleteSkill);

export default router;