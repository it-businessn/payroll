import {
    Box,
    Card,
    CardBody,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    SimpleGrid,
    Spacer,
    Stack,
    StackDivider,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import * as api from "../../api/index.js";
import Sidebar from "../../components/Sidebar";
import { UserProfile } from "../Home/UserProfile";
function BankDetail() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const navigate = useNavigate();
    const [userData, setData] = useState(null);
    useEffect(() => {
        fetchUserData(user.userDetails.data._id);
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
            <Sidebar user={user.userDetails.data}></Sidebar>
            <Container py="8" flex="1" maxW="100%">
                {userData && (
                    <Stack
                        spacing={{
                            base: "8",
                            lg: "6",
                        }}
                    >
                        <Card>
                            <CardBody>
                                <Flex>
                                    <Box p="4">
                                        <Heading
                                            size="xs"
                                            textTransform="uppercase"
                                        >
                                            <UserProfile
                                                user={userData}
                                                image="https://tinyurl.com/yhkm2ek8"
                                            />
                                        </Heading>
                                    </Box>
                                    <Spacer />
                                    <Box p="4">
                                        <IconButton
                                            onClick={() =>
                                                navigate(
                                                    `/add-bank-detail/${userData._id}`
                                                )
                                            }
                                            icon={
                                                <FiEdit2 fontSize="1.25rem" />
                                            }
                                            variant="ghost"
                                            aria-label="Edit member"
                                        />
                                    </Box>
                                </Flex>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Stack divider={<StackDivider />}>
                                    <Flex>
                                        <Box p="4">
                                            <Heading
                                                size="xs"
                                                textTransform="uppercase"
                                            >
                                                Bank Information
                                            </Heading>
                                        </Box>

                                        <Spacer />
                                    </Flex>
                                    <Box>
                                        <SimpleGrid columns={3} spacing={8}>
                                            <FormControl id="accountNumber">
                                                <FormLabel>
                                                    Account Number
                                                </FormLabel>
                                                <Text>
                                                    {
                                                        userData?.bankDetails
                                                            ?.accountNumber
                                                    }
                                                </Text>
                                            </FormControl>
                                            <FormControl id="branchTransitNumber">
                                                <FormLabel>
                                                    Branch Transit Number
                                                </FormLabel>
                                                <Text>
                                                    {
                                                        userData?.bankDetails
                                                            ?.branchTransitNumber
                                                    }
                                                </Text>
                                            </FormControl>
                                            <FormControl id="institutionNumber">
                                                <FormLabel>
                                                    Institution Number
                                                </FormLabel>
                                                <Text>
                                                    {
                                                        userData?.bankDetails
                                                            ?.institutionNumber
                                                    }
                                                </Text>
                                            </FormControl>
                                            <FormControl id="email">
                                                <FormLabel>
                                                    Email address
                                                </FormLabel>
                                                <Text>{userData.email}</Text>
                                            </FormControl>
                                            <FormControl id="phone">
                                                <FormLabel>
                                                    Phone Number
                                                </FormLabel>
                                                <Text>
                                                    {userData.phoneNumber}
                                                </Text>
                                            </FormControl>
                                            <FormControl id="role">
                                                <FormLabel>Role</FormLabel>
                                                <Text>{userData.role}</Text>
                                            </FormControl>
                                        </SimpleGrid>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Stack>
                )}
            </Container>
        </Flex>
    );
}

export default BankDetail;
