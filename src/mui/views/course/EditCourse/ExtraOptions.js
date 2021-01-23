import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Card, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  avatar: {
    height: 100,
    width: 100,
  },
}));

const ExtraOptions = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      sdfsdfsdf
    </Card>
  );
};

ExtraOptions.propTypes = {
  className: PropTypes.string,
};

export default ExtraOptions;
