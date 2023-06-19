import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import * as faker from "faker";
import React from "react";
import { Bar } from "react-chartjs-2";

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
const labels = ["Active", "Not Active"];
export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
    ],
};

export function BarChart() {
    return (
        <>
            <Bar options={options} data={data} />;
        </>
    );
}
