import { Box } from "@chakra-ui/react";

export const Card = (props) => (
    <Box
        borderWidth="1px"
        minH="3xs"
        bg="#fff"
        boxShadow="sm"
        borderRadius="lg"
        {...props}
    />
);
