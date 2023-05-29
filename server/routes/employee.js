import express from "express";
import {
    addEmployee,
    deleteEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
} from "../controllers/employee.js";

const router = express.Router();

router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
