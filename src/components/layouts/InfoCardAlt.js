import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
  Box,
} from "@material-ui/core";
import Info from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: theme.shadows[8],
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: "4px",
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 48,
    width: 48,
  },
}));

const TotalProfit = ({ className, title, data, icon, ...rest }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container justify="space-between" spacing={2}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="body1">
            {title}
          </Typography>
          <Typography color="textSecondary" variant="h6">
            {data}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar}>{icon ? icon : <Info />}</Avatar>
        </Grid>
      </Grid>
    </Box>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string,
};

export default TotalProfit;
