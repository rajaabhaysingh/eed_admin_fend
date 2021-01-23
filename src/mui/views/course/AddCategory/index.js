import React, { useState } from "react";
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
import CategoryList from "./CategoryList";
import FormHeader from "../../../../components/layouts/FormHeader";
import { Edit, CheckCircle } from "react-feather";
import { Alert, AlertTitle } from "@material-ui/lab";
import ImageUploader from "../../../../components/layouts/ImageUploader";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../../redux/actions";
import { useSelector } from "react-redux";
import { PlaylistAddCheck, ArrowForwardIos } from "@material-ui/icons";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useHistory } from "react-router-dom";
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
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
    marginTop: theme.spacing(3),
  },
  fullWidth: {
    width: "100%",
  },
  header: {
    color: colors.common.white,
    backgroundColor: theme.palette.secondary.main,
  },
  link: {
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  marginTop: {
    marginTop: theme.spacing(2),
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
  labelBg: {
    backgroundColor: theme.palette.background.paper,
    padding: "2px",
  },
}));

const AddCategory = () => {
  const formInitialState = {
    categoryName: "",
    parentId: "",
    categoryImage: "",
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
  const [showCatList, setShowCatList] = useState(false);
  const [catListFetchError, setCatListFetchError] = useState("");
  const [addCatPostError, setAddCatPostError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const category = useSelector((state) => state.category);

  // handleChange
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // showCategoryList
  const showCategoryList = (event) => {
    event.preventDefault();

    setShowCatList(() => true);
  };

  // handleCategorySubmit
  const handleCategorySubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("categoryName", formState.categoryName);
    formData.append("parentId", formState.parentId);
    formData.append("categoryImage", formState.categoryImage);
    formData.append("children", []);

    // submit form
    dispatch(addCategory(formData));
  };

  // renderMenuItems
  const renderMenuItems = (data) => {
    if (data?.length > 0) {
      let allCatList = [];

      for (let catItem of data) {
        allCatList.push(
          <MenuItem value={catItem._id} key={catItem._id}>
            {catItem.categoryName}
          </MenuItem>,
          catItem.children?.length > 0
            ? renderMenuItems(catItem.children)
            : null
        );
      }

      return allCatList;
    } else {
      return [];
    }
  };

  // set files to prop states
  useEffect(() => {
    setFormState({
      ...formState,
      categoryImage: files[0],
    });
  }, [files]);

  // populating the response
  useEffect(() => {
    if (category.fetchSuccessful) {
      setCatListFetchError(() => "");
    } else {
      setCatListFetchError(() => category.fetchError);
    }

    if (category.postSuccessful) {
      setAddCatPostError(() => "");
      // alert after successful posting
      setModalOpen(true);
      // reset post data after successful posting
      category.postSuccessful = false;
      category.postData = {};
      // clear form after successful submission
      setFormState(formInitialState);
    } else {
      setAddCatPostError(() => category.postError);
    }
  }, [category]);

  // renderCategoryList
  const renderCategoryList = () => {
    if (category.fetchData?.length > 0 && category.fetchSuccessful) {
      return (
        <CategoryList
          setShowCatList={setShowCatList}
          data={category.fetchData}
        />
      );
    } else if (category.fetchData?.length === 0 && category.fetchSuccessful) {
      return (
        <Alert className={classes.fullWidth} severity="info" variant="filled">
          No categories were found.
        </Alert>
      );
    } else {
      return (
        <Alert className="w-100" severity="error">
          <AlertTitle>Error</AlertTitle>
          {catListFetchError}
        </Alert>
      );
    }
  };

  return (
    <Page className={classes.root} title="Add course">
      <Container maxWidth={false}>
        <Box mt={3}>
          <Hidden mdDown>
            <Box className={classes.breadcrumbs}>
              <Breadcrumbs backlinks={backlinks} currentLabel="Add category" />
            </Box>
          </Hidden>

          <Box className={classes.paper}>
            <Box>
              <Typography variant="h4" color="textPrimary">
                Add new category
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Add new course category here. You can add new courses under
                categories created here.
              </Typography>
            </Box>
            <Box marginTop="32px" maxWidth="800px">
              <form
                encType="multipart/form-data"
                onSubmit={handleCategorySubmit}
              >
                <FormHeader
                  heading="Category details"
                  cssClass={classes.header}
                  icon={<Edit />}
                />
                <Box marginTop="16px">
                  <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} xl={12} xs={12}>
                      <Alert className="w-100" severity="info">
                        <AlertTitle>NOTICE</AlertTitle>
                        You cannot create new category with name similar to
                        existing ones.{" "}
                        <span
                          variant="body2"
                          className={classes.link}
                          onClick={showCategoryList}
                        >
                          <strong>
                            Click here to see list of existing categories.
                          </strong>
                        </span>
                      </Alert>
                    </Grid>
                    {showCatList && (
                      <Grid
                        className={classes.marginBottom}
                        item
                        lg={12}
                        sm={12}
                        xl={12}
                        xs={12}
                      >
                        {renderCategoryList()}
                      </Grid>
                    )}
                    <Grid item lg={12} sm={12} xl={12} xs={12}>
                      <Typography variant="body2" color="secondary">
                        <strong>Enter category details:</strong>
                      </Typography>
                    </Grid>
                    <Grid item lg={6} sm={12} xl={6} xs={12}>
                      <TextField
                        size="small"
                        id="outlined-basic"
                        label="Category name*"
                        variant="outlined"
                        name="categoryName"
                        fullWidth={true}
                        value={formState.categoryName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item lg={6} sm={12} xl={6} xs={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.labelBg}
                        size="small"
                        fullWidth={true}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Parent category (optional)
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          name="parentId"
                          value={formState.parentId}
                          onChange={handleChange}
                          label="Parent category (optional)"
                          defaultValue=""
                        >
                          {category.fetchSuccessful &&
                          category.fetchData.length > 0 ? (
                            renderMenuItems(category.fetchData)
                          ) : (
                            <MenuItem>
                              <em>Not available</em>
                            </MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item lg={12} sm={12} xl={12} xs={12}>
                      <Typography
                        className={classes.marginBottom}
                        variant="body2"
                        color="textSecondary"
                      >
                        Category thumbnail (optional):
                      </Typography>
                      <ImageUploader
                        maxFiles={1}
                        files={files}
                        setFiles={setFiles}
                      />
                    </Grid>
                    {addCatPostError && (
                      <Grid item lg={12} sm={12} xl={12} xs={12}>
                        <Alert className="w-100" severity="error">
                          <AlertTitle>Error</AlertTitle>
                          {addCatPostError}
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
                          formState.categoryName?.length <= 0 ||
                          category.postLoading
                        }
                      >
                        CREATE CATEGORY
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Box>
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
                New category was added successfully. You can continue adding
                course next. <strong>Click below to add new course.</strong>
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
                CONTINUE ADDING COURSE
              </Button>
            </div>
          </Fade>
        </Modal>
      </Container>
    </Page>
  );
};

export default AddCategory;
