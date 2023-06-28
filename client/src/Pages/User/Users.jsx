import { Stack, useBreakpointValue } from "@chakra-ui/react";
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
        element.name = element.name.split(" ").slice(0, 3).join(" ");
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
                    <MemberTable members={data} />
                </Stack>
            </ProfileContainer>
        </DashboardLayout>
    );
}
