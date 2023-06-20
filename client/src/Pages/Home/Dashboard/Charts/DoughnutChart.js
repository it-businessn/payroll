import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom",
        },
        title: {
            display: true,
            text: "Members By Role",
        },
    },
};
export const data = {
    labels: ["Employee", "Administrator", "Super Manager"],
    datasets: [
        {
            label: "# of Users",
            data: [20, 20, 60],
            backgroundColor: ["#e4f4c1", "#ff98006e ", "#996dff4a"],
            borderColor: ["#e4f4c1", "#FF9800", "#996dff"],
            borderWidth: 1,
        },
    ],
};

export function DoughnutChart() {
    return <Doughnut options={options} data={data} />;
}
