import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

// Define the color for the chart
const labelColorMap = {
  Amount: '#1555FB'
};

const RepeatCustomerChart = ({ transactions }) => {
  console.log('🚀 ~ RepeatCustomerChart ~ transactions:', transactions);
  const theme = useTheme();

  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // Calculate total amount per year
    const yearAmounts = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.created_at);
      const year = date.getFullYear();

      if (!yearAmounts[year]) {
        yearAmounts[year] = 0;
      }

      yearAmounts[year] += transaction.amount;
    });

    // Prepare the data for the chart
    const labels = Object.keys(labelColorMap);
    const colors = labels.map((label) => labelColorMap[label]);

    const seriesData = [
      {
        name: 'Amount',
        data: Object.keys(yearAmounts).map((year) => yearAmounts[year] || 0)
      }
    ];

    setOptions({
      chart: {
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          endingShape: 'rounded'
        }
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right'
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: '12px'
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      responsive: [
        {
          breakpoint: 450,
          options: {
            chart: {
              height: 350
            },
            legend: {
              show: true,
              position: 'top',
              horizontalAlign: 'start'
            }
          }
        }
      ],
      colors: colors,
      xaxis: {
        categories: Object.keys(yearAmounts)
      },
      fill: {
        opacity: 1
      },
      grid: {
        borderColor: theme.palette.divider
      }
    });

    setSeries(seriesData);
  }, [theme.palette.divider, transactions]);

  return options && series.length ? <ReactApexChart options={options} series={series} type="bar" height={450} /> : null;
};

RepeatCustomerChart.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      created_at: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  ).isRequired
};

export default RepeatCustomerChart;
