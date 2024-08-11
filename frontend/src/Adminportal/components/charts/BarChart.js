// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChart = () => {
  const data = {
    labels: ['Crop Loan', 'Credit Loan', 'Gold Loan','Machinery Loan'],
    datasets: [{
      label: 'Number of Applications',
      data: [50, 75, 100,40],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Loan Type',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Number of Applications',
            },
            beginAtZero: true,
          },
        },
      }}
    />
  );
};

export default BarChart;
