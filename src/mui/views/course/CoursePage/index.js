import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Container,
  Grid,
  Hidden,
  LinearProgress,
  makeStyles,
} from "@material-ui/core";
import Page from "../../../extras/Page";
import CourseDetails from "./CourseDetails";
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Breadcrumbs from "../../../../components/layouts/Breadcrumbs";
import EditCourse from "../EditCourse";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import { getCourseById } from "../../../../redux/actions";
import AddModule from "../AddCourse/AddModules";
import AddExercise from "../AddCourse/AddExercise";
import AddFAQ from "../AddCourse/AddFAQs";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  breadcrumbs: {
    marginBottom: theme.spacing(3),
  },
  padding: {
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
}));

const CoursePage = () => {
  // local state management

  const classes = useStyles();
  const { courseId } = useParams();
  const { path } = useRouteMatch();

  const dispatch = useDispatch();
  const course = useSelector((state) => state.course);

  // for breadcrumbs
  const backlinks = [
    {
      url: "/dashboard",
      label: "Dashboard",
    },
    {
      url: "/dashboard/courses",
      label: "Courses",
    },
  ];

  useEffect(() => {
    dispatch(getCourseById(courseId));
  }, []);

  useEffect(() => {
    if (course.getCourseByIdSuccessful) {
      course.getCourseByIdError = null;
    }
  }, [course]);

  // renderCoursePage
  const renderCoursePage = () => {
    if (course.getCourseByIdLoading) {
      return (
        <Card className={classes.padding}>
          <LinearProgress />
        </Card>
      );
    } else {
      if (course.getCourseByIdSuccessful) {
        if (course.getCourseByIdData) {
          return (
            <>
              <Hidden mdDown>
                <Box className={classes.breadcrumbs}>
                  <Breadcrumbs
                    backlinks={backlinks}
                    currentLabel={`${
                      course.getCourseByIdData?.name
                        ? course.getCourseByIdData.name
                        : "Course Page"
                    }`}
                  />
                </Box>
              </Hidden>
              <CourseDetails data={course.getCourseByIdData} />
            </>
          );
        } else {
          return (
            <Card className={classes.padding}>
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                Some unknown error occured. Please try to contact developer if
                problem persists. [code: srmuvicoCo]
              </Alert>
            </Card>
          );
        }
      } else {
        return (
          <Card className={classes.padding}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {course.getCourseByIdError}
            </Alert>
          </Card>
        );
      }
    }
  };

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Page
          className={classes.root}
          title={`${
            course.getCourseByIdData?.name
              ? course.getCourseByIdData.name
              : "Course Page"
          }`}
        >
          <Container maxWidth={false}>{renderCoursePage()}</Container>
        </Page>
      </Route>
      <Route path={`${path}/modules`}>
        <AddModule courseId={courseId} />
      </Route>
      <Route path={`${path}/add-exercise`}>
        <AddExercise courseId={courseId} />
      </Route>
      <Route path={`${path}/add-faq`}>
        <AddFAQ courseId={courseId} />
      </Route>
      <Route path={`${path}/edit`}>
        <EditCourse courseId={courseId} />
      </Route>
      <Redirect to="/error" />
    </Switch>
  );
};

export default CoursePage;
