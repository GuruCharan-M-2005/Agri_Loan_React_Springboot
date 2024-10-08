import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register the required components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const HistogramChart = () => {
  const data = {
    labels: ['0-10', '10-20', '20-30', '30-40', '40-50'],
    datasets: [{
      label: 'Number of Applications',
      data: [5, 15, 25, 20, 10],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const options = {
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
          text: 'Application Range',
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
  };

  return <Bar data={data} options={options} />;
};

export default HistogramChart;
