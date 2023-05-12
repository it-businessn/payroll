import { CssBaseline, Grid, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../api/index.js";
import Copyright from "../Copyright.js";
import "../Login/Login.css";

const OTPInputFields = [
    {
        name: "firstChar",
        id: "firstChar",
    },
    {
        name: "secondChar",
        id: "secondChar",
    },
    {
        name: "thirdChar",
        id: "thirdChar",
    },
    {
        name: "fourthChar",
        id: "fourthChar",
    },
    {
        name: "fifthChar",
        id: "fifthChar",
    },
    {
        name: "sixthChar",
        id: "sixthChar",
    },
];
export default function VerifyEmail() {
    const [user, setUser] = React.useState(
        JSON.parse(localStorage.getItem("profile") || "")
    );
    const resetPasswordInitialValues = {
        email: user.userDetails.email,
        otp: "",
    };
    const [hasError, setErrorMessage] = React.useState("");
    const [emailSentText, setEmailSentText] = React.useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const otpInputNodeValues = document.querySelectorAll("input");
            let defaultParams = "";
            const otpValue = Array.prototype.slice
                .call(otpInputNodeValues)
                .map((item) => defaultParams + item.value);
            resetPasswordInitialValues.otp = otpValue.join("");
            const response = await api.verifyUser(resetPasswordInitialValues);
            navigate("/home");
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
            <Grid
                item
                xs={false}
                sm={4}
                md={6}
                className="signIn-cover  verify-cover"
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
                        <Typography variant="h6" gutterBottom>
                            Verify Your Email
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            A verification code has been sent to your email.
                            Enter your OTP below
                        </Typography>
                        <form onSubmit={handleSubmit} className="otp-container">
                            <div>
                                {OTPInputFields.map((item) => (
                                    <input
                                        key={item.id}
                                        type="text"
                                        name={item.name}
                                        id={item.id}
                                        maxLength={1}
                                        required
                                    />
                                ))}
                            </div>
                            <button type="submit">Verify Link</button>
                        </form>
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
