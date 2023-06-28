import { Heading, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import * as api from "../../api/index.js";
import Sidebar from "../../components/Sidebar.jsx";
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import ProfileContainer from "../../layout/ProfileContainer.jsx";
import { PaymentTable } from "./PaymentTable.jsx";
function PaymentWidget() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const [userData, setData] = useState(null);
    useEffect(() => {
        fetchUserData(user?.userDetails.data._id);
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
        <DashboardLayout>
            {user && <Sidebar user={user?.userDetails.data} />}
            <ProfileContainer>
                <Stack spacing="3">
                    <Heading size="xs">Your Payroll Information</Heading>
                    {userData && (
                        <PaymentTable
                            user={userData}
                            members={userData?.paymentInfo}
                        />
                    )}
                </Stack>
            </ProfileContainer>
        </DashboardLayout>
    );
}

export default PaymentWidget;
