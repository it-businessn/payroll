import React from "react";

import {
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
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
    useDisclosure,
} from "@chakra-ui/react";
import GaugeChart from "react-gauge-chart";
import { FiFilter } from "react-icons/fi";
import { Card } from "../Card";
import { AreaChart } from "./Charts/AreaChart";
import { BarChart } from "./Charts/BarChart";
import { DoughnutChart } from "./Charts/DoughnutChart";
import { LineChart } from "./Charts/LineChart";
import { StackedBarChart } from "./Charts/StackedBarChart";
import { Header } from "./Header";
function Dashboard() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Container py="8" flex="1" maxW="100%">
            <Stack>
                <Flex justifyContent="space-between">
                    <Heading size="xs">
                        Indicator
                        <IconButton
                            onClick={onOpen}
                            icon={<FiFilter fontSize="1.5rem" />}
                            variant="ghost"
                            aria-label="Edit member"
                        />
                    </Heading>
                </Flex>
                <Header />

                <Stack
                    spacing={{
                        base: "5",
                        lg: "6",
                    }}
                >
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 3,
                        }}
                        gap="6"
                        height="600px"
                    >
                        <Card>
                            <BarChart />
                        </Card>
                        <Card>
                            <DoughnutChart />
                        </Card>
                        <Card>
                            <LineChart />
                        </Card>
                        <Card>
                            <AreaChart />
                        </Card>
                        <Card>
                            <GaugeChart textColor="#000" hideText={true} />
                        </Card>
                        <Card>
                            <StackedBarChart />
                        </Card>
                    </SimpleGrid>
                </Stack>
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
