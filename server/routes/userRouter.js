import { Router } from "express";
import { getProfile } from "../controllers/userController.js";
import userAuth from "../middlewares/authMiddleware.js";
const router = Router();

router.get("/getProfile", userAuth ,getProfile);

export default router;