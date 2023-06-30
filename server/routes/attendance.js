import express from "express";

import {
    addAttendanceLogs,
    getAttendanceLogs,
    updateAttendanceLog,
} from "../controllers/attendance.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAttendanceLogs);
router.post("/:id", auth, addAttendanceLogs);
router.put("/:id", auth, updateAttendanceLog);

export default router;
