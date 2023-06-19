import { Flex, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function Home() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("profile"));
    const token = user?.userDetails?.token;
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
                <Sidebar user={user.userDetails.data} />
            ) : (
                navigate("/sign-in")
            )}
            {/* <Dashboard /> */}
        </Flex>
    );
}

export default Home;
