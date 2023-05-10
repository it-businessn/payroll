import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Form, FormikProvider, useFormik } from "formik";
import * as React from "react";
import { Link } from "react-router-dom";
import * as api from "../api/index.js";

export default function ForgotPassword() {
    const [hasError, setErrorMessage] = React.useState("");
    const [emailSentText, setEmailSentText] = React.useState("");
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: async () => {
            try {
                const response = await api.forgotPassword(values);
                setEmailSentText(response.data.message);
                setErrorMessage("");
            } catch (error) {
                setEmailSentText("");
                setErrorMessage(error.response.data.error);
                console.log(error);
            }
        },
    });
    const {
        errors,
        touched,
        values,
        isSubmitting,
        handleSubmit,
        getFieldProps,
    } = formik;

    return (
        <Box className="login-container">
            <Box className="signIn-form">
                <Typography variant="h6" gutterBottom>
                    Set password
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Start managing your finance faster and better
                </Typography>
                <FormikProvider value={formik}>
                    <Form sx={{ mt: 2 }}>
                        <TextField
                            margin="dense"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            size="medium"
                            autoComplete="email"
                            {...getFieldProps("email")}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <LoadingButton
                            loading={isSubmitting}
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            size="large"
                            sx={{ mt: 1, mb: "2em" }}
                        >
                            Login
                        </LoadingButton>
                        <Typography
                            variant="subtitle2"
                            color="green"
                            gutterBottom
                        >
                            {emailSentText}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color="red"
                            gutterBottom
                        >
                            {hasError}
                        </Typography>
                    </Form>
                </FormikProvider>
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
    );
}
