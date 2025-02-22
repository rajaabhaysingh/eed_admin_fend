import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../../../extras/Page";
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Account = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={4} md={4} xs={12}>
            <Profile />
          </Grid>
          <Grid item lg={8} md={8} xs={12}>
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
