import React from "react";
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
import EditCourseMain from "./EditCourseMain";
import ExtraOptions from "./ExtraOptions";
import ManageEnrollments from "./components/ManageEnrollments";
import Breadcrumbs from "../../../../components/layouts/Breadcrumbs";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  breadcrumbs: {
    padding: theme.spacing(0, 3),
    marginBottom: theme.spacing(3),
  },
  padBox: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: "4px",
    boxShadow: theme.shadows[8],
  },
}));

const EditCourseLanding = ({ courseId }) => {
  const classes = useStyles();
  const { path } = useRouteMatch();
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
    {
      url: `/dashboard/courses/${courseId}`,
      label: `${
        course?.getCourseByIdData?.name
          ? course.getCourseByIdData.name
          : "Unavailable"
      }`,
    },
  ];

  // renderEditCoursePage
  const renderEditCoursePage = () => {
    if (course.getCourseByIdLoading) {
      return (
        <Card className={classes.padBox}>
          <LinearProgress />
        </Card>
      );
    } else {
      if (course.getCourseByIdSuccessful) {
        return (
          <Grid container spacing={3}>
            <Grid className={classes.paper} item lg={9} md={9} xs={12}>
              <EditCourseMain />
            </Grid>
            <Grid className={classes.paper} item lg={3} md={3} xs={12}>
              <ExtraOptions />
            </Grid>
          </Grid>
        );
      } else {
        return (
          <Box className={classes.padBox}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {course.getCourseByIdError}
            </Alert>
          </Box>
        );
      }
    }
  };

  return (
    <Switch>
      <Route exact path={path}>
        <Page className={classes.root} title="Edit course">
          <Hidden mdDown>
            <Box className={classes.breadcrumbs}>
              <Breadcrumbs backlinks={backlinks} currentLabel={`Edit course`} />
            </Box>
          </Hidden>
          <Container maxWidth={false}>{renderEditCoursePage()}</Container>
        </Page>
      </Route>
      <Route path={`${path}/manage-enrollments`}>
        <ManageEnrollments />
      </Route>
      <Redirect to="/error" />
    </Switch>
  );
};

export default EditCourseLanding;
