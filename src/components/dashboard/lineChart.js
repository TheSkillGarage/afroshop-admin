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
import LINE_CHART_DATA from '../../data/lineChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, 
);

export function LineChart() {
  const options = {
    scales: {
        x: {
          beginAtZero: true,
          grid:{
            display:false
        },    
        border:{
            color:'#B3B3B3'
        }    
        },
        y: {
            beginAtZero: true,
            border:{
                display: false,
                dash:[6],                
            },                         
          }
      },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: false,
      },      
    },
  };

  const data = {
    labels: LINE_CHART_DATA.map((data) => data.date),
    datasets: [
      {
        label: 'Income',
        data: LINE_CHART_DATA.map((data) => data.orders),
        borderColor: '#186F3D',
        backgroundColor: '#186F3D',
      },
      {
        label: 'Orders',
        data: LINE_CHART_DATA.map((data) => data.income),
        borderColor: '#FCAE17',
        backgroundColor: '#FCAE17',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
