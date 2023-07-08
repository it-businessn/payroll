import React, { useEffect, useState } from "react";

import { SimpleGrid } from "@chakra-ui/react";
import { BsCalendar2Week, BsCalendar3 } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbPointerDollar } from "react-icons/tb";
import {
    Card,
    DoughnutChart,
    HalfDoughnutChart,
    PieChart,
    UserStat,
} from "../../components";
import fakedata from "../../constants/fakedata.json";
import { LandingPageLayout, NotificationBox } from "../../layout";
import { LEAVE_TYPES, notifications } from "../../constants/constant";
import { Doughnut, Pie } from "react-chartjs-2";

function EmployeeDashboard() {
    const empStats = [
        {
            icon: FiDollarSign,
            label: "Gross Salary Paid",
            value: "$756.33",
            delta: {
                value: "Feb 12 - Feb 28",
            },
        },
        {
            icon: LiaFileInvoiceDollarSolid,
            label: "Net Salary ",
            value: "$600.90",
            delta: {
                value: "Feb 12 - Feb 28",
            },
        },
        {
            icon: TbPointerDollar,
            label: "Payrolls Processed ",
            value: "1",
            delta: {
                value: "Feb 12 - Feb 28",
            },
        },
        {
            icon: BsCalendar2Week,
            label: "Next Pay Date",
            value: "Jul 12, 2023",
            delta: {
                value: "Gross: $2000.90",
                value2: "Net: $2000.90",
            },
        },
        {
            icon: BsCalendar2Week,
            label: "Last Pay Date",
            value: "Jun 12, 2023",
            delta: {
                value: "Gross: $2000.90",
                value2: "Net: $2000.90",
            },
        },
        {
            icon: BsCalendar3,
            label: "Leaves Used",
            value: "1",
            delta: {
                link: "Raise New Leave Request",
                to: "/",
            },
        },
    ];
    const [data, setData] = useState(fakedata);
    return (
        <LandingPageLayout
            headerTitle="Welcome back!"
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
                        {empStats.map((stat, id) => (
                            <UserStat key={id} {...stat} />
                        ))}
                        <Card>
                            <PieChart
                                labels={["CPP", "EI", "Other Tax"]}
                                dataValue={[3456.33, 2000.9, 100]}
                                textTitle="% of tax amount"
                                title="Total Tax Paid"
                            />
                        </Card>
                        <Card>
                            <HalfDoughnutChart
                                datalist={[20, 20, 60, 30]}
                                text="Used vacation (in days)"
                                label="Used vacation (in days)"
                            />
                        </Card>
                        <Card>
                            <Pie
                                options={{
                                    responsive: true,
                                    type: "doughnut",
                                    data: data,
                                    plugins: {
                                        legend: { display: false },
                                        title: {
                                            display: false,
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
                    <NotificationBox
                        notifications1={notifications}
                        height="23em"
                    />
                </>
            }
        />
    );
}

export default EmployeeDashboard;
