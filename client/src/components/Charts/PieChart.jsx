import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ labels, title, textTitle, dataValue }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: title,
            },
            dataLabels: { display: true, color: "#36A2EB" },
        },
    };
    const data = {
        labels: labels,
        datasets: [
            {
                label: textTitle,
                data: dataValue,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "#ff98006e",
                    "#996dff4a",
                    "#747eb4",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
            },
        ],
    };
    return <Pie data={data} options={options} />;
}
