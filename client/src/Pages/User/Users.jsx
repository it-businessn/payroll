import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    Heading,
    Stack,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import * as api from "../../api/index.js";
import Sidebar from "../../components/Sidebar.jsx";
import fakeData from "../../constants/fakedata";
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import ProfileContainer from "../../layout/ProfileContainer.jsx";
import { MemberTable } from "./MemberTable.jsx";
export default function User() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const data = fakeData;

    data.forEach((element) => {
        element.name = `${element.firstName} ${element.middleName} ${element.lastName}`;
        element.activeStatus =
            element.active === "Yes" ? "Active" : "Not Active";
        element.address = `${element.streetNumber} ${element.city} ${element.state} ${element.postalCode} ${element.country}`;
    });
    const isMobile = useBreakpointValue({
        base: true,
        md: false,
    });
    const generateInvoice = async (member) => {
        try {
            let value = {
                annualSalary: member.annualSalary,
            };
            const updateData = await api.addUserPaymentDetailsById(
                member._id,
                value
            );
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <DashboardLayout>
            {user && <Sidebar user={user?.userDetails?.data}> </Sidebar>}
            <ProfileContainer>
                <Stack spacing="3">
                    <Flex justify="space-between">
                        <Heading size="xs">Members</Heading>
                        <Button
                            onClick={() => generateInvoice(data)}
                            variant="primary"
                        >
                            Process Payroll
                        </Button>
                    </Flex>

                    <MemberTable members={data} />

                    <Box>
                        <HStack justify="space-between">
                            {!isMobile && (
                                <Text color="fg.muted" fontSize="sm">
                                    Showing 1 to 5 of 42 results
                                </Text>
                            )}
                            <ButtonGroup
                                spacing="3"
                                justifyContent="space-between"
                                width={{
                                    base: "full",
                                    md: "auto",
                                }}
                                variant="secondary"
                            >
                                <Button borderWidth="2px">Previous</Button>
                                <Button borderWidth="2px">Next</Button>
                            </ButtonGroup>
                        </HStack>
                    </Box>
                </Stack>
            </ProfileContainer>
        </DashboardLayout>
    );
}
