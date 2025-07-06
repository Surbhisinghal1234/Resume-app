import mongoose from 'mongoose';


const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  basicInfo: {
    name: String,
    email: String,
    mobile: String,
    location: String,
  },
  workExperience: [
    {
      company: String,
      position: String,
      startDate: String,
      endDate: String,
      description: String,
    }
  ],
  qualification: [
    {
      degree: String,
      institution: String,
      year: String,
    }
  ],
  certification: [
    {
      title: String,
      authority: String,
      year: String,
    }
  ],
  skills: {
    technical: [String],
    soft: [String],
  },
  others: {
    hobbies: [String],
    languages: [String],
  },
  theme: {
    type: String,
    default: 'theme1',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Resume', resumeSchema);
