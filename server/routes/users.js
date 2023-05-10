import express from "express";

import {
    forgotPassword,
    resetPassword,
    setNewPassword,
    signIn,
    signUp,
    verifyUser,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signIn", auth, signIn);
router.post("/signUp", auth, signUp);
router.post("/verify-user", auth, verifyUser);
router.post("/forgot-password", auth, forgotPassword);
router.get("/password-reset/:id/:token", auth, resetPassword);
router.post("/password-reset/:id/:token", auth, setNewPassword);

export default router;
