import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import LocationCity from "@material-ui/icons/LocationCity";
import LocalLibrary from "@material-ui/icons/LocalLibrary";
import ImportantDevices from "@material-ui/icons/ImportantDevices";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    boxShadow: theme.shadows[8],
  },
}));

const TrafficByDevice = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
        ],
        borderWidth: 3,
        borderColor: colors.grey[200],
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: ["Company", "General", "Others"],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
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

  const categories = [
    {
      title: "Company",
      value: 63,
      icon: LocationCity,
      color: colors.indigo[500],
    },
    {
      title: "General",
      value: 15,
      icon: LocalLibrary,
      color: colors.red[600],
    },
    {
      title: "Others",
      value: 23,
      icon: ImportantDevices,
      color: colors.orange[600],
    },
  ];

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Sales by category" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {categories.map(({ color, icon: Icon, title, value }) => (
            <Box key={title} p={1} textAlign="center">
              <Icon color="#ffffff" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

TrafficByDevice.propTypes = {
  className: PropTypes.string,
};

export default TrafficByDevice;
