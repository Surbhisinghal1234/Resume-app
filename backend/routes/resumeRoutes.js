import express from "express";
import { submitResume, deleteResume,  getUserResumes, updateResume } from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, submitResume);
router.get("/", protect, getUserResumes);


// Update resume by ID
router.put("/:id", protect, updateResume);

// Delete resume by ID
router.delete("/:id", protect, deleteResume);

export default router;
