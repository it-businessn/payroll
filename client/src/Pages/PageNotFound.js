import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            minH="80vh"
        >
            <Heading>404</Heading>
            <Text fontSize="18px" mt={3} mb={2}>
                Page Not Found
            </Text>
            <Text mb={6}>
                The page you're looking for does not seem to exist
            </Text>
            <Link to="/">
                <Button size="lg" variant="primary">
                    Go to Home
                </Button>
            </Link>
        </Flex>
    );
}
