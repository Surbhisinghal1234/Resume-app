import express from "express";
import { signupUser, loginUser,   } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupUser); 
router.post("/", loginUser); 



export default router;
