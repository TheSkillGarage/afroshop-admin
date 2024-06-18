import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getAxisDetails, getAxisTicks } from '../../utils/OrderSummaryFunctions';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart({ income, orders, dates }) {
  const income_details = getAxisDetails(income, 100, 50)
  const orders_details = getAxisDetails(orders, 10, 5)

  const options = {
    bezierCurve: true,
    hitRadius: 5,
    pointStyle: false,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        border: {
          color: '#B3B3B3',
        },
      },
      y: {
        max: income_details.max,
        beginAtZero: true,
        ticks: {
          // forces step size to be 50 units
          stepSize: income_details.step,
          callback: getAxisTicks,
        },
        border: {
          display: false,
          dash: [6],
        },
      },
      y1: {
        beginAtZero: true,
        position: 'right',
        max: orders_details.max,
        ticks: {
          stepSize: orders_details.step,
          callback: getAxisTicks,
        },
        border: {
          display: false,
          dash: [6],
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxHeight: 8,
          boxWidth: 8,
          font: {
            size: 13,
            lineHeight: 23,
            color: '#333'
          }
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'point',
        intersect: false,
        backgroundColor: 'white',
        borderColor: '#33333329',
        borderWidth: 1,
        boxShadow: '0px 4px 4px 0px #33333329',
        titleColor: '#333',
        bodyColor: '#333',
        padding: 12,
        cornerRadius: 20,
        displayColors: false,
        yAlign: 'bottom',
        bodyFont: {
          size: 10,
          weight: 600,
          lineHeight: '15px',
        },
        callbacks: {
          title: (tooltipItems, data) => {
            return '';
          },
          label: function (context) {
            let label = '';

            if (context.dataset.label !== "Orders") {
              label = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            } else {
              label = '' + context.parsed.y; // Append dataset label
            }

            return label;
          }
        }

      },
    },
  };

  // Creating the data object
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Income',
        data: income,
        borderColor: '#186F3D',
        backgroundColor: '#186F3D',
        lineTension: 0.5,
        yAxisID: 'y',
      },
      {
        label: 'Orders',
        data: orders,
        borderColor: '#FCAE17',
        backgroundColor: '#FCAE17',
        lineTension: 0.5,
        yAxisID: 'y1',
      },
    ],
  };


  return <Line options={options} data={data} />;
}
