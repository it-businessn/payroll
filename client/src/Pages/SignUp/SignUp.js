import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton, InputAdornment } from "@mui/material";
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
import { RegisterSchema } from "../../config/userSchema.js";
import Copyright from "../Copyright";
import "./SignUp.css";

export default function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: RegisterSchema,
        onSubmit: async () => {
            try {
                console.log(values);
                const userData = await api.signUp(values);
                navigate("/home");
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
            <Grid item xs={false} sm={4} md={6} className="signUp-cover" />
            <Grid
                item
                xs={12}
                sm={8}
                md={6}
                component={Paper}
                elevation={1}
                square
                className="signUp-grid"
            >
                <Box className="signUp-container">
                    <Box className="signUp-form">
                        <Typography variant="h6" gutterBottom>
                            Let's create your account
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Signing up is fast and 100% free
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
                                    id="name"
                                    label="Enter your  name"
                                    name="name"
                                    size="medium"
                                    autoComplete="name"
                                    {...getFieldProps("name")}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                                <TextField
                                    margin="dense"
                                    fullWidth
                                    id="email"
                                    type="email"
                                    label="Enter your email"
                                    name="email"
                                    size="medium"
                                    autoComplete="email"
                                    {...getFieldProps("email")}
                                    error={Boolean(
                                        touched.email && errors.email
                                    )}
                                    helperText={touched.email && errors.email}
                                />{" "}
                                <TextField
                                    margin="dense"
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    autoComplete="password"
                                    type={showPassword ? "text" : "password"}
                                    size="medium"
                                    {...getFieldProps("password")}
                                    error={Boolean(
                                        touched.password && errors.password
                                    )}
                                    helperText={
                                        touched.password && errors.password
                                    }
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
                                    Register
                                </LoadingButton>
                            </Form>
                        </FormikProvider>
                    </Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: "center" }}
                    >
                        Already have an account? &nbsp;
                        <Link to="/">Sign In</Link>
                    </Typography>
                </Box>
                <Copyright sx={{ mt: 7 }} />
            </Grid>
        </Grid>
    );
}
