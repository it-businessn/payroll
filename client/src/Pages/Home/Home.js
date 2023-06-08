import {
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./Card";
import Sidebar from "./Sidebar";

function Home() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("profile"));
    const token = user?.userDetails?.token;
    const isDesktop = useBreakpointValue({
        base: false,
        lg: true,
    });
    return (
        <Flex
            as="section"
            direction={{
                base: "column",
                lg: "row",
            }}
            height="100vh"
            bg="bg.canvas"
            overflowY="auto"
        >
            {isDesktop && token ? (
                <Sidebar user={user.userDetails.data} />
            ) : (
                navigate("/sign-in")
            )}

            <Container py="8" flex="1" maxW="100%">
                <Stack
                    spacing={{
                        base: "8",
                        lg: "6",
                    }}
                >
                    <Stack
                        spacing="1"
                        direction={{
                            base: "column",
                            lg: "row",
                        }}
                        justify="space-between"
                        align={{
                            base: "start",
                            lg: "center",
                        }}
                    >
                        <Stack spacing="1">
                            <Heading
                                size={{
                                    base: "xs",
                                    lg: "sm",
                                }}
                                fontWeight="medium"
                            >
                                Dashboard
                            </Heading>
                            <Text color="fg.muted">
                                All important metrics at a glance
                            </Text>
                        </Stack>
                    </Stack>
                    <Stack
                        spacing={{
                            base: "5",
                            lg: "6",
                        }}
                    >
                        <SimpleGrid
                            columns={{
                                base: 1,
                                md: 3,
                            }}
                            gap="6"
                        >
                            <Card />
                            <Card />
                            <Card />
                        </SimpleGrid>
                    </Stack>
                    <Card minH="sm" />
                </Stack>
            </Container>
        </Flex>
    );
}

export default Home;
