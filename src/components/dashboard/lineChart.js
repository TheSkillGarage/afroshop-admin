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


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart({ DATA }) {
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
        beginAtZero: true,
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
        intersect: true,
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
          label: function(context) {
              let label = '';

              if (context.parsed.y !== null) {
                  if (context.dataset.label !== "Orders"){
                    label = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                  }else{
                    label = context.parsed.y;
                  }
              }
              return label;
          }
      }
      },

    },
  };

  // Grouping the data by date and summing up the grandTotal for each date
const incomePerDate = {};

const formattedDates = DATA.map(data => {
    return new Date(data.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });
});

// Extracting unique formatted dates using a Set
const uniqueFormattedDatesSet = new Set(formattedDates);
const uniqueFormattedDates = [...uniqueFormattedDatesSet];

DATA.forEach(data => {
    const date = new Date(data.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });
    if (!incomePerDate[date]) {
        incomePerDate[date] = 0;
    }
    incomePerDate[date] += data.grandTotal;
});

// Converting the grouped data into arrays for labels and data
const incomeData = uniqueFormattedDates.map(date => incomePerDate[date] || 0);

// Calculating order counts per date
const orderCountsPerDate = uniqueFormattedDates.map(date => {
    return DATA.filter(data => {
        const dataDate = new Date(data.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
        return dataDate === date;
    }).length;
});

// Creating the data object
const data = {
    labels: uniqueFormattedDates,
    datasets: [
        {
            label: 'Income',
            data: incomeData,
            borderColor: '#186F3D',
            backgroundColor: '#186F3D',
            lineTension: 0.5,
        },
        {
            label: 'Orders',
            data: orderCountsPerDate,
            borderColor: '#FCAE17',
            backgroundColor: '#FCAE17',
            lineTension: 0.5,
        },
    ],
};


  return <Line options={options} data={data} />;
}
