import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Typography,
  Grid,
  Hidden,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import Breadcrumbs from "./BreadCrumbs";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Add from "@material-ui/icons/Add";
import Book from "@material-ui/icons/Book";
import Description from "@material-ui/icons/Description";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0",
  },
  alignCenter: {
    display: "flex",
    alignItems: "center",
  },
  flexEnd: {
    display: "flex",
    justifyContent: "flex-end",
  },
  breadcrumbs: {
    display: "flex",
    justifyContent: "flex-start",
  },
  utils2: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    boxShadow: theme.shadows[8],
    boxSizing: "border-box",
  },
  formControl: {
    width: "100%",
  },
  button: {
    boxShadow: theme.shadows[6],
    marginRight: theme.spacing(1),
  },
  sCase: {
    textTransform: "none",
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  // local state management
  const [sort, setSort] = useState("");

  const history = useHistory();
  const { url } = useRouteMatch();

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Hidden mdDown>
        <Box mt={3}>
          <Box className={classes.breadcrumbs}>
            <Breadcrumbs />
          </Box>
        </Box>
      </Hidden>

      <Box className={classes.utils2} mt={3}>
        <Box marginBottom="24px">
          <Typography variant="h4" color="textPrimary">
            Courses
          </Typography>
          <Typography variant="body2" color="textSecondary">
            You can edit/delete/update the courses in this section.
          </Typography>
        </Box>
        <Grid container spacing={1}>
          <Grid item lg={6} sm={12} xl={6} xs={12}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<Add />}
              size="small"
              onClick={() => {
                history.push(`${url}/add`);
              }}
            >
              Add new course
            </Button>
            <Button
              size="small"
              className={classes.sCase}
              startIcon={<Description />}
            >
              Export to Excel
            </Button>
          </Grid>
          <Grid item lg={6} sm={12} xl={6} xs={12}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<Book />}
              size="small"
              onClick={() => {
                history.push(`${url}/add-course-category`);
              }}
            >
              Add new course category
            </Button>
          </Grid>
          <Grid item lg={6} sm={12} xl={6} xs={12}>
            <Box width="100%">
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search course"
                variant="outlined"
                size="small"
              />
            </Box>
          </Grid>
          <Grid className={classes.flexEnd} item lg={6} sm={12} xl={6} xs={12}>
            <Box width="100%">
              <FormControl
                variant="outlined"
                size="small"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-filled-label">
                  Sort by
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={sort}
                  onChange={handleSortChange}
                  defaultValue="Newest first"
                  label="Sort by"
                >
                  <MenuItem value={10}>Newest first</MenuItem>
                  <MenuItem value={20}>Oldest first</MenuItem>
                  <MenuItem value={30}>Highest enrollments</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
