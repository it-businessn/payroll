import express from "express";

import { addPayroll, getAllPayroll } from "../controllers/payroll.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllPayroll);
router.post("/", auth, addPayroll);

export default router;
