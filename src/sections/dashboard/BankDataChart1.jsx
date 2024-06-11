import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// ==============================|| CHART - ECOMMERCE DATA CHART ||============================== //

export default function BankDataChart({ color, height, transactions }) {
  const theme = useTheme();
  const mode = theme.palette.mode;

  // Initialize a map to hold the transaction amounts for each year
  const yearlyTransactionAmounts = {};

  // Calculate total transaction amounts for each year
  transactions.forEach((transaction) => {
    const createdAtDate = new Date(transaction.created_at);
    const year = createdAtDate.getFullYear();
    // Assuming there's an amount property in each transaction object
    const transactionAmount = parseFloat(transaction.amount);

    if (!yearlyTransactionAmounts[year]) {
      yearlyTransactionAmounts[year] = 0;
    }
    yearlyTransactionAmounts[year] += transactionAmount;
  });

  // Prepare the data for the chart
  const years = Object.keys(yearlyTransactionAmounts).sort();
  const yearlyAmounts = years.map((year) => yearlyTransactionAmounts[year]);

  // chart options
  const areaChartOptions = {
    chart: {
      id: 'new-stack-chart',
      type: 'bar',
      stacked: true,
      sparkline: {
        enabled: true
      },
      offsetX: -20
    },
    plotOptions: {
      bar: {
        borderRadius: 0
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      hover: {
        size: 5
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0
      }
    },
    stroke: { curve: 'smooth', width: 2 },
    tooltip: {
      x: {
        show: false
      },
      y: {
        formatter: function (value, { dataPointIndex }) {
          const year = years[dataPointIndex];
          const amount = series[0].data[dataPointIndex];
          return `${year}: $${amount?.toLocaleString('en-US', {
            minimumFractionDigits: 3
          })}`;
        }
      }
    },
    grid: {
      show: false
    }
  };

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [color],
      theme: {
        mode: 'light'
      }
    }));
  }, [color, mode, primary, secondary, line, theme]);

  const [series] = useState([
    {
      name: 'Annually',
      data: yearlyAmounts
    }
  ]);

  return <ReactApexChart options={options} series={series} type="bar" height={height ? height : 60} />;
}

BankDataChart.propTypes = { color: PropTypes.string, height: PropTypes.number, transactions: PropTypes.array.isRequired };
