import "./donut.scss";
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip);
import { Doughnut } from 'react-chartjs-2';
import Datalabels from 'chartjs-plugin-datalabels';


ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Yellow', 'Pink', 'Blue'],
    datasets: [
        {
            data: [50, 30, 20],
            backgroundColor: ['yellow', 'pink', 'blue'],
            hoverBorderColor: 'white', // Optional: add a white border on hover
        },
    ],
};

const options = {
    tooltip: {
        callbacks: {
            label: (context) => {
                const label = context.label;
                const data = context.dataset.data;
                const percentage = ((data[context.dataIndex] / data.total) * 100).toFixed(1);
                return `<div className="data-label">${label}: ${percentage}%</div>`;
            },
        },
    },
};



function Donut() {
    return (
        <div style={{ width: "480px" }} className="dognut">
            <Doughnut data={data} options={options} />
        </div>
    )
};

export default Donut;
