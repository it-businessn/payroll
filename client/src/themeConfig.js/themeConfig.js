import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
    body: {
        fontFamily: "sans-serif",
    },
    typography: {
        dense: {
            color: "#b0b5bb",
            fontWeight: "bold",
        },
    },
    palette: {
        primary: {
            main: "#4d4df9",
        },
        secondary: {
            main: "#edf2ff",
        },
    },
});
