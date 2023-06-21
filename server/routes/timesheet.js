import express from "express";

import {
    getAllLeaveDetails,
    raiseLeaveRequest,
    updateLeaveRequest,
} from "../controllers/timesheet.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllLeaveDetails);
router.post("/:id", auth, raiseLeaveRequest);
router.put("/:id", auth, updateLeaveRequest);

export default router;
