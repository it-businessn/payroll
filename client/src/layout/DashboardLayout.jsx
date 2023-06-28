import { Flex } from "@chakra-ui/react";
import React from "react";

const DashboardLayout = (props) => {
    return (
        <Flex
            as="section"
            direction={{
                base: "column",
                lg: "row",
            }}
            bg="bg.canvas"
        >
            {props.children}
        </Flex>
    );
};

export default DashboardLayout;
