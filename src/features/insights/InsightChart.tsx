import { CaretDownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  indexAxis: 'y',
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false,
      // position: 'right',
      // labels: {
      //   font: {
      //     size: 34, // Set font size
      //     family: 'Arial', // Set font family
      //     // style: 'italic', // Set font style
      //     weight: 'bold', // Set font weight
      //   },
      //   color: '#333', // Set font color
      // },
    },
    datalabels: {
      anchor: 'end',
      align: 'end',
      formatter: (value) => `$ ${value.toLocaleString()}`,
      color: '#666666',
      font: {
        size: 14,
        weight: 'bold',
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
      // beginAtZero: true,
      max: 700,
      grid: {
        display: true,
        color: '#d1d1d1',
      },
      ticks: {
        color: '#666666',
        font: {
          size: 16,
          family: 'Roboto',
          weight: 'bold',
        },
      },
    },
    y: {
      stacked: true,
      // beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        color: '#21232C',
        font: {
          size: 12,
          family: 'Roboto',
          weight: 'normal',
        },
      },
    },
  },
  maintainAspectRatio: false,
};

const labels = [
  'Ben Carter',
  'Sarah Reagan',
  'Daniel Anderson',
  'John Adams',
  'Rachael Lane',
];

const data = {
  labels,
  datasets: [
    {
      label: 'A01',
      // data: [420, 300, 230, 190, 280],
      data: [-420, 300, 230, 190, -280],
      backgroundColor: '#164863',
    },
    {
      label: 'A02',
      // data: [245, 215, 200, 250, 200],
      data: [245, -215, 200, -250, 200],
      backgroundColor: '#427D9D',
    },
    {
      label: 'Ads',
      // data: [0, 115, 150, 100, 0],
      data: [0, -115, 150, 100, 0],
      backgroundColor: '#9BBEC8',
    },
  ],
};

function InsightChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = chartRef.current;

    let totalValue = 0;
    if (chartInstance) {
      const { datasets } = chartInstance.data;
      const customLegend = datasets.map((dataset) => {
        const datasetTotal = dataset.data.reduce((a, b) => a + b, 0);
        totalValue += datasetTotal;
        return `
                <div class="chart-insight__sources-item" style='background-color: ${dataset.backgroundColor}'>
                  <p>${dataset.label}</p>
                  <span>${dataset?.data?.reduce((a, b) => a + b, 0)}</span>
                </div>
                `;
      });

      customLegend.push(`<div class="chart-insight__sources-total" >
        <span>Total:</span>
        <span>${totalValue}</span>
      </div>`);

      document.getElementById('custom-legend').innerHTML =
        customLegend.join('');
    }
  }, []);
  return (
    <div className="insight__chart chart-insight">
      <div className="chart-insight__title  d-flex align-center">
        <p className="ml-5 f-16 font-bold">Lead distribution</p>
        <div className="chart-insight__sorts d-flex align-center">
          <p className="chart-insight__sort active">
            <img src="/img/insight/tab-1.svg" alt="" />
          </p>
          <p className="chart-insight__sort">
            <img src="/img/insight/tab-2.svg" alt="" />
          </p>
          <p className="chart-insight__sort">
            <img src="/img/insight/tab-3.svg" alt="" />
          </p>
          <p className="chart-insight__sort">
            <img src="/img/insight/tab-4.svg" alt="" />
          </p>
        </div>
      </div>
      <div className="chart-insight__row">
        <div className="chart-insight__col chart-insight__col--1">
          <div className="chart-insight__left-sort ">
            <div className="vertical-select-wrapper">
              <p className="chart-insight__left-sort--text">View by</p>
              <Select
                className="vertical-select"
                popupClassName="vertical-select-dropdown"
                style={{ width: 80, fontWeight: 600 }}
                placeholder="Filter by time"
                popupMatchSelectWidth={false}
                getPopupContainer={(trigger) => trigger.parentElement}
                options={[
                  {
                    label: 'User',
                    value: 'user',
                  },
                  {
                    label: 'Team',
                    value: 'team',
                  },
                  {
                    label: 'Time',
                    value: 'time',
                  },
                ]}
                suffixIcon={
                  <CaretDownOutlined
                    style={{ fontSize: 16, color: '#000000e0' }}
                  />
                }
                defaultValue={'user'}
              ></Select>
            </div>
          </div>
        </div>
        <div className="chart-insight__col chart-insight__col--2">
          <div className="chart-insight__main">
            <div className="chart-insight__main--chart" style={{ height: 250 }}>
              <Bar
                ref={chartRef}
                data={data}
                options={options}
                plugins={[ChartDataLabels]}
              />
            </div>
            <div className="chart-insight__main--sort d-flex align-center justify-evenly">
              <div className="d-flex align-center">
                <p className="mr-10">Show</p>
                <Select
                  style={{ width: 170, fontWeight: 600 }}
                  placeholder="Show"
                  popupMatchSelectWidth={false}
                  getPopupContainer={(trigger) => trigger.parentElement}
                  options={[
                    {
                      label: 'Number of leads',
                      value: 'number_of_leads',
                    },
                    {
                      label: 'Conversion ration',
                      value: 'conversion_ration',
                    },
                    {
                      label: 'Dispatching ration ',
                      value: 'dispatching_ration',
                    },
                  ]}
                  suffixIcon={
                    <CaretDownOutlined
                      style={{ fontSize: 16, color: '#000000e0' }}
                    />
                  }
                  defaultValue={'number_of_leads'}
                ></Select>
              </div>
              <div className="d-flex align-center">
                <p className="mr-10">Show with</p>
                <Select
                  style={{ width: 60, fontWeight: 600 }}
                  placeholder="#"
                  popupMatchSelectWidth={false}
                  getPopupContainer={(trigger) => trigger.parentElement}
                  options={[
                    {
                      label: '#',
                      value: '#',
                    },
                    {
                      label: '$',
                      value: '$',
                    },
                    {
                      label: '%',
                      value: '%',
                    },
                  ]}
                  suffixIcon={
                    <CaretDownOutlined
                      style={{ fontSize: 16, color: '#000000e0' }}
                    />
                  }
                  defaultValue={'#'}
                ></Select>
              </div>
            </div>
          </div>
        </div>
        <div className="chart-insight__col chart-insight__col--3">
          <div className="chart-insight__sources">
            <div className="chart-insight__sources-list">
              <p className="mb-5">
                <b>Sources</b>
              </p>
              <div id="custom-legend">{/* render sources */}</div>
            </div>
            <div className="d-flex align-center justify-between">
              <p className="mr-10">Show with</p>
              <Select
                style={{ width: 60, fontWeight: 600 }}
                placeholder="#"
                popupMatchSelectWidth={false}
                getPopupContainer={(trigger) => trigger.parentElement}
                options={[
                  {
                    label: '#',
                    value: '#',
                  },
                  {
                    label: '$',
                    value: '$',
                  },
                  {
                    label: '%',
                    value: '%',
                  },
                ]}
                suffixIcon={
                  <CaretDownOutlined
                    style={{ fontSize: 16, color: '#000000e0' }}
                  />
                }
                defaultValue={'#'}
              ></Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightChart;
