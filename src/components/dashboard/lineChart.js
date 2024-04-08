import React, { useEffect, useState } from 'react';
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

export function LineChart({ DATA, selectedYear }) {
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

  const [incomeData, setIncomeData] = useState(0);
  const [ordersData, setOrdersData] = useState(0);
  const [uniqueFormattedDates, setuniqueFormattedDates] = useState([])


  useEffect(() => {
    // Function to format date based on selected year
    const formatDate = (date, selectedYear) => {
      if (selectedYear === "week") {
        return date.toLocaleString('default', { month: 'short', day: 'numeric' });
      } else {
        return date.toLocaleString('default', { month: 'short' });
      }
    };
  
    // Initialize objects for income and order counts
    const incomePerDate = {};
    const orderCountsPerDate = {};
  
    // Iterate over DATA to calculate income and order counts
    DATA?.forEach(data => {
      const date = new Date(data.createdAt);
      const formattedDate = formatDate(date, selectedYear);
      
      // Calculate income
      incomePerDate[formattedDate] = (incomePerDate[formattedDate] || 0) + data.grandTotal;
      
      // Calculate order counts
      if (data.grandTotal > 0 && data.id !== null){
        orderCountsPerDate[formattedDate] = (orderCountsPerDate[formattedDate] || 0) + 1
      }else{
        orderCountsPerDate[formattedDate] = 0;
      }
    });
  
    // Extract unique formatted dates
    const uniqueFormattedDate = Object.keys(incomePerDate);
  
    // Extract income data
    const incomeData = uniqueFormattedDate.map(date => incomePerDate[date] || 0);
  
    // Extract order counts data
    const orderCountsData = uniqueFormattedDate.map(date => orderCountsPerDate[date] || 0);

    // Update state variables
    setuniqueFormattedDates(uniqueFormattedDate);
    setIncomeData(incomeData);
    setOrdersData(orderCountsData);
  }, [DATA, selectedYear]);
  


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
        data: ordersData,
        borderColor: '#FCAE17',
        backgroundColor: '#FCAE17',
        lineTension: 0.5,
      },
    ],
  };


  return <Line options={options} data={data} />;
}
