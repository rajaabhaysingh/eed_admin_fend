import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import MoreVert from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Logo from "../../extras/Logo";

import { useContext } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions";

// importing contexts
import { themeContext } from "../../../App";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState([]);

  const dispatch = useDispatch();

  // using imported context
  const { isDarkModeEnabled, setIsDarkModeEnabled } = useContext(themeContext);

  // local state management
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  // --- topbar menu operations ---
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // handleLogout
  const handleLogout = () => {
    dispatch(logout());
  };

  // handleChange (for dark mode switch)
  const handleChange = (e) => {
    setIsDarkModeEnabled(e.target.checked);

    const iSdarkModeOn = e.target.checked ? "yes" : "no";
    localStorage.setItem("isDarkModeEnabled", iSdarkModeOn);
  };

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* <IconButton color="inherit">
            <PowerSettingsNew />
          </IconButton> */}
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: "20ch",
              },
            }}
          >
            <MenuItem>
              <div className="fcbw w-100">
                <Typography variant="body2" gutterBottom>
                  Dark mode
                </Typography>
                <Switch
                  checked={isDarkModeEnabled}
                  onChange={handleChange}
                  name="checkedA"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </div>
            </MenuItem>
            <MenuItem>
              <Typography variant="body2" gutterBottom>
                View logs
              </Typography>
            </MenuItem>
            <MenuItem>
              <Button fullWidth variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </MenuItem>
          </Menu>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
