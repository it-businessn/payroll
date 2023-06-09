import {
    Box,
    Button,
    ButtonGroup,
    Container,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import * as api from "../../api/index.js";
import Sidebar from "../../components/Sidebar.js";
import { MemberTable } from "./MemberTable.js";

export default function User() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = async () => {
        try {
            const userData = await api.getAllUsers();
            let userDataRecords = userData.data.data;
            userDataRecords.forEach((element) => {
                element.activeStatus = element.active ? "Active" : "Not Active";
            });
            setData(userDataRecords);
            setError(null);
        } catch (error) {
            setError(error.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const isMobile = useBreakpointValue({
        base: true,
        md: false,
    });
    return (
        <Sidebar user={user.userDetails.data}>
            <Container
                maxW="100%"
                py={{
                    base: "4",
                    md: "8",
                }}
                px={{
                    base: "0",
                    md: 8,
                }}
            >
                <Box
                    bg="#fff"
                    boxShadow={{
                        base: "none",
                        md: "sm",
                    }}
                    borderRadius={{
                        base: "none",
                        md: "lg",
                    }}
                >
                    <Stack spacing="5">
                        <Box
                            px={{
                                base: "4",
                                md: "6",
                            }}
                            pt="5"
                        >
                            <Stack
                                direction={{
                                    base: "column",
                                    md: "row",
                                }}
                                justify="space-between"
                            >
                                <Text fontSize="lg" fontWeight="medium">
                                    Members
                                </Text>
                                <InputGroup maxW="xs">
                                    <InputLeftElement pointerEvents="none">
                                        <Icon
                                            as={FiSearch}
                                            color="fg.muted"
                                            boxSize="5"
                                        />
                                    </InputLeftElement>
                                    <Input placeholder="Search" />
                                </InputGroup>
                            </Stack>
                        </Box>
                        <Box overflowX="auto">
                            {data && <MemberTable members={data} />}
                        </Box>
                        <Box
                            px={{
                                base: "4",
                                md: "6",
                            }}
                            pb="5"
                        >
                            <HStack spacing="3" justify="space-between">
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
                </Box>
            </Container>
        </Sidebar>
    );
}
