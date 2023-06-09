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
} from "@chakra-ui/react";
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
            <Sidebar user={user.userDetails.data}></Sidebar>
            <Container py="8" flex="1" maxW="100%">
                {userData && (
                    <Stack
                        spacing={{
                            base: "8",
                            lg: "6",
                        }}
                    >
                        <Card>
                            <CardHeader>
                                <Heading size="md">
                                    Your Invoice Information
                                </Heading>
                            </CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider />}>
                                    <Flex>
                                        <Box p="4">
                                            {userData && (
                                                <PaymentTable
                                                    user={userData}
                                                    members={
                                                        userData.paymentInfo
                                                    }
                                                />
                                            )}
                                        </Box>
                                    </Flex>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Stack>
                )}
            </Container>
        </Flex>
    );
}

export default PaymentWidget;
