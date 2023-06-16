import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import * as faker from "faker";
import moment from "moment";
import React from "react";
import fakeData from "../../constants/fakedata.json";
const dataSet = fakeData;
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Chart.js Bar Chart",
        },
    },
};

dataSet.sort((a, b) => b.dateOfJoining - a.dateOfJoining);
let labels = dataSet.map((x) => moment(x.dateOfJoining).format("MMMM"));
labels = new Set(labels);
export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: dataSet.map(() => faker.datatype.number({ min: 0, max: 10 })),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
    ],
};
console.log(dataSet, data.datasets, labels);

export function BarChart() {
    return (
        <>
            bk
            {/* <Bar options={options} data={data} />; */}
        </>
    );
}
