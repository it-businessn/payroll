import { CssBaseline, Grid, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../api/index.js";
import FormikForm from "../../components/FormikForm.js";
import Copyright from "../Copyright.js";
import "../Login/Login.css";
import { otpPasswordFormFields } from "./passwordResetFormFields.js";
export default function VerifyEmail() {
    const [user, setUser] = React.useState(
        JSON.parse(localStorage.getItem("profile") || "")
    );
    const userEmail = user.userDetails.data[1].email;
    const resetPasswordInitialValues = {
        email: userEmail,
        otp: "",
    };
    const [hasError, setErrorMessage] = React.useState("");
    const [emailSentText, setEmailSentText] = React.useState("");
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            values.otp = values.text;
            const response = await api.verifyUser(values);
            if (response.user[0] === true) {
                setEmailSentText("Email verified successfully");
            } else {
                setEmailSentText("Invalid OTP");
            }
            navigate("/verify-email");
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
                            Verify Your Email
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Enter your OTP you received from your email
                        </Typography>
                        <FormikForm
                            formSubmit={handleSubmit}
                            initialValues={resetPasswordInitialValues}
                            formFields={otpPasswordFormFields}
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
