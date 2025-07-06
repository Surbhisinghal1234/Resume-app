import Resume from "../models/Resume.js";

export const submitResume = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const {
      basicInfo,
      workExperience,
      qualification,
      certification,
      skills,
      others,
      theme,
    } = req.body;

    const resume = new Resume({
      userId: req.user._id,
      basicInfo,
      workExperience,
      qualification,
      certification,
      skills,
      others,
      theme,
    });

    await resume.save();

    res.status(201).json({
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    console.error("Submit resume error:", error.message);
    res.status(500).json({ error: error.message || "Failed to create resume" });
  }
};

export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to fetch resumes" });
  }
};

// GET /api/resume/:id
export const getSingleResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: "Failed to get resume" });
  }
};

// PUT /api/resume/:id
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: "Failed to update resume" });
  }
};

// DELETE /api/resume/:id
export const deleteResume = async (req, res) => {
  try {
      console.log("REQ.USER:", req.user._id);
    console.log("PARAM ID:", req.params.id);
    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.json({ message: "Resume deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete resume" });
  }
};
