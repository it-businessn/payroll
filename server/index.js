import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import attendanceRoutes from "./routes/attendance.js";
import categoryRoutes from "./routes/category.js";
import payrollRoutes from "./routes/payroll.js";
import timeSheetRoutes from "./routes/timesheet.js";
import userOperationRoutes from "./routes/userOperation.js";
import userRoutes from "./routes/users.js";

const app = express();
app.set("view engine", "ejs");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/getCategory", categoryRoutes);
app.use("/userOperation", userOperationRoutes);
app.use("/leaveRequest", timeSheetRoutes);
app.use("/payroll", payrollRoutes);
app.use("/attendance", attendanceRoutes);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.DB_CONNECTION_URL_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server Running on Port: http://localhost:${PORT}`)
        )
    )
    .catch((error) => console.log(`${error} did not connect`));
