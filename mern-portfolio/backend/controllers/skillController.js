import Skill from '../models/Skill.js';

export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ proficiency: -1 });
    res.json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({
      success: true,
      data: skill
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create skill',
      error: error.message
    });
  }
};

export const getSkillsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const skills = await Skill.find({ category }).sort({ proficiency: -1 });
    res.json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      data: skill
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update skill',
      error: error.message
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete skill',
      error: error.message
    });
  }
};