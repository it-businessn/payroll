import { ChakraProvider } from "@chakra-ui/react";

import RoutePages from "./routes";

function App() {
    return (
        <ChakraProvider>
            <RoutePages />
        </ChakraProvider>
    );
}

export default App;
