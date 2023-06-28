import React, { useState } from "react";

import { SimpleGrid } from "@chakra-ui/react";
import { BsCalendar2Week, BsCalendar3 } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbPointerDollar } from "react-icons/tb";
import { Card } from "../../components/Card";
import fakedata from "../../constants/fakedata.json";
import LandingPageLayout from "../../layout/LandingPageLayout";
import NotificationBox from "../../layout/NotificationBox";
import { HalfDoughnutChart } from "./Charts/HalfDoughnutChart";
import { PieChart } from "./Charts/PieChart";
import { UserStat } from "./UserStat";
function EmployeeDashboard() {
    const empStats = [
        {
            icon: FiDollarSign,
            label: "Gross Salary Paid",
            value: "$3456.33",
            delta: {
                value: "Feb 12 - Feb 28",
            },
        },
        {
            icon: LiaFileInvoiceDollarSolid,
            label: "Net Salary ",
            value: "$2000.90",
            delta: {
                value: "Feb 12 - Feb 28",
            },
        },
        {
            icon: TbPointerDollar,
            label: "Payrolls Processed ",
            value: "23",
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
            value: "15",
            delta: {
                link: "Raise New  Leave Request",
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
                            <HalfDoughnutChart
                                datalist={[20, 20, 60, 30]}
                                text="Accured Leave (in days)"
                                label="Accured Leave (in days)"
                            />
                        </Card>
                    </SimpleGrid>
                    <NotificationBox height="23em" />
                </>
            }
        />
    );
}

export default EmployeeDashboard;
