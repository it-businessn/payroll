import express from "express";

import { getCategoryByMonth } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getCategoryByMonth);

export default router;
