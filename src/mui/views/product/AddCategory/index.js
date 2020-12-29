import React, { useState } from "react";
import {
  Box,
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
import Breadcrumbs from "./BreadCrumbs";
import CategoryList from "./CategoryList";
import FormHeader from "../../../../components/layouts/FormHeader";
import { Edit } from "react-feather";
import { Alert, AlertTitle } from "@material-ui/lab";
import ImageUploader from "../../../../components/layouts/ImageUploader";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCategory } from "../../../../redux/actions";
import { useSelector } from "react-redux";

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
}));

const AddCourse = () => {
  // local state management
  const [formState, setFormState] = useState({
    category: "",
  });
  const [showCatList, setShowCatList] = useState(false);
  const [catListFetchError, setCatListFetchError] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();

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

  // category list fetching
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  // populating the response
  useEffect(() => {
    if (category.fetchSuccessful) {
      setCatListFetchError(() => "");
    } else {
      setCatListFetchError(() => category.error);
    }
  }, [category]);

  // renderCategoryList
  const renderCategoryList = () => {
    if (category.data?.length > 0 && category.fetchSuccessful) {
      return (
        <CategoryList setShowCatList={setShowCatList} data={category.data} />
      );
    } else if (category.data?.length === 0 && category.fetchSuccessful) {
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
              <Breadcrumbs />
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
              <form>
                <FormHeader
                  heading="Category details"
                  cssClass={classes.header}
                  icon={<Edit />}
                />
                <Box marginTop="16px" container spacing={3}>
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
                        fullWidth={true}
                      />
                    </Grid>
                    <Grid item lg={6} sm={12} xl={6} xs={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        size="small"
                        fullWidth="true"
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Parent category (optional)
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          name="category"
                          value={formState.category}
                          onChange={handleChange}
                          label="Parent category (optional)"
                          defaultValue="None"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Basic">Basic</MenuItem>
                          <MenuItem value="Company">Company</MenuItem>
                          <MenuItem value="Developer">Developer</MenuItem>
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
                      <ImageUploader single />
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default AddCourse;
