import React from "react";

import {
    Avatar,
    AvatarBadge,
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Heading,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    SimpleGrid,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import GaugeChart from "react-gauge-chart";
import { FiActivity, FiDollarSign, FiFilter, FiUsers } from "react-icons/fi";
import { Card } from "../../components/Card";
import fakedata from "../../constants/fakedata.json";
import { AreaChart } from "./Charts/AreaChart";
import { BarChart } from "./Charts/BarChart";
import { DoughnutChart } from "./Charts/DoughnutChart";
import { LineChart } from "./Charts/LineChart";
import { StackedBarChart } from "./Charts/StackedBarChart";
import { Stat } from "./Stat";
function Dashboard() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState(fakedata);
    // useEffect(() => {
    //     fetchUserData();
    // }, []);
    // const fetchUserData = async () => {
    //     try {
    //         let result = await api.getGroupedDataByMonth();
    //         setData(result.data);
    //     } catch (error) {}
    // };
    let result = fakedata.reduce((a, c) => ({
        annualSalary: a.annualSalary + c.annualSalary / 100,
    }));
    const [dateState, setDateState] = useState(new Date());
    const changeDate = (e) => {
        setDateState(e);
    };
    const members = [
        {
            id: "1",
            name: "Christian Nwamba",
            handle: "@christian",
            avatarUrl: "https://bit.ly/code-beast",
            status: "active",
            message: "Some message",
            lastSeen: "just now",
        },
        {
            id: "2",
            name: "Kent C. Dodds",
            handle: "@kent",
            avatarUrl: "https://bit.ly/kent-c-dodds",
            status: "active",
            message: "Some message",
            lastSeen: "2hr ago",
        },
        {
            id: "3",
            name: "Prosper Otemuyiwa",
            handle: "@prosper",
            avatarUrl: "https://bit.ly/prosper-baba",
            status: "active",
            message: "Some message",
            lastSeen: "3hr ago",
        },
        {
            id: "4",
            name: "Ryan Florence",
            handle: "@ryan",
            avatarUrl: "https://bit.ly/ryan-florence",
            status: "active",
            message: "Some message",
            lastSeen: "4hr ago",
        },
        {
            id: "5",
            name: "Segun Adebayo",
            handle: "@segun",
            avatarUrl: "https://bit.ly/sage-adebayo",
            status: "inactive",
            message: "Some message",
            lastSeen: "5hr ago",
        },
    ];
    const stats = [
        {
            icon: FiUsers,
            label: "Total Members",
            value: "100",
            delta: {
                value: "320",
                isUpwardsTrend: true,
            },
        },
        {
            icon: FiDollarSign,
            label: "Avg. Salary",
            value: "56.87%",
            delta: {
                value: "2.3%",
                isUpwardsTrend: true,
            },
        },
        {
            icon: FiActivity,
            label: "Payrolls Processed",
            value: "12.87%",
            delta: {
                value: "0.1%",
                isUpwardsTrend: false,
            },
        },
    ];
    let average = result.annualSalary * 100;
    return (
        <Container py="8" flex="1" maxW="100%">
            <Stack>
                <Heading size="xs">
                    Indicator
                    <IconButton
                        onClick={onOpen}
                        icon={<FiFilter fontSize="1.5rem" />}
                        variant="ghost"
                        aria-label="Edit member"
                    />
                </Heading>
                <Flex justifyContent="space-between">
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 3,
                        }}
                        width="70%"
                        gap={6}
                    >
                        {stats.map((stat, id) => (
                            <Stat key={id} {...stat} />
                        ))}
                        <Card>{data && <BarChart data1={data} />}</Card>
                        <Card>
                            <DoughnutChart />
                        </Card>
                        <Card>{data && <LineChart data1={data} />}</Card>
                        <Card>
                            <AreaChart />
                        </Card>
                        <Card>
                            <GaugeChart
                                id="gauge-chart4"
                                nrOfLevels={10}
                                arcPadding={0.1}
                                cornerRadius={3}
                                percent={average}
                            />
                        </Card>
                        <Card>
                            <StackedBarChart />
                        </Card>
                    </SimpleGrid>
                    <SimpleGrid
                        marginLeft="1.5em"
                        width="30%"
                        columns={1}
                        gap={6}
                    >
                        <Card>
                            <Calendar value={dateState} onChange={changeDate} />
                        </Card>
                        <Card>
                            {members.map((member) => (
                                <Stack
                                    key={member.id}
                                    fontSize="sm"
                                    px="4"
                                    spacing="4"
                                >
                                    Notification
                                    <Stack
                                        direction="row"
                                        justify="space-between"
                                        spacing="4"
                                    >
                                        <HStack spacing="3">
                                            <Avatar
                                                src={member.avatarUrl}
                                                boxSize="10"
                                            >
                                                <AvatarBadge
                                                    boxSize="4"
                                                    bg={
                                                        member.status ===
                                                        "active"
                                                            ? "success"
                                                            : "subtle"
                                                    }
                                                />
                                            </Avatar>
                                            <Box>
                                                <Text
                                                    fontWeight="medium"
                                                    color="emphasized"
                                                >
                                                    {member.name}
                                                </Text>
                                                <Text color="muted">
                                                    {member.handle}
                                                </Text>
                                            </Box>
                                        </HStack>
                                        <Text color="muted">
                                            {member.lastSeen}
                                        </Text>
                                    </Stack>
                                    <Text
                                        color="muted"
                                        sx={{
                                            "-webkit-box-orient": "vertical",
                                            "-webkit-line-clamp": "2",
                                            overflow: "hidden",
                                            display: "-webkit-box",
                                        }}
                                    >
                                        Candy donut tart pudding macaroon.
                                        Soufflé carrot cake choc late cake
                                        biscuit jelly beans chupa chups dragée.
                                        Cupcake toffee gummies lemon drops
                                        halvah. Cookie fruitcake jelly beans
                                        gingerbread soufflé marshmallow.
                                    </Text>
                                </Stack>
                            ))}
                        </Card>
                    </SimpleGrid>
                </Flex>
            </Stack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Apply Filter </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Country</FormLabel>
                            <Select placeholder="Select country">
                                <option>United Arab Emirates</option>
                                <option>Nigeria</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>From Date</FormLabel>
                            <Input type="date" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>To Date</FormLabel>
                            <Input type="date" />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="submit"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        &nbsp;
                        <Button type="submit" variant="primary">
                            Apply
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
}

export default Dashboard;
