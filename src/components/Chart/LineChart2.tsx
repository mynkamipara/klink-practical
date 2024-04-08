import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { CategoryScale } from 'chart.js';
import { chartColorCode } from '@/utils/const';

Chart.register(CategoryScale);

// use fo Dynamic fill color and coin list chart
const SmallLineChart = ({ graphData, id }: any) => {

    const colors = {
        charthigh: {
            default: chartColorCode[id]?.charthigh.default || "rgba(149, 76, 233, 1)",
            half: chartColorCode[id]?.charthigh.half || "rgba(149, 76, 233, 0.5)",
            quarter: chartColorCode[id]?.charthigh.quarter || "rgba(149, 76, 233, 0.25)",
            zero: chartColorCode[id]?.charthigh.zero || "rgba(149, 76, 233, 0)"
        },
    };

    const gradientBackground: any = document.createElement('canvas').getContext('2d');
    const gradient = gradientBackground.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, colors.charthigh.half);
    gradient.addColorStop(0.35, colors.charthigh.quarter);
    gradient.addColorStop(1, colors.charthigh.zero);

    const data = {
        labels: graphData.yaxis,
        datasets: [
            {
                fill: true,
                backgroundColor: gradient,
                pointBackgroundColor: colors.charthigh.default,
                borderColor: chartColorCode[id]?.border,
                data: graphData.xaxis,
                pointRadius: 0,
                pointHoverRadius: 0,
                pointStyle: 'circle',
                borderWidth: 1,
                hoverBackgroundColor: chartColorCode[id]?.border || 'red'
            },
        ],
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: 10
        },
        plugins: {
            legend: {
                display: false
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            pointer: {
                enabled: true,
                mode: 'nearest'
            },
            tooltip: {
                enabled: false,
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        }
    };

    return (
        <Line data={data} options={options} />
    );
};

export default SmallLineChart;
