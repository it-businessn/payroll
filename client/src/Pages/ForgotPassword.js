import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Form, FormikProvider, useFormik } from "formik";
import * as React from "react";
import * as api from "../api/index.js";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: async () => {
            try {
                console.log(values);
                const userData = await api.forgotPassword(values);
            } catch (error) {
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
                                    error={Boolean(
                                        touched.email && errors.email
                                    )}
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
                                    color="red"
                                    gutterBottom
                                >
                                    sd
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
                <Copyright sx={{ mt: 7 }} />
            </Grid>
        </Grid>
    );
}
