import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../api/index.js";
import FormikForm from "../../components/FormikForm.js";
import { RegisterSchema } from "../../config/userSchema.js";
import Copyright from "../Copyright";
import "./SignUp.css";
import {
    registerFormFields,
    registerInitialValues,
} from "./signUpFormFields.js";

export default function SignUp() {
    const navigate = useNavigate();
    const [hasError, setError] = React.useState("");
    const handleSubmit = async (values) => {
        try {
            const userData = await api.signUp(values);
            const userDetails = userData?.data;
            const profile = { userDetails: userDetails.data[1] };
            localStorage.setItem("profile", JSON.stringify(profile));
            navigate("/verify-email");
        } catch (error) {
            setError(error.response.data.error);
            console.log(error);
        }
    };
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
                        <FormikForm
                            formSubmit={handleSubmit}
                            schema={RegisterSchema}
                            initialValues={registerInitialValues}
                            formFields={registerFormFields}
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
                        Already have an account? &nbsp;
                        <Link to="/">Sign In</Link>
                    </Typography>
                </Box>
                <Copyright sx={{ mt: 7 }} />
            </Grid>
        </Grid>
    );
}
