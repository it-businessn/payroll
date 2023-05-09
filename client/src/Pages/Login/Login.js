import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import * as api from "../../api/index.js";
import FormikForm from "../../components/FormikForm.js";
import { LoginSchema } from "../../config/userSchema.js";
import Copyright from "../Copyright";
import "./Login.css";

export default function Login() {
    const initialValues = {
        email: "",
        password: "",
    };
    const formFields = [
        {
            field: "TextField",
            margin: "dense",
            fullWidth: true,
            id: "email",
            label: "Email Address",
            size: "medium",
            name: "email",
            type: "email",
            variant: "outlined",
            color: "primary",
        },
        {
            field: "TextField",
            margin: "dense",
            fullWidth: true,
            id: "password",
            label: "Password",
            size: "medium",
            name: "password",
            type: "password",
            variant: "outlined",
            color: "primary",
        },
        {
            field: "link",
            path: "/forgot-password",
            label: "Forgot password?",
        },
        {
            field: "submitButton",
        },
    ];
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            console.log("e");
            const userData = await api.signIn(values);
            const userDetails = userData?.data;
            const userToken = userData?.token;
            const profile = { userDetails, userToken };
            localStorage.setItem("profile", JSON.stringify(profile));

            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={6} className="signIn-cover" />
            <Grid
                item
                xs={12}
                sm={8}
                md={6}
                component={Paper}
                elevation={0}
                square
                className="login-grid"
            >
                <Box className="login-container">
                    <Box className="signIn-form">
                        <Typography variant="h6" gutterBottom>
                            Welcome Back!
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Start managing your finance faster and better
                        </Typography>
                        <FormikForm
                            submit={handleSubmit}
                            schema={LoginSchema}
                            initialValues={initialValues}
                            formFields={formFields}
                        ></FormikForm>
                    </Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: "center" }}
                    >
                        Don't have an account? &nbsp;
                        <Link to="/sign-up">Sign Up</Link>
                    </Typography>
                </Box>
                <Copyright sx={{ mt: 7 }} />
            </Grid>
        </Grid>
    );
}
