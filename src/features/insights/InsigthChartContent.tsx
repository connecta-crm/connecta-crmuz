// import {
//   BarElement,
//   CategoryScale,
//   Chart as ChartJS,
//   Legend,
//   LinearScale,
//   Title,
//   Tooltip,
// } from 'chart.js';
// import { useEffect, useRef } from 'react';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// );

// export const options = {
//   indexAxis: 'y',
//   plugins: {
//     title: {
//       display: false,
//     },
//     legend: {
//       display: false,
//       // position: 'right',
//       // labels: {
//       //   font: {
//       //     size: 34, // Set font size
//       //     family: 'Arial', // Set font family
//       //     // style: 'italic', // Set font style
//       //     weight: 'bold', // Set font weight
//       //   },
//       //   color: '#333', // Set font color
//       // },
//     },
//     tooltip: {
//       enabled: true,
//     },
//   },
//   responsive: true,
//   scales: {
//     x: {
//       stacked: true,
//       beginAtZero: true,
//       max: 700,
//       grid: {
//         display: true,
//         color: '#d1d1d1',
//       },
//       ticks: {
//         color: '#666666',
//         font: {
//           size: 16,
//           family: 'Roboto',
//           weight: 'bold',
//         },
//       },
//     },
//     y: {
//       stacked: true,
//       beginAtZero: true,
//       grid: {
//         display: false,
//       },
//       ticks: {
//         color: '#21232C',
//         font: {
//           size: 12,
//           family: 'Roboto',
//           weight: 'normal',
//         },
//       },
//     },
//   },
//   maintainAspectRatio: false,
// };

// const labels = [
//   'Ben Carter',
//   'Sarah Reagan',
//   'Daniel Anderson',
//   'John Adams',
//   'Rachael Lane',
// ];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: 'A01',
//       data: [420, 300, 230, 190, 280],
//       backgroundColor: '#164863',
//     },
//     {
//       label: 'A02',
//       data: [245, 215, 200, 250, 200],
//       backgroundColor: '#427D9D',
//     },
//     {
//       label: 'Ads',
//       data: [0, 115, 150, 100, 0],
//       backgroundColor: '#9BBEC8',
//     },
//   ],
// };

// function InsigthChartContent() {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const chart = chartRef.current;

//     if (chart) {
//       const customLegend = chart?.legend.legendItems.map((legendItem) => {
//         return `<div class="custom-legend-item" style="background-color: ${legendItem.fillStyle}; padding: 5px; margin: 2px; border-radius: 5px; display: flex; justify-content: space-between;">
//                   <span>${legendItem.text}</span>
//                   <span>${legendItem.dataset?.data.reduce((a, b) => a + b, 0)}</span>
//                 </div>`;
//       });

//       document.getElementById('custom-legend').innerHTML =
//         customLegend.join('');
//     }
//   }, []);
//   return (
//     <div style={{ display: 'flex', width: '100%' }}>
//       <div style={{ flex: 1 }}>
//         <Bar ref={chartRef} data={data} options={options} />
//       </div>
//       <div
//         id="custom-legend"
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           paddingLeft: '20px',
//         }}
//       ></div>
//     </div>
//   );
// }

// export default InsigthChartContent;
