import { CssBaseline, Grid, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import * as api from "../../api/index.js";
import FormikForm from "../../components/FormikForm.js";
import { ResetPasswordSchema } from "../../config/userSchema.js";
import Copyright from "../Copyright.js";
import {
    resetPasswordFormFields,
    resetPasswordInitialValues,
} from "./passwordResetFormFields.js";
import "../Login/Login.css";
export default function ForgotPassword() {
    const [hasError, setErrorMessage] = React.useState("");
    const [emailSentText, setEmailSentText] = React.useState("");
    const handleSubmit = async (values) => {
        try {
            const response = await api.forgotPassword(values);
            setEmailSentText(response.data.message);
            setErrorMessage("");
        } catch (error) {
            setEmailSentText("");
            setErrorMessage(error.response.data.error);
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
                            Reset Your Password
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Enter your email address to receive a reset link
                        </Typography>
                        <FormikForm
                            formSubmit={handleSubmit}
                            schema={ResetPasswordSchema}
                            initialValues={resetPasswordInitialValues}
                            formFields={resetPasswordFormFields}
                        />
                        {emailSentText && (
                            <Typography variant="subtitle2" color="green">
                                {emailSentText}
                            </Typography>
                        )}
                        {hasError && (
                            <Typography variant="subtitle2" color="red">
                                {hasError}
                            </Typography>
                        )}
                    </Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: "center", mt: 2 }}
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
