import React from "react";
import { makeStyles } from "@material-ui/core";
import { Redirect, useRouteMatch } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    padding: theme.spacing(3),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    minHeight: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: theme.shadows[8],
    borderRadius: "4px",
    padding: theme.spacing(3),
  },
  largeFont: {
    fontSize: "4rem",
    color: theme.palette.text.secondary,
  },
  info: {
    fontSize: "1rem",
    color: theme.palette.text.primary,
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  let { path } = useRouteMatch();

  return <Redirect to={`${path}dashboard`} />;
};

export default Dashboard;
