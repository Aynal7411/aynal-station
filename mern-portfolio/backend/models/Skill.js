import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    default: '⚡'
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'database', 'devops', 'other'],
    default: 'other'
  },
  proficiency: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  }
}, {
  timestamps: true
});

export default mongoose.model('Skill', skillSchema);