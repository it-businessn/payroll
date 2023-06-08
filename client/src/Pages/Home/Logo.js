import { Box, Image } from "@chakra-ui/react";
import React from "react";

const Logo = () => {
    return (
        <Box>
            <Image
                objectFit="cover"
                src="https://uploads-ssl.webflow.com/643cf2f78897e3e6b64779a9/64642eaa53e8234c891aafa5_Screenshot%202023-05-16%20at%206.30.59%20PM.png"
                alt="Company logo"
            />
        </Box>
    );
};

export default Logo;
