import { Link, Text } from "@chakra-ui/react";
import React from "react";

export default function Copyright() {
    return (
        <>
            <Text fontSize="xs" color="subtle" textAlign="center">
                Copyright ©
                <Link
                    color="blue"
                    target="_blank"
                    href="https://www.businessn.com/"
                >
                    businessn
                </Link>
                &nbsp;
                {new Date().getFullYear()}
                {"."}
            </Text>
        </>
    );
}
