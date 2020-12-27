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
import FormHeader from "../../../../components/layouts/FormHeader";
import { Edit } from "react-feather";
import { Alert, AlertTitle } from "@material-ui/lab";
import Editor from "../../../../components/layouts/Editor";

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
  productCard: {
    height: "100%",
  },
  header: {
    color: colors.common.white,
    backgroundColor: theme.palette.secondary.main,
  },
}));

const AddCourse = () => {
  // local state management
  const [formState, setFormState] = useState({
    category: "Basic",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const classes = useStyles();

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
                Add Course
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                You can add new course here. Your customers will only be able to
                access it after you publish.
              </Typography>
            </Box>
            <Box marginTop="32px" maxWidth="800px">
              <FormHeader
                heading="1. Basic details"
                cssClass={classes.header}
                icon={<Edit />}
              />
              <Box marginTop="16px" container spacing={3}>
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
                  <Grid item lg={6} sm={12} xl={6} xs={12}>
                    <TextField
                      size="small"
                      id="outlined-basic"
                      label="Course name*"
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
                        Course category*
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="category"
                        value={formState.category}
                        onChange={handleChange}
                        label="Course category*"
                      >
                        <MenuItem value="Basic">Basic</MenuItem>
                        <MenuItem value="Company">Company</MenuItem>
                        <MenuItem value="Developer">Developer</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item lg={12} sm={12} xl={12} xs={12}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Course description*"
                      multiline
                      fullWidth
                      rows={4}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item lg={12} sm={12} xl={12} xs={12}>
                    <Editor />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default AddCourse;
