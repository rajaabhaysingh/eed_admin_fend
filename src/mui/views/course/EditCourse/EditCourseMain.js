import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Card, makeStyles } from "@material-ui/core";
import EditCourse from "./components/EditCourse";
import EditModule from "./components/EditModule";
import EditExercise from "./components/EditExercise";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  avatar: {
    height: 100,
    width: 100,
  },
}));

const EditCourseMain = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <EditCourse />
      <EditModule />
      <EditExercise />
    </Card>
  );
};

EditCourseMain.propTypes = {
  className: PropTypes.string,
};

export default EditCourseMain;
