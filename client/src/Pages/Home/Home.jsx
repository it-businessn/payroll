import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../../components/Sidebar";
import { USER_ROLE } from "../../constants/constant";
import DashboardLayout from "../../layout/DashboardLayout";
import Dashboard from "../Dashboard/Dashboard";
import EmployeeDashboard from "../Dashboard/EmployeeDashboard";
import { Navbar } from "./Navbar";

function Home() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const token = user && user?.userDetails?.token;
    const userRole = user?.userDetails?.data?.role;
    const isDesktop = useBreakpointValue({
        base: false,
        lg: true,
    });
    return (
        <DashboardLayout>
            {token && isDesktop ? (
                <>
                    <Sidebar user={user?.userDetails?.data} />
                    {userRole === USER_ROLE.EMPLOYEE ? (
                        <EmployeeDashboard />
                    ) : (
                        <Dashboard />
                    )}
                </>
            ) : (
                <Navbar user={user?.userDetails?.data} />
            )}
        </DashboardLayout>
    );
}

export default Home;
