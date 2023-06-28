import { Box } from "@chakra-ui/react";

export const Card = ({ children, ...props }) => (
    <Box
        borderWidth="1px"
        minH="3xs"
        bg="#fff"
        boxShadow="sm"
        borderRadius="lg"
        {...props}
    >
        {children}
    </Box>
);