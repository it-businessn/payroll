import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import RoutePages from "./routes";

function App() {
    return (
        <Router>
            <ChakraProvider>
                <RoutePages />
            </ChakraProvider>
        </Router>
    );
}

export default App;
