import React, { useState, useEffect } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "../../mui/extras/Page";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../redux/actions";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const RegisterView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // local state management
  const [error, setError] = useState("");

  const authState = useSelector((state) => state.auth);
  const signupState = useSelector((state) => state.signup);

  // handleSignup
  const handleSignup = (formValues) => {
    const formData = new FormData();

    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    formData.append("firstName", formValues.firstName);
    formData.append("lastName", formValues.lastName);
    formData.append("middleName", formValues.middleName);
    formData.append("profilePicture", formValues.profilePicture);

    dispatch(signup(formData));
  };

  // if signup fails
  useEffect(() => {
    if (signupState.error) {
      setError(signupState.error);
    } else {
      setError("");
    }
  }, [signupState.error]);

  // if user is logged in, he/she will be redirected to dashboard even if he/she tries to signup
  if (authState.authenticated) {
    console.log("You need to logout first.");
    return <Redirect to="/dashboard" />;
  }

  // if signup is successful
  if (signupState.registered) {
    return <Redirect to="/login" />;
  }

  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "",
              firstName: "",
              middleName: "",
              lastName: "",
              password: "",
              profilePicture: null,
              policy: false,
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              firstName: Yup.string()
                .max(255)
                .required("First name is required"),
              lastName: Yup.string().max(255).required("Last name is required"),
              password: Yup.string().max(255).required("password is required"),
              policy: Yup.boolean().oneOf([true], "This field must be checked"),
            })}
            onSubmit={(values) => {
              handleSignup(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Create new Admin account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account.
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name*"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Middle name*"
                  margin="normal"
                  name="middleName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.middleName}
                  variant="outlined"
                  size="small"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Last name*"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                  size="small"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address*"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                  size="small"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password*"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                  size="small"
                />
                <Box alignItems="center" display="flex" ml={-1}>
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    I have read the{" "}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                {error && (
                  <Box>
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {error}
                    </Alert>
                  </Box>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={signupState.loading || isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{" "}
                  <Link component={RouterLink} to="/login" variant="h6">
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
