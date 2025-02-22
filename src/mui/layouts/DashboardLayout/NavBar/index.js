import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
  Book as BookIcon,
  Activity as ActivityIcon,
  DollarSign as DollarSignIcon,
} from "react-feather";
import NavItem from "./NavItem";

const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
};

const itemsTop = [
  {
    href: "/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/dashboard/users",
    icon: UsersIcon,
    title: "Users",
  },
  {
    href: "/dashboard/courses",
    icon: BookIcon,
    title: "Courses",
  },
  {
    href: "/dashboard/orders",
    icon: ShoppingBagIcon,
    title: "Orders",
  },
];

const itemsMid = [
  {
    href: "/dashboard/sales",
    icon: ActivityIcon,
    title: "Sales",
  },
  {
    href: "/dashboard/financials",
    icon: DollarSignIcon,
    title: "Financials",
  },
];

const itemsBottom = [
  {
    href: "/dashboard/account",
    icon: UserIcon,
    title: "Account",
  },
  {
    href: "/dashboard/settings",
    icon: SettingsIcon,
    title: "Settings",
  },
];

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
    marginTop: 16,
  },
  name: {
    marginTop: 16,
  },
  navHeading: {
    color: theme.palette.text.secondary,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "0.8rem",
    marginTop: theme.spacing(2),
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/dashboard/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <Typography className={classes.navHeading}>MANAGEMENT</Typography>
        <List>
          {itemsTop.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
        <Typography className={classes.navHeading}>REPORT</Typography>
        <List>
          {itemsMid.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
        <Typography className={classes.navHeading}>EXTRAS</Typography>
        <List>
          {itemsBottom.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
