import {
    Card,
    CardBody,
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
import Sidebar from "../../components/Sidebar.jsx";
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import ProfileContainer from "../../layout/ProfileContainer.jsx";
import { UserProfile } from "../User/UserProfile.jsx";
function BankDetail() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const navigate = useNavigate();
    const [userData, setData] = useState(null);
    useEffect(() => {
        fetchUserData(user?.userDetails?.data?._id);
    }, []);
    const fetchUserData = async (id) => {
        try {
            let user = await api.getUserById(id);
            setData(user.data.data);
        } catch (error) {}
    };
    return (
        <DashboardLayout>
            {user && <Sidebar user={user?.userDetails?.data} />}
            <ProfileContainer>
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
                                    <Stack
                                        spacing={{
                                            base: "5",
                                            sm: "6",
                                        }}
                                    >
                                        <UserProfile
                                            user={userData}
                                            image="https://tinyurl.com/yhkm2ek8"
                                        />
                                    </Stack>
                                    <Spacer />
                                    <IconButton
                                        onClick={() =>
                                            navigate(
                                                `/add-bank-detail/${userData._id}`
                                            )
                                        }
                                        icon={<FiEdit2 fontSize="1.25rem" />}
                                        variant="outline"
                                        aria-label="Add Bank Detail"
                                    />
                                </Flex>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Stack divider={<StackDivider />}>
                                    <Flex>
                                        <Heading size="xs">
                                            Bank Information
                                        </Heading>
                                        <Spacer />
                                    </Flex>
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
                                            <FormLabel>Email address</FormLabel>
                                            <Text>{userData.email}</Text>
                                        </FormControl>
                                        <FormControl id="phone">
                                            <FormLabel>Phone Number</FormLabel>
                                            <Text>{userData.phoneNumber}</Text>
                                        </FormControl>
                                        <FormControl id="role">
                                            <FormLabel>Role</FormLabel>
                                            <Text>{userData.role}</Text>
                                        </FormControl>
                                    </SimpleGrid>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Stack>
                )}
            </ProfileContainer>
        </DashboardLayout>
    );
}

export default BankDetail;
