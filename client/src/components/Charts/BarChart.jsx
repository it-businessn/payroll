import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { LABELS } from "../../constants/constant";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChart({
    data1,
    titleText,
    legend,
    indexAxis = "x",
}) {
    const options = {
        indexAxis: indexAxis,
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: titleText,
            },
            datalabels: { display: true, color: "#36A2EB" },
        },
    };
    // data1.map((element) => {
    //     element.month = moment(element.monthNum, "MM").format("MMM");

    //     let j = labels.findIndex((x) => x !== element.month);
    //     if (!labels.length) {
    //         labels.push(element.month);
    //     } else if (j !== -1) {
    //         labels.push(element.month);
    //     }
    //     return labels;
    // });
    const data = {
        labels: LABELS,
        datasets: [
            {
                label: legend,

                data: data1.map((x) => x.countMonth),
                // data: labels.map((x) => data1.find((y) => y.month === x).count),
                backgroundColor: ["#c3dd98"],
            },
        ],
    };
    return (
        <>
            {LABELS.length && (
                <Bar height={300} options={options} data={data} />
            )}
        </>
    );
}
