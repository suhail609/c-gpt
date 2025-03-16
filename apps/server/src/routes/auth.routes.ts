import express from "express";
import { registerUser, loginUser } from "../services/auth.service";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const token = await registerUser(username, email, password);
    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
