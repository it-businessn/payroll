import { Heading, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import * as api from "../../api/index.js";
import { DashboardLayout, ProfileContainer, Sidebar } from "../../layout";
import PaymentTable from "./PaymentTable.jsx";
function PaymentWidget() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const [data, setData] = useState(null);
    useEffect(() => {
        fetchPayroll();
    }, []);
    const fetchPayroll = async () => {
        try {
            let result = await api.getPayroll();
            setData(result.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <DashboardLayout>
            {user && <Sidebar user={user?.userDetails.data} />}
            <ProfileContainer>
                <Stack spacing="3">
                    <Heading size="xs">Your Payroll Information</Heading>
                    {data && (
                        <PaymentTable
                            user={user?.userDetails.data}
                            members={data}
                        />
                    )}
                </Stack>
            </ProfileContainer>
        </DashboardLayout>
    );
}

export default PaymentWidget;
