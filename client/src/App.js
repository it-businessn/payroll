import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import RoutePages from "./routes";

function App() {
    return (
        <ChakraProvider>
            <Router>
                <RoutePages />
            </Router>
        </ChakraProvider>
    );
}

export default App;
