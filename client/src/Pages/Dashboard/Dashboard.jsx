import React from "react";

import { SimpleGrid } from "@chakra-ui/react";
import "react-calendar/dist/Calendar.css";
import { FiDollarSign, FiUsers } from "react-icons/fi";
import { TbPointerDollar } from "react-icons/tb";
import { Card } from "../../components/Card";
import fakedata from "../../constants/fakedata.json";
import LandingPageLayout from "../../layout/LandingPageLayout";
import NotificationBox from "../../layout/NotificationBox";
import { AreaChart } from "./Charts/AreaChart";
import { BarChart } from "./Charts/BarChart";
import { DoughnutChart } from "./Charts/DoughnutChart";
import { HalfDoughnutChart } from "./Charts/HalfDoughnutChart";
import { LineChart } from "./Charts/LineChart";
import { PieChart } from "./Charts/PieChart";

import { Stat } from "./Stat";
function Dashboard() {
    let data = fakedata;
    let result = fakedata.reduce((a, c) => ({
        annualSalary: a.annualSalary + c.annualSalary / 100,
    }));
    const labels1 = [
        "Employee",
        "Administrator",
        "Super Manager",
        "HR/Manager",
    ];
    const labels2 = ["Sick", "Non-sick"];

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
            value: "$5689.00",
            delta: {
                value: "2.3%",
                isUpwardsTrend: true,
            },
        },
        {
            icon: TbPointerDollar,
            label: "Payrolls Processed",
            value: "30",
            delta: {
                value: "0.1%",
                isUpwardsTrend: false,
            },
        },
    ];
    let average = result.annualSalary * 100;
    return (
        <LandingPageLayout
            headerTitle="Indicator"
            content={
                <>
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 3,
                        }}
                        width="73%"
                        height="fit-content"
                        gap={5}
                    >
                        {stats.map((stat, id) => (
                            <Stat key={id} {...stat} />
                        ))}
                        <Card>
                            {data && (
                                <BarChart
                                    titleText="Members Joined by Month"
                                    data1={data}
                                    legend="Number of Employees"
                                />
                            )}
                        </Card>
                        <Card>
                            <PieChart
                                labels={["Active", "Non-active"]}
                                dataValue={[12, 19]}
                                textTitle="% of Active Members"
                                title="Active vs Non-active Users"
                            />
                        </Card>
                        <Card>
                            <DoughnutChart
                                datalist={[20, 20, 60, 30]}
                                text="Members By Role"
                                labels={labels1}
                                title="# of Users"
                            />
                        </Card>
                        <Card>
                            <HalfDoughnutChart
                                text="Revenue Per Staff"
                                label="Revenue per User"
                                datalist={[20, 20, 60, 30]}
                            />
                        </Card>
                        <Card>{data && <LineChart data1={data} />}</Card>
                        <Card>
                            {data && (
                                <BarChart
                                    titleText="Average Salary By Month"
                                    data1={data}
                                    legend="Salary(in $)"
                                />
                            )}
                        </Card>
                        <Card>
                            <AreaChart />
                        </Card>
                        <Card>
                            <PieChart
                                labels={["North", "East", "West", "South"]}
                                dataValue={[12, 19, 30, 10]}
                                textTitle="% of users by region "
                                title="Regional Split"
                            />
                        </Card>
                        <Card>
                            <DoughnutChart
                                datalist={[60, 30]}
                                text="Sick Leave"
                                labels={labels2}
                                title="% of Sick Leave"
                            />
                        </Card>
                    </SimpleGrid>
                    <NotificationBox />
                </>
            }
        />
    );
}

export default Dashboard;
