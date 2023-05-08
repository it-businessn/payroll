import { ThemeProvider } from "@mui/material/styles";

import RoutePages from "./routes";
import { theme } from "./themeConfig.js/themeConfig";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <RoutePages />
        </ThemeProvider>
    );
}

export default App;
