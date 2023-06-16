import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { theme } from "./config/themeConfig";
import RoutePages from "./routes";

function App() {
    return (
        <Router>
            <ChakraProvider theme={theme}>
                <RoutePages />
            </ChakraProvider>
        </Router>
    );
}

export default App;
