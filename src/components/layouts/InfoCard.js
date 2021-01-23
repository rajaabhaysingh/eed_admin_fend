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
} from "@material-ui/core";
import Info from "@material-ui/icons/Info";
import { useHistory, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: theme.shadows[4],
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0 0 6px 0 #8a8a8a",
    },
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 48,
    width: 48,
  },
}));

const TotalProfit = ({ className, title, data, icon, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const { url } = useRouteMatch();

  return (
    <Card
      onClick={() => {
        history.push(`${url}/edit/manage-enrollments`);
      }}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {data}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>{icon ? icon : <Info />}</Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string,
};

export default TotalProfit;
