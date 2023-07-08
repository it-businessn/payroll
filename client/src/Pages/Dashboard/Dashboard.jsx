import React, { useEffect } from "react";

import { SimpleGrid } from "@chakra-ui/react";
import "react-calendar/dist/Calendar.css";
import { Doughnut } from "react-chartjs-2";
import { FiDollarSign, FiUsers } from "react-icons/fi";
import { TbPointerDollar } from "react-icons/tb";
import {
    AreaChart,
    BarChart,
    Card,
    DoughnutChart,
    HalfDoughnutChart,
    LineChart,
    PieChart,
    Stat,
} from "../../components";
import { notifications } from "../../constants/constant";
import fakedata from "../../constants/fakedata.json";
import { LandingPageLayout, NotificationBox } from "../../layout";

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
                                    indexAxis={"y"}
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
                            <Doughnut
                                options={{
                                    responsive: true,
                                    type: "doughnut",
                                    data: data,
                                    plugins: {
                                        legend: { display: false },
                                        title: {
                                            display: true,
                                            text: "Accrued Leaves(in days)",
                                        },
                                    },
                                }}
                                data={{
                                    labels: [
                                        "Sick leave",
                                        "Casual leave",
                                        "Public holiday",
                                        "Religious holiday",
                                        "Maternity leave",
                                        "Paternity leave",
                                        "Bereavement leave",
                                        "Compensatory leave",
                                        "Sabbatical leave",
                                        "Unpaid leave",
                                    ],
                                    datasets: [
                                        {
                                            label: "Number of days:",
                                            data: [
                                                1, 2, 1, 1, 3, 1, 1, 1, 1, 2,
                                            ],
                                            backgroundColor: [
                                                "#cdb1af",
                                                "#b28db8",
                                                "#c6e8c7",
                                                "#a1a764",
                                                "#f7e09a",
                                                "#ed9b80",
                                                "#ecc6c6",
                                            ],
                                            hoverOffset: 4,
                                        },
                                    ],
                                }}
                            />
                        </Card>
                    </SimpleGrid>
                    <NotificationBox notifications1={notifications} />
                </>
            }
        />
    );
}

export default Dashboard;
