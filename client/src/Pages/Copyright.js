import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Copyright() {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            size="small"
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            &nbsp;
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
