import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

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
