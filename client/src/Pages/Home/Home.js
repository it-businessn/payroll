import { Flex, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { USER_ROLE } from "../../constants/constant";
import Dashboard from "./Dashboard/Dashboard";
import EmployeeDashboard from "./Dashboard/EmployeeDashboard";

function Home() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("profile"));
    const token = user?.userDetails?.token;
    const userRole = user?.userDetails?.data?.role;
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
                <>
                    <Sidebar user={user.userDetails.data} />
                    {userRole === USER_ROLE.EMPLOYEE ? (
                        <EmployeeDashboard />
                    ) : (
                        <Dashboard />
                    )}
                </>
            ) : (
                navigate("/sign-in")
            )}
        </Flex>
    );
}

export default Home;
