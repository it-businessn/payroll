import { Box, Container, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import * as api from "../../api/index.js";
import Sidebar from "../../components/Sidebar";
import { PaymentTable } from "./PaymentTable";
function PaymentWidget() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const [userData, setData] = useState(null);
    useEffect(() => {
        fetchUserData(user.userDetails.data._id);
    }, []);
    const fetchUserData = async (id) => {
        try {
            let user = await api.getUserById(id);
            setData(user.data.data);
        } catch (error) {
        } finally {
        }
    };
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
            <Sidebar user={user.userDetails.data}>
                <Container
                    py={{
                        base: "4",
                        md: "8",
                    }}
                    px={{
                        base: "0",
                        md: 8,
                    }}
                    maxW="100%"
                >
                    {" "}
                    <Box
                        bg="#fff"
                        boxShadow={{
                            base: "none",
                            md: "sm",
                        }}
                        borderRadius={{
                            base: "none",
                            md: "lg",
                        }}
                    >
                        <Stack spacing="5">
                            <Box pt="5">
                                <Stack
                                    direction={{
                                        base: "column",
                                        md: "row",
                                    }}
                                    justify="space-between"
                                >
                                    <Text fontSize="lg" fontWeight="medium">
                                        Your Payroll Information
                                    </Text>
                                </Stack>
                            </Box>
                            <Box overflowX="auto">
                                {userData && (
                                    <PaymentTable
                                        user={userData}
                                        members={userData.paymentInfo}
                                    />
                                )}
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Sidebar>
        </Flex>
    );
}

export default PaymentWidget;
