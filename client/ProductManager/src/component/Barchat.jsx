import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Chart as Chartjs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from 'react-chartjs-2';

Chartjs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({prices}) => {

    const options = {
        responsive: true,
        legend: {
            position: "top"
        },
        title: {
            display: true,
            text: "Price Range vs Number of Items"
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Price Range'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Items'
                }
            }
        }
    };

    const data = {
        labels: ["0-100", "101-200", "201 - 300", "301- 400", "401 - 500","501-600","601-700","701-800","801-900","901-1000","1001-above"],
        datasets: [
            {
                label: "Number of Items",
                data: prices,
                backgroundColor: "rgba(255, 99, 132, 0.5)" 
            }
        ]
    };

    return (
        <div style={{ width: "100%", height: "100vh",marginTop:"20px"}}>
            <Bar options={options} data={data} />
        </div>
    );
}

export default BarChart;
