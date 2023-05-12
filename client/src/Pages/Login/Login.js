import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../api/index.js";
import FormikForm from "../../components/FormikForm.js";
import { LoginSchema } from "../../config/userSchema.js";
import Copyright from "../Copyright";
import "./Login.css";
import { loginFormFields, loginInitialValues } from "./loginFormFields.js";

export default function Login() {
    const [hasError, setError] = React.useState("");

    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            const userData = await api.signIn(values);
            const userDetails = userData?.data;
            const userToken = userData?.token;
            const profile = { userDetails, userToken };
            localStorage.setItem("profile", JSON.stringify(profile));
            userData.active ? navigate("/home") : navigate("/verify-email");
        } catch (error) {
            setError(error.response.data.error);
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
                            formSubmit={handleSubmit}
                            schema={LoginSchema}
                            initialValues={loginInitialValues}
                            formFields={loginFormFields}
                        />
                        {hasError && (
                            <Typography variant="subtitle2" color="red">
                                {hasError}
                            </Typography>
                        )}
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
