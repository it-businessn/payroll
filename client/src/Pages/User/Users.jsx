import { Stack, useBreakpointValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import * as api from "../../api/index.js";
import Sidebar from "../../components/Sidebar.jsx";
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import ProfileContainer from "../../layout/ProfileContainer.jsx";
import { MemberTable } from "./MemberTable.jsx";

export default function User() {
    const user = JSON.parse(localStorage.getItem("profile"));

    const [userData, setData] = useState(null);
    useEffect(() => {
        fetchUserData();
    }, []);
    const fetchUserData = async () => {
        try {
            let user = await api.getAllUsers();

            user.data.data.forEach((element) => {
                element.name = `${element.firstName} ${element.middleName} ${element.lastName}`;
                element.activeStatus =
                    element.emailVerified === "Yes" ? "Active" : "Not Active";
            });
            setData(user.data.data);
        } catch (error) {}
    };
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
                    <MemberTable members={userData} />
                </Stack>
            </ProfileContainer>
        </DashboardLayout>
    );
}
