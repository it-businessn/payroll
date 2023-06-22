import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import { LABELS } from "../../../constants/constant";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom",
        },
        title: {
            display: true,
            text: "Salary By Month",
        },
    },
};

export function LineChart({ data1 }) {
    const data = {
        labels: LABELS,
        datasets: [
            // {
            //     label: "Dataset 1",
            //     data: LABELS.map(() =>
            //         faker.datatype.number({ min: -1000, max: 1000 })
            //     ),
            //     borderColor: "rgb(255, 99, 132)",
            //     backgroundColor: "rgba(255, 99, 132, 0.5)",
            // },
            {
                label: "Salary: $",
                data: data1.map((x) => x.annualSalary),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };
    return <Line height={300} options={options} data={data} />;
}
