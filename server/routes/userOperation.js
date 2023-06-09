import express from "express";
import {
    addUserPaymentDetails,
    deleteUser,
    updateUser,
    updateUserBankDetails,
    updateUserLeaveAttendanceDetails,
} from "../controllers/userOperation.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.put("/:id", auth, updateUser);
router.post("/payment/:id", auth, addUserPaymentDetails);
router.put("/bank/:id", auth, updateUserBankDetails);
router.put("/attendance/:id", auth, updateUserLeaveAttendanceDetails);
router.delete("/:id", auth, deleteUser);

export default router;
