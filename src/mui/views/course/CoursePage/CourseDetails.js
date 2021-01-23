import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import {
  Box,
  Button,
  Card,
  CardActions,
  colors,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Edit, Edit2, Users } from "react-feather";
import { useHistory, useRouteMatch } from "react-router-dom";
import coursePlaceholder from "../../../../images/course_placeholder.jpg";
import {
  BarChart,
  Category,
  Description,
  Update,
  People,
  AccountCircle,
  MoreVert,
  Delete,
  QuestionAnswer,
  Work,
  Add,
  EditTwoTone as EditAttributes,
} from "@material-ui/icons";
import FormHeader from "../../../../components/layouts/FormHeader";
import InfoCard from "../../../../components/layouts/InfoCard";
import InfoCardAlt from "../../../../components/layouts/InfoCardAlt";
import { Alert, AlertTitle } from "@material-ui/lab";
import CourseModule from "./CourseModule";
import CourseExercise from "./CourseExercise";
import CourseFAQs from "./CourseFAQs";

const useStyles = makeStyles((theme) => ({
  root: {},
  imageContainer: {
    paddingTop: "50%",
    width: "100%",
    position: "relative",
  },
  cardContent: {
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
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
  courseTitle: {
    width: "100%",
    position: "absolute",
    bottom: "0px",
    left: "0px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: colors.common.white,
    fontWeight: "bold",
    fontSize: "1.5rem",
    borderRadius: "4px",
    padding: theme.spacing(3),
  },
  box: {
    borderRadius: "4px",
    padding: theme.spacing(1),
    height: "100%",
    position: "relative",
  },
  chip: {
    border: "1px solid",
    borderColor: colors.green[700],
    boxShadow: theme.shadows[8],
    borderRadius: "8px",
    margin: "8px",
  },
  label: {
    marginRight: "12px",
    fontWeight: "bold",
    color: theme.palette.text.secondary,
  },
  icon: {
    height: "32px",
    width: "32px",
    borderRadius: "20px",
    background: theme.palette.background.dark,
    marginRight: "16px",
    padding: "4px",
  },
  marginTop: {
    marginTop: theme.spacing(1),
  },
  marginTop2: {
    marginTop: theme.spacing(4),
  },
  desc: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.dark,
    borderRadius: "4px",
    marginTop: theme.spacing(2),
  },
  formHeader: {
    color: colors.common.white,
    backgroundColor: theme.palette.secondary.main,
  },
  formHeader2: {
    color: colors.common.white,
    backgroundColor: colors.indigo[600],
  },
  formHeader3: {
    color: colors.common.white,
    backgroundColor: colors.orange[700],
  },
  formHeader4: {
    color: colors.common.white,
    backgroundColor: colors.red[700],
  },
  formHeader5: {
    color: colors.common.white,
    backgroundColor: colors.green[700],
  },
  delBtn: {
    color: colors.red[600],
    borderColor: colors.red[600],
  },
}));

const CourseDetails = ({ className, data, ...rest }) => {
  // local state management
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();
  const history = useHistory();
  const { url } = useRouteMatch();

  // handleEditCourse
  const handleEditCourse = () => {
    history.push(`${url}/edit`);
  };

  // handleMenuOpen
  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  // handleMenuClose
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // renderCourseDesc
  const renderCourseDesc = () => {
    if (data.name) {
      return (
        <Box className={classes.box}>
          <Box className="fc mar_b-12">
            <BarChart className={classes.icon} />
            <Typography variant="body1" className={classes.label}>
              Level:
            </Typography>
            <Typography variant="body1">{data.level}</Typography>
          </Box>
          <Box className="fc mar_b-12">
            <Category className={classes.icon} />
            <Typography variant="body1" className={classes.label}>
              Category:
            </Typography>
            <Typography variant="body1">
              {data.category.categoryName}
            </Typography>
          </Box>
          <Box className="fc mar_b-12">
            <Update className={classes.icon} />
            <Typography variant="body1" className={classes.label}>
              Last updated:
            </Typography>
            <Typography variant="body1">
              {data.lastUpdated
                ? moment(data.lastUpdated).format("DD MM YYYY hh:mm:ss")
                : "N/A"}
            </Typography>
          </Box>
          <Box className="mar_t-32">
            <InfoCard
              title="STUDENTS ENROLLED"
              data={data.enrollments?.length}
              icon={<People />}
            />
          </Box>
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
            style={{ position: "absolute", top: "-13px", left: "-8px" }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorEl={anchorEl}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                history.push(`${url}/edit`);
              }}
            >
              <ListItemIcon>
                <Edit2 />
              </ListItemIcon>
              <Typography variant="body1">Edit course</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                history.push(`${url}/modules`);
              }}
            >
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <Typography variant="body1">Add module</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                history.push(`${url}/add-exercise`);
              }}
            >
              <ListItemIcon>
                <Work />
              </ListItemIcon>
              <Typography variant="body1">Add exercise</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                history.push(`${url}/add-faq`);
              }}
            >
              <ListItemIcon>
                <QuestionAnswer />
              </ListItemIcon>
              <Typography variant="body1">Add FAQs</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                history.push(`${url}/edit/manage-enrollments`);
              }}
            >
              <ListItemIcon>
                <Users />
              </ListItemIcon>
              <Typography variant="body1">Manage enrollments</Typography>
            </MenuItem>
            <MenuItem>
              <Button
                variant="outlined"
                type="error"
                className={classes.delBtn}
                startIcon={<Delete />}
                fullWidth
              >
                Delete course
              </Button>
            </MenuItem>
          </Menu>
        </Box>
      );
    }
  };

  // renderInstructors
  const renderInstructors = () => {
    if (data.instructors?.length > 0) {
      return (
        <Grid container spacing={2} className={classes.marginTop}>
          {data.instructors.map((instructor) => (
            <Grid key={instructor._id} item xl={3} lg={3} sm={6} xs={12}>
              <InfoCardAlt
                title={instructor.name}
                data={
                  instructor.designation
                    ? instructor.designation
                    : "Course instructor"
                }
                icon={<AccountCircle />}
              />
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return (
        <Alert className="mar_t-16" severity="info">
          <AlertTitle>NO INSTRUCTORS AVAILABLE</AlertTitle>
          No instructors added to this course. Click on Edit course button at
          the bottom to add instructor(s).
        </Alert>
      );
    }
  };

  // renderPrerequisites
  const renderPrerequisites = () => {
    if (data.prerequisites?.length > 0) {
      return (
        <Grid container spacing={2} className={classes.marginTop}>
          {data.prerequisites.map((prerequisite) =>
            prerequisite.toString().length > 0 ? (
              <Grid key={prerequisite} item className={classes.chip}>
                <Typography>{prerequisite}</Typography>
              </Grid>
            ) : (
              <Grid key={prerequisite} item className={classes.chip}>
                <Typography>None</Typography>
              </Grid>
            )
          )}
        </Grid>
      );
    } else {
      return (
        <Alert className="mar_t-16" severity="info">
          <AlertTitle>NO PREREQUISITES AVAILABLE</AlertTitle>
          No prerequisites available for this course. Click on Edit course
          button at the bottom to add this information.
        </Alert>
      );
    }
  };

  // renderExercises
  const renderExercises = () => {
    if (data.exercises?.length > 0) {
      return (
        <Grid container spacing={2} className={classes.marginTop}>
          {data.exercises.map((exercise, i) => (
            <Grid key={exercise._id} xs={12} item>
              <CourseExercise exercise={exercise} expanded={i == 0} />
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return (
        <Alert className="mar_t-16" severity="info">
          <AlertTitle>NO EXERCISES AVAILABLE</AlertTitle>
          No exercises are available for this course yet. You can add them by
          clicking Edit course button below.
        </Alert>
      );
    }
  };

  // renderFAQs
  const renderFAQs = () => {
    if (data.faqs?.length > 0) {
      return (
        <Grid container spacing={2} className={classes.marginTop}>
          {data.faqs.map((faq, i) => (
            <Grid key={faq._id} xs={12} item>
              <CourseFAQs faq={faq} expanded={i == 0} />
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return (
        <Alert className="mar_t-16" severity="info">
          <AlertTitle>NO FAQs AVAILABLE</AlertTitle>
          No faqs are available for this course yet. You can add them by
          clicking Edit course button below.
        </Alert>
      );
    }
  };

  // renderCourseModules
  const renderCourseModules = () => {
    if (data.modules?.length > 0) {
      return (
        <Grid container spacing={2} className={classes.marginTop}>
          {data.modules.map((module, i) => (
            <Grid key={module._id} xs={12} item>
              <CourseModule module={module} expanded={i == 0} />
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return (
        <Alert className="mar_t-16" severity="info">
          <AlertTitle>NO VIDEO CONTENT</AlertTitle>
          Video modules/contents are not available for this course yet. You can
          add them by clicking Edit course button below.
        </Alert>
      );
    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box className={classes.cardContent}>
        <Grid container spacing={3}>
          <Grid
            item
            xl={6}
            lg={6}
            sm={12}
            xs={12}
            style={{ position: "relative" }}
          >
            <Box className={classes.imageContainer}>
              <img
                className={classes.courseImage}
                src={
                  data.thumbnail
                    ? process.env.REACT_APP_MEDIA_URL_BASE + data.thumbnail
                    : coursePlaceholder
                }
                alt=""
              />
            </Box>
            <Box className={classes.courseTitle}>{data.name}</Box>
          </Grid>
          <Grid item xl={6} lg={6} sm={12} xs={12}>
            {renderCourseDesc()}
          </Grid>
          <Grid
            className={classes.marginTop2}
            item
            xl={12}
            lg={12}
            sm={12}
            xs={12}
          >
            <FormHeader
              cssClass={classes.formHeader2}
              heading="Course Instructors"
              icon={<People />}
            />
            {renderInstructors()}
            <Grid container spacing={2} className={classes.marginTop}>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<EditAttributes />}
                  size="small"
                  color="primary"
                  disabled={data.instructors?.length <= 0}
                  onClick={() => {
                    history.push(`${url}/edit?target=instructors`);
                  }}
                >
                  Edit instructors
                </Button>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Add />}
                  size="small"
                  color="primary"
                  onClick={() => {
                    history.push(`${url}/edit?target=instructors`);
                  }}
                >
                  Add instructors
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className={classes.marginTop2}
            item
            xl={12}
            lg={12}
            sm={12}
            xs={12}
          >
            <FormHeader
              cssClass={classes.formHeader5}
              heading="Prerequisites"
              icon={<People />}
            />
            {renderPrerequisites()}
            <Grid container spacing={2} className={classes.marginTop}>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<EditAttributes />}
                  size="small"
                  color="primary"
                  disabled={data.prerequisites?.length <= 0}
                  onClick={() => {
                    history.push(`${url}/edit?target=prerequisites`);
                  }}
                >
                  Edit Prerequisites
                </Button>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Add />}
                  size="small"
                  color="primary"
                  onClick={() => {
                    history.push(`${url}/edit?target=prerequisites`);
                  }}
                >
                  Add Prerequisites
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className={classes.marginTop2}
            item
            xl={12}
            lg={12}
            sm={12}
            xs={12}
          >
            <FormHeader
              cssClass={classes.formHeader3}
              heading="Course description"
              icon={<Description />}
            />
            <Box className={classes.desc}>
              <Typography variant="body1">{data.desc}</Typography>
            </Box>
            <Grid container spacing={2} className={classes.marginTop}>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<EditAttributes />}
                  size="small"
                  color="primary"
                  disabled={data.desc?.length <= 0}
                  onClick={() => {
                    history.push(`${url}/edit?target=desc`);
                  }}
                >
                  Edit Description
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className={classes.marginTop2}
            item
            xl={12}
            lg={12}
            sm={12}
            xs={12}
          >
            <FormHeader
              cssClass={classes.formHeader}
              heading="Course modules"
              icon={<Description />}
            />
            {renderCourseModules()}
            <Grid container spacing={2} className={classes.marginTop}>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<EditAttributes />}
                  size="small"
                  color="primary"
                  disabled={data.modules?.length <= 0}
                  onClick={() => {
                    history.push(`${url}/edit?target=modules`);
                  }}
                >
                  Edit Module(s)
                </Button>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Add />}
                  size="small"
                  color="primary"
                  onClick={() => {
                    history.push(`${url}/modules`);
                  }}
                >
                  Add Module
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className={classes.marginTop2}
            item
            xl={12}
            lg={12}
            sm={12}
            xs={12}
          >
            <FormHeader
              cssClass={classes.formHeader4}
              heading="Exercises"
              icon={<Description />}
            />
            {renderExercises()}
            <Grid container spacing={2} className={classes.marginTop}>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<EditAttributes />}
                  size="small"
                  color="primary"
                  disabled={data.exercises?.length <= 0}
                  onClick={() => {
                    history.push(`${url}/edit?target=exercise`);
                  }}
                >
                  Edit Exercise(s)
                </Button>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Add />}
                  size="small"
                  color="primary"
                  onClick={() => {
                    history.push(`${url}/add-exercise`);
                  }}
                >
                  Add Exercise
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className={classes.marginTop2}
            item
            xl={12}
            lg={12}
            sm={12}
            xs={12}
          >
            <FormHeader
              cssClass={classes.formHeader2}
              heading="FAQs"
              icon={<Description />}
            />
            {renderFAQs()}
            <Grid container spacing={2} className={classes.marginTop}>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<EditAttributes />}
                  size="small"
                  color="primary"
                  disabled={data.faqs?.length <= 0}
                  onClick={() => {
                    history.push(`${url}/edit?target=faq`);
                  }}
                >
                  Edit FAQs
                </Button>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Add />}
                  size="small"
                  color="primary"
                  onClick={() => {
                    history.push(`${url}/add-faq`);
                  }}
                >
                  Add FAQs
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <CardActions
        style={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}
      >
        <Button
          onClick={handleEditCourse}
          startIcon={<Edit />}
          color="primary"
          variant="contained"
        >
          Edit course
        </Button>
      </CardActions>
    </Card>
  );
};

CourseDetails.propTypes = {
  className: PropTypes.string,
};

export default CourseDetails;
