import { Container, Flex, Heading, Stack } from "@chakra-ui/react";
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
            bg="bg.canvas"
        >
            <Sidebar user={user.userDetails.data}></Sidebar>
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
                <Stack spacing="3">
                    <Heading size="xs">Your Payroll Information</Heading>
                    {userData && (
                        <PaymentTable
                            user={userData}
                            members={userData.paymentInfo}
                        />
                    )}
                </Stack>
            </Container>
        </Flex>
    );
}

export default PaymentWidget;
