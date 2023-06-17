import React from "react";

import { Container, SimpleGrid, Stack } from "@chakra-ui/react";
import { AreaChart } from "./AreaChart";
import { BarChart } from "./BarChart";
import { Card } from "./Card";
import { DoughnutChart } from "./DoughnutChart";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { StackedBarChart } from "./StackedBarChart";
function Dashboard() {
    return (
        <Container py="8" flex="1" maxW="100%">
            <Stack
                spacing={{
                    base: "8",
                    lg: "6",
                }}
            >
                {/* <Stack
                    spacing="1"
                    direction={{
                        base: "column",
                        lg: "row",
                    }}
                    justify="space-between"
                    align={{
                        base: "start",
                        lg: "center",
                    }}
                >
                    <Flex justifyContent="flex-end">
                        <FormControl>
                            <FormLabel>Country</FormLabel>
                            <Select placeholder="Select country">
                                <option>United Arab Emirates</option>
                                <option>Nigeria</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Country</FormLabel>
                            <Select placeholder="Select country">
                                <option>United Arab Emirates</option>
                                <option>Nigeria</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Country</FormLabel>
                            <Select placeholder="Select country">
                                <option>United Arab Emirates</option>
                                <option>Nigeria</option>
                            </Select>
                        </FormControl>
                    </Flex>
                </Stack> */}
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
                            <StackedBarChart />
                        </Card>
                        <Card>
                            <PieChart />
                        </Card>
                    </SimpleGrid>
                </Stack>
            </Stack>
        </Container>
    );
}

export default Dashboard;
