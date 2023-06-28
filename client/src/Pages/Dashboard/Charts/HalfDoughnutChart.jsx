import { Heading, Text, VStack } from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function HalfDoughnutChart({ text, label, datalist }) {
    const options = {
        responsive: true,
        rotation: -90,
        circumference: 180,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: text,
            },
        },
    };
    const data = {
        labels: ["0%", "25%", "50%", "75%", "100%"],
        datasets: [
            {
                label: label,
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
