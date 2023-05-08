import { ThemeProvider } from "@mui/material/styles";

import { theme } from "./config/themeConfig";
import RoutePages from "./routes";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <RoutePages />
        </ThemeProvider>
    );
}

export default App;
