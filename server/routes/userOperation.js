import express from "express";
import {
    addUserPaymentDetails,
    deleteUser,
    updateUser,
    updateUserBankDetails,
} from "../controllers/userOperation.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.put("/:id", auth, updateUser);
router.post("/payment/:id", auth, addUserPaymentDetails);
router.put("/bank/:id", auth, updateUserBankDetails);
router.delete("/:id", auth, deleteUser);

export default router;
