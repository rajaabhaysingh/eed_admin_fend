import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  colors,
  Container,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import Page from "../../../extras/Page";
import FormHeader from "../../../../components/layouts/FormHeader";
import { Edit, FilePlus, Plus, Users } from "react-feather";
import { Alert, AlertTitle } from "@material-ui/lab";
import { addCourse } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import category_placeholder from "../../../../images/category_placeholder.png";
import ImageUploader from "../../../../components/layouts/ImageUploader";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useHistory } from "react-router-dom";
import { ArrowForwardIos, PlusOne } from "@material-ui/icons";
import { CheckCircle } from "react-feather";
import Breadcrumbs from "../../../../components/layouts/Breadcrumbs";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    boxShadow: theme.shadows[8],
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  productCard: {
    height: "100%",
  },
  header: {
    color: colors.common.white,
    backgroundColor: theme.palette.secondary.main,
  },
  menuIcon: {
    height: 32,
    width: 32,
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "4px",
    marginRight: theme.spacing(2),
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  labelBg: {
    backgroundColor: theme.palette.background.paper,
    padding: "2px",
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
  errorBtn: {
    color: colors.red[500],
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(1),
  },
}));

const AddCourse = () => {
  const instructorInitState = {
    name: "",
    designation: "",
  };

  const formInitialState = {
    category: "",
    name: "",
    level: "For everyone",
    price: "",
    desc: "",
    prerequisites: [],
    offer: 0,
    thumbnail: "",
    instructors: [instructorInitState],
    lastUpdated: "",
  };

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

  // local state management
  const [formState, setFormState] = useState(formInitialState);
  const [files, setFiles] = useState([]);
  const [addCourseError, setAddCourseError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showAddInstructors, setShowAddInstructors] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const category = useSelector((state) => state.category);
  const course = useSelector((state) => state.course);

  // set files to prop states
  useEffect(() => {
    setFormState({
      ...formState,
      thumbnail: files[0],
    });
  }, [files]);

  // managing course response
  useEffect(() => {
    if (course.postCourseSuccessful) {
      setAddCourseError("");
      // alert after successful posting
      setModalOpen(true);
      // reset post data after successful posting
      course.postCourseSuccessful = false;
      course.postCourseData = {};
      course.postCourseError = null;
      // clear form after successful submission
      setFormState(formInitialState);
      setFiles([]);
    } else {
      setAddCourseError(() => course.postCourseError);
    }
  }, [course]);

  // handleChange
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // handleInstructorChange
  const handleInstructorChange = (e, i) => {
    const updatedInstructors = [...formState.instructors];
    updatedInstructors[i][e.target.id] = e.target.value;

    setFormState({
      ...formState,
      instructors: updatedInstructors,
    });
  };

  // handleAddCourse
  const handleAddCourse = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("category", formState.category);
    formData.append("name", formState.name);
    formData.append("level", formState.level);
    formData.append("price", formState.price);
    formData.append("desc", formState.desc);

    const tempPrereqisites = formState.prerequisites?.toString().split(",");

    if (tempPrereqisites?.length > 0) {
      for (let prereq of tempPrereqisites) {
        if (prereq !== "") {
          formData.append("prerequisites", prereq);
        }
      }
    }

    formData.append("offer", formState.offer);
    formData.append("thumbnail", formState.thumbnail);

    // if empty key valur pair exists in instructors
    if (formState.instructors?.length > 0) {
      for (let i = 0; i < formState.instructors.length; i++) {
        if (formState.instructors[i].name === "") {
          formState.instructors.splice(i, 1);
        }
      }
    }

    // rechecking if still valid data are present in instructors
    if (formState.instructors?.length > 0) {
      formData.append("instructors", JSON.stringify(formState.instructors));
    }

    formData.append("lastUpdated", formState.lastUpdated);

    dispatch(addCourse(formData));
  };

  // renderMenuItems
  const renderMenuItems = (data) => {
    if (data?.length > 0) {
      let allCatList = [];

      for (let i = 0; i < data.length; i++) {
        allCatList.push(
          <MenuItem value={data[i]._id} key={data[i]._id}>
            <img
              className={classes.menuIcon}
              src={
                process.env.REACT_APP_MEDIA_URL_BASE + data[i].categoryImage ||
                category_placeholder
              }
              alt=""
            />
            {data[i].categoryName}
          </MenuItem>,
          data[i].children.length > 0 ? renderMenuItems(data[i].children) : null
        );
      }

      return allCatList;
    } else {
      return [];
    }
  };

  // renderInstructorInput
  const renderInstructorInput = () => {
    return (
      <>
        <Box style={{ width: "100%", padding: "24px 8px 16px 8px" }}>
          <FormHeader
            heading="2. Instructors"
            cssClass={classes.header}
            icon={<Users />}
          />
          <Alert className={classes.marginTop} severity="info">
            This section is optional. Click on +1 to add multiple entities.
          </Alert>
        </Box>

        {formState.instructors.map((inputGroup, i) => {
          const nameId = `name${i}`;
          const designationId = `designation${i}`;

          return (
            <Grid container spacing={2} key={i} className={classes.padding}>
              <Grid item lg={6} sm={12} xl={6} xs={12}>
                <TextField
                  size="small"
                  label={`Name* #${i + 1}`}
                  variant="outlined"
                  id="name"
                  name={nameId}
                  value={formState.instructors[i].name}
                  onChange={(e) => handleInstructorChange(e, i)}
                  fullWidth={true}
                />
              </Grid>
              <Grid item lg={6} sm={12} xl={6} xs={12}>
                <TextField
                  size="small"
                  label={`Designation #${i + 1} (optional)`}
                  variant="outlined"
                  id="designation"
                  name={designationId}
                  value={formState.instructors[i].designation}
                  onChange={(e) => handleInstructorChange(e, i)}
                  fullWidth={true}
                />
              </Grid>
            </Grid>
          );
        })}
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <Button
            type="button"
            color="primary"
            variant="outlined"
            disabled={!formState.instructors?.slice(-1)[0]?.name?.length > 0}
            onClick={() => {
              setFormState({
                ...formState,
                instructors: [...formState.instructors, instructorInitState],
              });
            }}
          >
            <PlusOne />
          </Button>
        </Grid>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <Button
            type="button"
            variant="text"
            className={classes.errorBtn}
            onClick={() => {
              setShowAddInstructors(false);
              setFormState({
                ...formState,
                instructors: [instructorInitState],
              });
            }}
          >
            REMOVE INSTRUCTOR DETAILS
          </Button>
        </Grid>
      </>
    );
  };

  // renderAddInstructors
  const renderAddInstructors = () => {
    if (showAddInstructors) {
      return renderInstructorInput();
    } else {
      return (
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            startIcon={<Plus />}
            onClick={() => {
              setShowAddInstructors(true);
            }}
          >
            ADD COURSE INSTRUCTORS
          </Button>
        </Grid>
      );
    }
  };

  return (
    <Page className={classes.root} title="Add course">
      <Container maxWidth={false}>
        <Box mt={2}>
          <Hidden mdDown>
            <Box className={classes.breadcrumbs}>
              <Breadcrumbs backlinks={backlinks} currentLabel="Add course" />
            </Box>
          </Hidden>

          <Box className={classes.paper}>
            <Box>
              <Typography variant="h4" color="textPrimary">
                Add Course
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                You can add new course here. Your customers will only be able to
                access it after you publish.
              </Typography>
            </Box>
            <form onSubmit={handleAddCourse} encType="multipart/form-data">
              <Box marginTop="32px" maxWidth="800px">
                <FormHeader
                  heading="1. Basic details"
                  cssClass={classes.header}
                  icon={<Edit />}
                />
                <Box marginTop="16px">
                  <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} xl={12} xs={12}>
                      <Alert className="w-100" severity="info">
                        <AlertTitle>NOTICE</AlertTitle>
                        Only course name, description, price and basic info in
                        required in this section.{" "}
                        <strong>
                          You can upload course content in the next steps.
                        </strong>
                      </Alert>
                    </Grid>
                    <Grid item lg={12} sm={12} xl={12} xs={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        fullWidth={true}
                      >
                        <InputLabel
                          className={classes.labelBg}
                          id="demo-simple-select-outlined-label"
                        >
                          Select course category*
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          name="category"
                          value={formState.category}
                          onChange={handleChange}
                          label="Select course category*"
                          defaultValue=""
                        >
                          {category.fetchSuccessful &&
                          category.fetchData?.length > 0 ? (
                            renderMenuItems(category.fetchData)
                          ) : (
                            <MenuItem value="" key="#">
                              <em>Not available</em>
                            </MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} sm={12} xl={6} xs={12}>
                      <TextField
                        size="small"
                        id="outlined-basic"
                        label="Course name*"
                        variant="outlined"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        fullWidth={true}
                      />
                    </Grid>
                    <Grid item lg={6} sm={12} xl={6} xs={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        fullWidth={true}
                        size="small"
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Course level*
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          name="level"
                          value={formState.level}
                          onChange={handleChange}
                          label="Course level*"
                          defaultValue=""
                        >
                          <MenuItem key="Beginner" value="Beginner">
                            Beginner
                          </MenuItem>
                          <MenuItem key="Intermediate" value="Intermediate">
                            Intermediate
                          </MenuItem>
                          <MenuItem key="Advanced" value="Advanced">
                            Advanced
                          </MenuItem>
                          <MenuItem key="For everyone" value="For everyone">
                            For everyone
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item lg={12} sm={12} xl={12} xs={12}>
                      <TextField
                        size="small"
                        label="Course description*"
                        variant="outlined"
                        name="desc"
                        rows={4}
                        multiline
                        value={formState.desc}
                        onChange={handleChange}
                        fullWidth={true}
                      />
                    </Grid>
                    <Grid
                      className={classes.marginBottom}
                      item
                      lg={12}
                      sm={12}
                      xl={12}
                      xs={12}
                    >
                      <Typography
                        className={classes.marginBottom}
                        variant="body2"
                        color="textSecondary"
                      >
                        Course thumbnail (optional):
                      </Typography>
                      <ImageUploader
                        maxFiles={1}
                        files={files}
                        setFiles={setFiles}
                      />
                    </Grid>
                    <Grid item lg={6} sm={12} xl={6} xs={12}>
                      <TextField
                        size="small"
                        label="Course price*"
                        variant="outlined"
                        name="price"
                        value={formState.price}
                        onChange={handleChange}
                        fullWidth={true}
                      />
                    </Grid>
                    <Grid item lg={6} sm={12} xl={6} xs={12}>
                      <TextField
                        size="small"
                        label="Discount percentage (optional)"
                        variant="outlined"
                        name="offer"
                        value={formState.offer}
                        onChange={handleChange}
                        fullWidth={true}
                      />
                    </Grid>
                    <Grid item lg={6} sm={12} xl={6} xs={12}>
                      <TextField
                        size="small"
                        label="Prerequisites (optional)"
                        variant="outlined"
                        name="prerequisites"
                        placeholder="Comma separated values"
                        value={formState.prerequisites}
                        onChange={handleChange}
                        fullWidth={true}
                      />
                    </Grid>
                    <Grid item lg={6} sm={12} xl={6} xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        label="Course updated at (optional)"
                        type="datetime-local"
                        name="lastUpdated"
                        value={formState.lastUpdated}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    {renderAddInstructors()}
                    {addCourseError && (
                      <Grid item lg={12} sm={12} xl={12} xs={12}>
                        <Alert className="w-100" severity="error">
                          <AlertTitle>Error</AlertTitle>
                          {addCourseError}
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
                        startIcon={<FilePlus />}
                        disabled={
                          formState.name?.length <= 0 ||
                          String(formState.desc)?.length <= 0 ||
                          formState.category?.length <= 0 ||
                          formState.price?.length <= 0 ||
                          course.addCourseLoading
                        }
                      >
                        ADD COURSE
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
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
                className={classes.marginTop}
                variant="body2"
                id="simple-modal-description"
                color="textSecondary"
              >
                New Course was added successfully. You can continue adding
                course content and modules next.{" "}
                <strong>Click below to add new course.</strong>
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                fullWidth
                className={classes.marginTop}
                startIcon={<ArrowForwardIos />}
                onClick={() => {
                  history.push("/dashboard/courses");
                }}
              >
                CONTINUE ADDING CONTENT
              </Button>
            </div>
          </Fade>
        </Modal>
      </Container>
    </Page>
  );
};

export default AddCourse;
