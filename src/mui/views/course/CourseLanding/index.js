import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Container,
  Grid,
  LinearProgress,
  makeStyles,
} from "@material-ui/core";
import { Alert, AlertTitle, Pagination } from "@material-ui/lab";
import Page from "../../../extras/Page";
import Toolbar from "./Toolbar";
import ProductCard from "./ProductCard";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import AddCourse from "../AddCourse";
import AddCategory from "../AddCategory";
import { getAllCategory, getAllCourse } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CoursePage from "../CoursePage";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(1),
    },
  },
  productCard: {
    height: "100%",
  },
  infoBox: {
    padding: theme.spacing(3),
    boxShadow: theme.shadows[8],
  },
}));

const CourseLanding = () => {
  // local state management
  const [getAllCourseError, setGetAllCourseError] = useState("");

  const classes = useStyles();

  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const course = useSelector((state) => state.course);

  // category list fetching
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllCourse());
  }, []);

  useEffect(() => {
    if (course.getAllCourseSuccessful) {
      setGetAllCourseError("");
      course.getAllCourseError = null;
    } else {
      setGetAllCourseError(course.getAllCourseError);
    }
  }, [course]);

  // renderAllCourse
  const renderAllCourse = (courses) => {
    if (course.getAllCourseSuccessful && courses?.length > 0) {
      return (
        <Grid container spacing={2}>
          {courses.map((item) => (
            <Grid item key={item._id} xl={3} lg={3} md={4} sm={6} xs={12}>
              <ProductCard className={classes.productCard} item={item} />
            </Grid>
          ))}
        </Grid>
      );
    } else {
      if (!course.getAllCourseSuccessful) {
        if (course.getAllCourseLoading) {
          return (
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <LinearProgress />
            </Grid>
          );
        } else {
          return (
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Alert className="w-100" severity="error">
                <AlertTitle>Error</AlertTitle>
                {getAllCourseError}
              </Alert>
            </Grid>
          );
        }
      } else {
        return (
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Card className={classes.infoBox}>
              <Alert className="w-100" severity="info">
                <AlertTitle>Info</AlertTitle>
                No courses available. Please add new course.
              </Alert>
            </Card>
          </Grid>
        );
      }
    }
  };

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Page className={classes.root} title="Courses">
          <Container maxWidth={false}>
            <Toolbar />
            <Box mt={2}>{renderAllCourse(course.getAllCourseData)}</Box>
            <Box mt={3} display="flex" justifyContent="center">
              <Pagination color="primary" count={3} size="small" />
            </Box>
          </Container>
        </Page>
      </Route>
      <Route path={`${path}/add`}>
        <Page className={classes.root} title="Add course">
          <AddCourse />
        </Page>
      </Route>
      <Route path={`${path}/add-course-category`}>
        <Page className={classes.root} title="Add category">
          <AddCategory />
        </Page>
      </Route>
      <Route path={`${path}/:courseId`}>
        <Page className={classes.root} title="Course details">
          <CoursePage />
        </Page>
      </Route>
    </Switch>
  );
};

export default CourseLanding;
