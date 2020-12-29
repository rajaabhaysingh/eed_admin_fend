import React, { useState } from "react";
import { Redirect, Switch, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";

import Dashboard from "../../views/reports";
import Customer from "../../views/customer/CustomerListView";
import Product from "../../views/product/ProductListView";
import Account from "../../views/account/AccountView";
import Settings from "../../views/settings/SettingsView";

import PrivateRoute from "../../../components/HOC/PrivateRoute";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    // borderLeft: "1px solid #444444",
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
    color: theme.palette.text.primary,
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  let { path } = useRouteMatch();

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {/* <Outlet /> */}
            <Switch>
              <PrivateRoute path={path} exact strict component={Dashboard} />
              <PrivateRoute path={`${path}/users`} component={Customer} />
              <PrivateRoute path={`${path}/courses`} component={Product} />
              <PrivateRoute path={`${path}/orders`} component={() => "Order"} />
              <PrivateRoute path={`${path}/sales`} component={() => "Sales"} />
              <PrivateRoute
                path={`${path}/financials`}
                component={() => "Financials"}
              />
              <PrivateRoute path={`${path}/account`} component={Account} />
              <PrivateRoute path={`${path}/settings`} component={Settings} />
              <Redirect to="/error" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
