import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

import * as api from "../../api/index.js";
import Copyright from "../Copyright";
import "./SignUp.css";

export default function SignUp() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let result = {
            name: data.get("name"),
            email: data.get("email"),
            password: data.get("password"),
        };
        await api.signUp(result);
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
                        <Box
                            component="form"
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
                            />
                            <TextField
                                margin="dense"
                                fullWidth
                                id="email"
                                label="Enter your email"
                                name="email"
                                size="medium"
                                autoComplete="email"
                            />
                            <FormControl
                                variant="outlined"
                                fullWidth
                                margin="dense"
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Create a Password
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    required
                                    name="password"
                                    label="Create a password"
                                />
                            </FormControl>

                            <Button
                                color="primary"
                                type="submit"
                                fullWidth
                                size="large"
                                variant="contained"
                                sx={{ mt: 1, mb: "2em" }}
                            >
                                Sign Up
                            </Button>
                        </Box>
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
