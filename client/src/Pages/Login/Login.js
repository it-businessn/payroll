import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Form, FormikProvider, useFormik } from "formik";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import * as api from "../../api/index.js";
import { LoginSchema } from "../../config/userSchema.js";
import Copyright from "../Copyright";
import "./Login.css";

export default function Login() {
    const [hasError, setErrorMessage] = React.useState("");
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: async () => {
            try {
                const userData = await api.signIn(values);
                const userDetails = userData?.data;
                const userToken = userData?.token;
                const profile = { userDetails, userToken };
                localStorage.setItem("profile", JSON.stringify(profile));
                navigate("/home");
            } catch (error) {
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
                        <FormikProvider value={formik}>
                            <Form
                                noValidate
                                onSubmit={handleSubmit}
                                sx={{ mt: 2 }}
                            >
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
                                <TextField
                                    margin="dense"
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    autoComplete="password"
                                    type="password"
                                    size="medium"
                                    {...getFieldProps("password")}
                                    error={Boolean(
                                        touched.password && errors.password
                                    )}
                                    helperText={
                                        touched.password && errors.password
                                    }
                                />
                                <Link to="/forgot-password">
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ textAlign: "right" }}
                                    >
                                        Forgot password?
                                    </Typography>
                                </Link>
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
                <Copyright sx={{ mt: 7 }} />
            </Grid>
        </Grid>
    );
}
