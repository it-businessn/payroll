import express from "express";

import {
    forgotPassword,
    resetPassword,
    setNewPassword,
    signIn,
    signUp,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signIn", auth, signIn);
router.post("/signUp", auth, signUp);
router.post("/forgot-password", auth, forgotPassword);
router.get("/password-reset/:id/:token", resetPassword);
router.post("/password-reset/:id/:token", setNewPassword);

export default router;
