import React, { useEffect, useState } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  colors,
  Container,
  Fade,
  Grid,
  Hidden,
  IconButton,
  LinearProgress,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Page from "../../../extras/Page";
import AddContent from "./AddContent";
import Breadcrumbs from "../../../../components/layouts/Breadcrumbs";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useHistory,
} from "react-router-dom";
import { addModuleAction } from "../../../../redux/actions";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import FormHeader from "../../../../components/layouts/FormHeader";
import {
  Add,
  ArrowForwardIos,
  MoreVert,
  PlaylistAddCheck,
  ViewAgenda,
} from "@material-ui/icons";
import coursePlaceholder from "../../../../images/course_placeholder.jpg";
import { CheckCircle, Edit2 } from "react-feather";

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
  marTop: {
    marginTop: theme.spacing(3),
  },
  marTop5: {
    marginTop: theme.spacing(5),
  },
  marTB: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  formHeader: {
    color: colors.common.white,
    backgroundColor: theme.palette.secondary.main,
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
  flexEnd: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-end",
  },
  modalParent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  modal: {
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
    boxShadow: theme.shadows[8],
    padding: theme.spacing(3),
  },
  successGreen: {
    color: colors.green[500],
  },
}));

const AddModules = ({ courseId }) => {
  const formInitialState = {
    moduleName: "",
    moduleNo: "",
  };

  // local state management
  const [formState, setFormState] = useState(formInitialState);
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();
  const history = useHistory();
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
    {
      url: `/dashboard/courses/${courseId}`,
      label: `${
        course?.getCourseByIdData?.name
          ? course?.getCourseByIdData?.name
          : "Unavailable"
      }`,
    },
  ];

  useEffect(() => {
    if (course.addModuleSuccessful) {
      // alert after successful posting
      setModalOpen(true);
      // reset post data after successful posting
      course.addModuleSuccessful = false;
      course.addModuleError = null;
      course.addModuleData = null;
      // clear form after successful submission
      setFormState(formInitialState);
    }
  }, [course]);

  // handleMenuOpen
  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  // handleMenuClose
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // handleChange
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // handleAddModule
  const handleAddModule = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("courseId", courseId);
    formData.append("moduleNo", formState.moduleNo);
    formData.append("moduleName", formState.moduleName);

    dispatch(addModuleAction(formData));
  };

  // renderAvailableCourseDetails
  const renderAvailableCourseDetails = () => {
    if (course.getCourseByIdLoading) {
      return (
        <Box className={classes.padBox}>
          <LinearProgress />
        </Box>
      );
    } else {
      if (course.getCourseByIdSuccessful) {
        if (course?.getCourseByIdData?.modules?.length > 0) {
          return (
            <div className={classes.courseDetails}>
              <Grid container spacing={2}>
                <Grid item xl={4} lg={4} sm={4} xs={12}>
                  <Box className={classes.imageContainer}>
                    <img
                      className={classes.courseImage}
                      src={
                        course.getCourseByIdData.thumbnail
                          ? process.env.REACT_APP_MEDIA_URL_BASE +
                            course.getCourseByIdData.thumbnail
                          : coursePlaceholder
                      }
                      alt=""
                    />
                  </Box>
                </Grid>
                <Grid
                  style={{ position: "relative" }}
                  item
                  xl={8}
                  lg={8}
                  sm={8}
                  xs={12}
                >
                  <Typography variant="h3">
                    {course.getCourseByIdData.name}
                  </Typography>
                  <Typography className={classes.marTB} variant="body2">
                    Available modules under this course:
                  </Typography>
                  {course.getCourseByIdData.modules.map((module) => (
                    <Tooltip
                      key={module._id}
                      arrow
                      disableFocusListener
                      title="View, update or add module contents"
                      onClick={() =>
                        history.push(
                          `/dashboard/courses/${course.getCourseByIdData._id}/modules/${module._id}`
                        )
                      }
                    >
                      <div className={clsx(classes.moduleName, "fc")}>
                        <Avatar className={classes.avatar}>
                          <strong>{module.moduleNo}</strong>
                        </Avatar>
                        {module.moduleName}
                      </div>
                    </Tooltip>
                  ))}
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleMenuOpen}
                    style={{ position: "absolute", top: "0px", right: "0px" }}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorEl={anchorEl}
                  >
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        history.push(
                          `/dashboard/courses/${courseId}/edit?target=modules`
                        );
                      }}
                    >
                      <ListItemIcon>
                        <Edit2 />
                      </ListItemIcon>
                      <Typography variant="body1">Edit modules</Typography>
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </div>
          );
        } else {
          return (
            <Alert severity="info">
              <AlertTitle>NO MODULES AVAILABLE</AlertTitle>
              No modules available for this course. You can add new modules
              below.
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

  // renderAddModuleForm
  const renderAddModuleForm = () => {
    return (
      <Box className="fcol">
        <Typography variant="h4" color="textPrimary">
          Add new module
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Add new course module here. You can add course contents to modules
          created here.
        </Typography>
        <Typography
          variant="h5"
          className={clsx(classes.marTop5, classes.marBot1)}
        >
          Course details:
        </Typography>
        {renderAvailableCourseDetails()}
        <Box className={classes.marTop5}></Box>
        <FormHeader
          cssClass={classes.formHeader}
          heading="Add new module"
          icon={<ViewAgenda />}
        />
        <form onSubmit={handleAddModule} style={{ marginTop: "24px" }}>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} sm={12} xs={12}>
              <TextField
                size="small"
                label="Module number*"
                variant="outlined"
                name="moduleNo"
                value={formState.moduleNo}
                onChange={handleChange}
                fullWidth={true}
              />
            </Grid>
            <Grid item xl={8} lg={8} sm={12} xs={12}>
              <TextField
                size="small"
                label="Module name*"
                variant="outlined"
                name="moduleName"
                value={formState.moduleName}
                onChange={handleChange}
                fullWidth={true}
              />
            </Grid>
            {course.addModuleError && (
              <Grid item lg={12} sm={12} xl={12} xs={12}>
                <Alert className="w-100" severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {course.addModuleError}
                </Alert>
              </Grid>
            )}
            <Grid
              className={classes.flexEnd}
              item
              lg={12}
              sm={12}
              xl={12}
              xs={12}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<PlaylistAddCheck />}
                disabled={
                  formState.moduleName === "" ||
                  formState.moduleNo === "" ||
                  course.addModuleLoading
                }
              >
                ADD MODULE
              </Button>
            </Grid>
          </Grid>
        </form>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modalParent}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalOpen}>
            <div className={classes.modal}>
              <Typography variant="h3" className={classes.successGreen}>
                <i className="mar_r-16">
                  <CheckCircle />
                </i>
                Success
              </Typography>
              <Typography
                className={classes.marTop}
                variant="body2"
                id="simple-modal-description"
                color="textSecondary"
              >
                New module was added successfully. You can proceed adding
                content to it or add another module.
              </Typography>
              <Grid container className={classes.marTop} spacing={2}>
                <Grid item sm={6} xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="medium"
                    fullWidth
                    startIcon={<Add />}
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  >
                    ADD MORE MODULES
                  </Button>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    fullWidth
                    startIcon={<ArrowForwardIos />}
                    onClick={() => {
                      history.push(
                        `/dashboard/courses/${
                          course.getCourseByIdData?._id
                        }/modules/${
                          course.getCourseByIdData?.modules[
                            course.getCourseByIdData?.modules?.length - 1
                          ]?._id
                        }`
                      );
                    }}
                  >
                    ADD CONTENT NEXT
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Fade>
        </Modal>
      </Box>
    );
  };

  // renderAddModule
  const renderAddModule = () => {
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
            {renderAddModuleForm()}
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
    <Switch>
      <Route exact path={path}>
        <Page className={classes.root} title="Add module">
          <Hidden mdDown>
            <Breadcrumbs backlinks={backlinks} currentLabel={`Add module`} />
          </Hidden>
          {renderAddModule()}
        </Page>
      </Route>
      <Route path={`${path}/:moduleId`}>
        <AddContent courseId={courseId} />
      </Route>
      <Redirect to="/error" />
    </Switch>
  );
};

export default AddModules;
