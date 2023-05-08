import express from "express";

import auth from "../middleware/auth.js";
import { signIn, signUp } from "../controllers/user.js";

const router = express.Router();

router.post("/signIn", auth, signIn);
router.post("/signUp", auth, signUp);

export default router;
