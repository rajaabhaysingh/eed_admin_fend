import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  Container,
  Hidden,
  IconButton,
  LinearProgress,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Page from "../../../../extras/Page";
import Breadcrumbs from "../../../../../components/layouts/Breadcrumbs";
import { useHistory, useParams } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { Edit } from "@material-ui/icons";
import coursePlaceholder from "../../../../../images/course_placeholder.jpg";
import AddContentForm from "./AddContentForm";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
  },
  moduleDetail: {
    backgroundColor: theme.palette.background.dark,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
    borderRadius: "4px",
  },
  marTop: {
    marginTop: theme.spacing(3),
  },
  marTop5: {
    marginTop: theme.spacing(5),
  },
  marBot1: {
    marginBottom: theme.spacing(1),
  },
  padBox: {
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
    borderRadius: "4px",
    boxShadow: theme.shadows[8],
  },
  courseDetails: {
    backgroundColor: theme.palette.background.dark,
    borderRadius: "4px",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
  },
  avatar: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.text.primary,
    marginRight: theme.spacing(2),
    height: 32,
    width: 32,
  },
  moduleName: {
    padding: theme.spacing(1),
    borderRadius: "4px",
    border: "1px solid",
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.paper,
    marginBottom: "4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.background.dark,
    },
  },
  imageContainer: {
    paddingTop: "50%",
    width: "100%",
    position: "relative",
    marginRight: "8px",
  },
  courseImage: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "2px",
    position: "absolute",
    top: "0px",
    left: "0px",
  },
  avatarSmall: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1),
    fontSize: "0.8rem",
    height: 24,
    width: 24,
  },
  navlink: {
    padding: "12px",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    margin: "4px 0",
    display: "flex",
    flex: "1 1",
  },
  iconBtn: {
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      boxShadow: theme.shadows[6],
    },
  },
}));

const AddContent = ({ courseId }) => {
  const classes = useStyles();
  const { moduleId } = useParams();
  const history = useHistory();
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
          ? course?.getCourseByIdData?.name
          : "Unavailable"
      }`,
    },
    {
      url: `/dashboard/courses/${courseId}/modules`,
      label: "Modules",
    },
  ];

  useEffect(() => {
    if (course.addModuleSuccessful) {
      // reset post data after successful posting
      course.addModuleSuccessful = false;
      course.addModuleData = {};
      course.addModuleError = null;
    }
  }, [course]);

  // getModuleName
  const getModuleName = (moduleId) => {
    if (course?.getCourseByIdData?.modules?.length > 0) {
      for (module of course.getCourseByIdData.modules) {
        if (module._id == moduleId) {
          return module.moduleName;
        }
      }
      return false;
    } else {
      return false;
    }
  };

  // renderModuleContent
  const renderModuleContent = () => {
    if (course?.getCourseByIdData?.modules?.length > 0) {
      for (module of course.getCourseByIdData.modules) {
        if (module._id == moduleId) {
          if (module?.content?.length > 0) {
            return (
              <div className={clsx(classes.moduleDetail, "fcol")}>
                {module.content.map((content) => (
                  <div key={content._id} className="fc">
                    <div className={classes.navlink}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "0.8rem",
                        }}
                        variant="body2"
                      >
                        <Avatar className={classes.avatarSmall}>
                          <strong>{content.priority}</strong>
                        </Avatar>
                        {content.topicName}
                      </div>
                    </div>
                    <Tooltip arrow title="Edit content">
                      <IconButton
                        color="primary"
                        component="span"
                        className={classes.iconBtn}
                        size="medium"
                        onClick={() => {
                          history.push(
                            `/dashboard/courses/${courseId}/edit?target=content&id=${content._id}`
                          );
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </div>
                ))}
              </div>
            );
          } else {
            return (
              <Alert severity="info" variant="outlined">
                <AlertTitle>MODULE EMPTY</AlertTitle>
                Selected module doesn't have any content. You can add content in
                the section below.
              </Alert>
            );
          }
        }
      }
      return (
        <Alert severity="error">
          <AlertTitle>MODULE NOT FOUND</AlertTitle>
          Selected module isn't available. Please check the url and try again.
        </Alert>
      );
    } else {
      return (
        <Alert severity="warning">
          <AlertTitle>NO MODULE AVAILABLE</AlertTitle>
          No module is available under this course. Please add a module first to
          add any content to it.
        </Alert>
      );
    }
  };

  // renderPrevDetailsAndContentForm
  const renderPrevDetailsAndContentForm = () => {
    if (course.getCourseByIdLoading) {
      return (
        <Box className={classes.padBox}>
          <LinearProgress />
        </Box>
      );
    } else {
      if (course.getCourseByIdSuccessful) {
        if (course?.getCourseByIdData?.modules?.length > 0) {
          // means there are some modules available inside course
          if (getModuleName(moduleId)) {
            return (
              <div className="fcol">
                <Typography variant="h4" color="textPrimary" className="fc">
                  <div className="fc" style={{ height: "24px", width: "48px" }}>
                    <div className={classes.imageContainer}>
                      <img
                        className={classes.courseImage}
                        src={
                          course?.getCourseByIdData?.thumbnail
                            ? process.env.REACT_APP_MEDIA_URL_BASE +
                              course?.getCourseByIdData?.thumbnail
                            : coursePlaceholder
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  {course?.getCourseByIdData?.name || "Unavailable"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Add new course module here. You can add course contents to
                  modules created here.
                </Typography>
                <Typography
                  variant="h5"
                  className={clsx(classes.marTop5, classes.marBot1)}
                >
                  Selected module: <strong>{getModuleName(moduleId)}</strong>
                </Typography>
                <Typography
                  variant="body2"
                  className={clsx(classes.marTop, classes.marBot1)}
                >
                  Available contents:
                </Typography>
                {renderModuleContent()}
                <AddContentForm courseId={courseId} moduleId={moduleId} />
              </div>
            );
          } else {
            return (
              <Alert severity="error">
                <AlertTitle>Error 404</AlertTitle>
                Module not found. Please re-check that url is correct or contact
                developer if problem persists.
              </Alert>
            );
          }
        } else {
          return (
            <Alert severity="info">
              <AlertTitle>NO MODULES AVAILABLE</AlertTitle>
              No modules available for this course. Please add modules first to
              add any content.
            </Alert>
          );
        }
      } else {
        return (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {course.getCourseByIdError}
          </Alert>
        );
      }
    }
  };

  // renderAddContent
  const renderAddContent = () => {
    if (course.getCourseByIdLoading) {
      return (
        <Card className={clsx(classes.padBox, classes.marTop)}>
          <LinearProgress />
        </Card>
      );
    } else {
      if (course.getCourseByIdSuccessful) {
        return (
          <Container
            maxWidth={false}
            className={clsx(classes.padBox, classes.marTop)}
          >
            {renderPrevDetailsAndContentForm()}
          </Container>
        );
      } else {
        return (
          <Box className={clsx(classes.padBox, classes.marTop)}>
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
    <Page className={classes.root} title="Add content">
      <Hidden mdDown>
        <Breadcrumbs backlinks={backlinks} currentLabel={`Add content`} />
      </Hidden>
      {renderAddContent()}
    </Page>
  );
};

export default AddContent;
