import {
    Box,
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
import { UserProfile } from "../../components";
import { userCurrency } from "../../config/userSchema.js";
import { DashboardLayout, ProfileContainer, Sidebar } from "../../layout";
function Profile() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const navigate = useNavigate();
    const [userData, setData] = useState(null);

    useEffect(() => {
        fetchUserData(user?.userDetails.data._id);
    }, []);
    const fetchUserData = async (id) => {
        try {
            let user = await api.getUserById(id);
            setData(user.data.data);
        } catch (error) {}
    };
    return (
        <DashboardLayout>
            <Sidebar user={user?.userDetails?.data} />
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
                                                `/edit-user/${userData._id}`
                                            )
                                        }
                                        icon={<FiEdit2 fontSize="1.25rem" />}
                                        variant="outline"
                                        aria-label="Edit member"
                                    />
                                </Flex>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Stack divider={<StackDivider />}>
                                    <Flex>
                                        <Heading size="xs">
                                            Personal Information
                                        </Heading>
                                    </Flex>
                                    <Box>
                                        <SimpleGrid columns={3} spacing={8}>
                                            <FormControl id="firstName">
                                                <FormLabel>
                                                    First Name
                                                </FormLabel>
                                                <Text>
                                                    {userData.firstName}
                                                </Text>
                                            </FormControl>
                                            <FormControl id="middleName">
                                                <FormLabel>
                                                    Middle Name
                                                </FormLabel>
                                                <Text>
                                                    {userData.middleName}
                                                </Text>
                                            </FormControl>
                                            <FormControl id="lastName">
                                                <FormLabel>Last Name</FormLabel>
                                                <Text>{userData.lastName}</Text>
                                            </FormControl>
                                            <FormControl id="phone">
                                                <FormLabel>
                                                    Phone Number
                                                </FormLabel>
                                                <Text>
                                                    {userData.phoneNumber}
                                                </Text>
                                            </FormControl>
                                            <FormControl id="annualSalary">
                                                <FormLabel>
                                                    Annual Salary
                                                </FormLabel>
                                                {userData?.bankDetails && (
                                                    <Text>
                                                        {userCurrency(
                                                            userData
                                                                ?.bankDetails
                                                                .currency
                                                        ).format(
                                                            userData.annualSalary
                                                        )}
                                                    </Text>
                                                )}
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
                        <Card>
                            <CardBody>
                                <Stack divider={<StackDivider />}>
                                    <Flex>
                                        <Heading size="xs">Address</Heading>
                                    </Flex>

                                    <Box>
                                        <SimpleGrid columns={3} spacing={8}>
                                            <FormControl id="street">
                                                <FormLabel>
                                                    Street Number
                                                </FormLabel>
                                                <Text>
                                                    {
                                                        userData.address
                                                            .streetNumber
                                                    }
                                                </Text>
                                            </FormControl>
                                            <FormControl id="city">
                                                <FormLabel>City</FormLabel>
                                                <Text>
                                                    {userData.address.city}
                                                </Text>
                                            </FormControl>
                                            <FormControl id="state">
                                                <FormLabel>
                                                    State / Province
                                                </FormLabel>
                                                <Text>
                                                    {userData.address.state}
                                                </Text>
                                            </FormControl>
                                            <FormControl id="zip">
                                                <FormLabel>
                                                    ZIP/ Postal Code
                                                </FormLabel>
                                                <Text>
                                                    {
                                                        userData.address
                                                            .postalCode
                                                    }
                                                </Text>
                                            </FormControl>
                                            <FormControl id="country">
                                                <FormLabel>Country</FormLabel>
                                                <Text>
                                                    {userData.address.country}
                                                </Text>
                                            </FormControl>
                                        </SimpleGrid>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Stack>
                )}
            </ProfileContainer>
        </DashboardLayout>
    );
}

export default Profile;
