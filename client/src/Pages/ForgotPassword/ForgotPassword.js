import { Button, CssBaseline, Grid, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import * as api from "../../api/index.js";
import FormikForm from "../../components/FormikForm.js";
import { ResetPasswordSchema } from "../../config/userSchema.js";
import Copyright from "../Copyright.js";
import "../Login/Login.css";
import {
    resetPasswordFormFields,
    resetPasswordInitialValues,
} from "./passwordResetFormFields.js";
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
            <Grid
                item
                xs={false}
                sm={4}
                md={6}
                className="signIn-cover password-cover"
            />
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
                        {!emailSentText && (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    Forgot Password?
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Enter your email address to receive a link
                                    to reset your password
                                </Typography>
                                <FormikForm
                                    formSubmit={handleSubmit}
                                    schema={ResetPasswordSchema}
                                    initialValues={resetPasswordInitialValues}
                                    formFields={resetPasswordFormFields}
                                />
                            </>
                        )}
                        {emailSentText && (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    Reset Complete!
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="text.success"
                                >
                                    {emailSentText}.
                                </Typography>
                                <Link to="/">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        size="medium"
                                        sx={{ mt: 1, mb: "2em" }}
                                    >
                                        Back to Login
                                    </Button>
                                </Link>
                            </>
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
