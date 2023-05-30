import express from "express";
import {
    deleteUser,
    updateUser,
    updateUserBankDetails,
    updateUserLeaveAttendanceDetails,
    updateUserPaymentDetails,
} from "../controllers/userOperation.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.put("/:id", auth, updateUser);
router.put("/payment/:id", auth, updateUserPaymentDetails);
router.put("/bank/:id", auth, updateUserBankDetails);
router.put("/attendance/:id", auth, updateUserLeaveAttendanceDetails);
router.delete("/:id", auth, deleteUser);

export default router;
