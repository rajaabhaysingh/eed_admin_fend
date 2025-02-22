import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: theme.shadows[20],
  },
  cardHeader: {
    background: theme.palette.secondary.main,
    color: colors.common.white,
  },
  button: {
    color: colors.common.white,
  },
}));

const Sales = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        backgroundColor: theme.palette.secondaryBars,
        data: [
          18,
          5,
          19,
          27,
          29,
          19,
          20,
          18,
          5,
          19,
          27,
          29,
          19,
          20,
          18,
          5,
          19,
          27,
        ],
        label: "Last month",
      },
      {
        backgroundColor: colors.indigo[600],
        data: [
          11,
          20,
          12,
          29,
          30,
          25,
          13,
          11,
          20,
          12,
          29,
          30,
          25,
          13,
          11,
          20,
          12,
          29,
        ],
        label: "This month",
      },
    ],
    labels: [
      "1 Aug",
      "2 Aug",
      "3 Aug",
      "4 Aug",
      "5 Aug",
      "6 Aug",
      "7 Aug",
      "8 Aug",
      "9 Aug",
      "10 Aug",
      "11 Aug",
      "12 Aug",
      "13 Aug",
      "14 Aug",
      "15 Aug",
    ],
  };

  const options = {
    animation: false,
    cornerRadius: 10,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 8,
          maxBarThickness: 8,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider,
          },
        },
      ],
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.primary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={
          <Button
            endIcon={<ArrowDropDownIcon />}
            size="small"
            variant="text"
            className={classes.button}
          >
            Last 15 days
          </Button>
        }
        className={classes.cardHeader}
        title="Latest Sales"
      />
      <Divider />
      <CardContent>
        <Box height={400} position="relative">
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

Sales.propTypes = {
  className: PropTypes.string,
};

export default Sales;
