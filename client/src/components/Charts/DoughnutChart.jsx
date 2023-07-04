import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ title, labels, text, datalist }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: text,
            },
            labels: { display: true },
        },
    };
    const data = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: datalist,
                backgroundColor: [
                    "#e4f4c1",
                    "#ff98006e ",
                    "#996dff4a",
                    "#747eb4",
                ],
                borderColor: ["#e4f4c1", "#FF9800", "#996dff", "#eee"],
                borderWidth: 1,
            },
        ],
    };
    return <Doughnut options={options} data={data} />;
}
