import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Container,
    Flex,
    Heading,
    Stack,
    StackDivider,
    Text,
} from "@chakra-ui/react";
import React from "react";
import Sidebar from "../../components/Sidebar";
function PaymentWidget() {
    const user = JSON.parse(localStorage.getItem("profile"));
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
            <Sidebar user={user.userDetails.data}></Sidebar>
            <Container py="8" flex="1" maxW="100%">
                <Stack
                    spacing={{
                        base: "8",
                        lg: "6",
                    }}
                >
                    <Card>
                        <CardHeader>
                            <Heading size="md">
                                Your Profile Information
                            </Heading>
                        </CardHeader>

                        <CardBody>
                            <Stack divider={<StackDivider />} spacing="4">
                                <Box>
                                    <Heading
                                        size="xs"
                                        textTransform="uppercase"
                                    >
                                        Personal Information
                                    </Heading>
                                    <Text pt="2" fontSize="sm">
                                        View a summary of all your clients over
                                        the last month.
                                    </Text>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing="4">
                                <Box>
                                    <Heading
                                        size="xs"
                                        textTransform="uppercase"
                                    >
                                        Address
                                    </Heading>
                                    <Text pt="2" fontSize="sm">
                                        View a summary of all your clients over
                                        the last month.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading
                                        size="xs"
                                        textTransform="uppercase"
                                    >
                                        Overview
                                    </Heading>
                                    <Text pt="2" fontSize="sm">
                                        Check out the overview of your clients.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading
                                        size="xs"
                                        textTransform="uppercase"
                                    >
                                        Analysis
                                    </Heading>
                                    <Text pt="2" fontSize="sm">
                                        See a detailed analysis of all your
                                        business clients.
                                    </Text>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                </Stack>
            </Container>
        </Flex>
    );
}

export default PaymentWidget;
