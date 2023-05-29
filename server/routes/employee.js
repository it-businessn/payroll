import express from "express";
import {
    addEmployee,
    deleteEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    updateEmployeeBankDetails,
    updateEmployeeLeaveAttendanceDetails,
    updateEmployeePaymentDetails,
} from "../controllers/employee.js";

const router = express.Router();

router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.put("/payment/:id", updateEmployeePaymentDetails);
router.put("/bank/:id", updateEmployeeBankDetails);
router.put("/attendance/:id", updateEmployeeLeaveAttendanceDetails);
router.delete("/:id", deleteEmployee);

export default router;
