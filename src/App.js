import React from "react";

import "./App.css";
import "./styles/styles.css";
import "./styles/margins.css";

import "react-perfect-scrollbar/dist/css/styles.css";
import "./mui/mixins/chartjs";

import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";

import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Home from "./mui/views/home";
import Error from "./mui/views/errors/NotFoundView";
import DashboardLayout from "./mui/layouts/DashboardLayout";

import PrivateRoute from "./components/HOC/PrivateRoute";
import GlobalStyles from "./mui/extras/GlobalStyles";
import { createMuiTheme, colors } from "@material-ui/core";
import shadows from "./mui/theme/shadows";
import typography from "./mui/theme/typography";
import { createContext } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { isUserLoggedIn } from "./redux/actions/auth.actions";
// import routes from "./routes";

// creating global contexts
export const themeContext = createContext();

const darkMode = localStorage.getItem("isDarkModeEnabled");

function App() {
  // managing local states
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(
    darkMode === "no" ? false : true
  );

  // managing global auth state
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserLoggedIn());
    }
  }, []);

  const themeOptions = {
    type: isDarkModeEnabled ? "dark" : "light",
    dark: isDarkModeEnabled ? "#222431" : "#eeeeee",
    default: isDarkModeEnabled ? colors.blueGrey[900] : colors.blueGrey[50],
    paper: isDarkModeEnabled ? "#2a2d3d" : "#ffffff",
    primaryMain: isDarkModeEnabled ? colors.indigo[600] : colors.blue[600],
    secondaryMain: isDarkModeEnabled ? colors.indigo[800] : colors.blue[500],
    dashboardLink: isDarkModeEnabled ? colors.indigo[400] : colors.indigo[700],
    textPrimary: isDarkModeEnabled ? colors.grey[100] : colors.grey[900],
    textSecondary: isDarkModeEnabled ? colors.grey[500] : colors.grey[600],
    divider: isDarkModeEnabled ? colors.grey[500] : colors.grey[400],
    secondaryBars: isDarkModeEnabled ? colors.blueGrey[700] : colors.grey[400],
    hover: isDarkModeEnabled ? colors.blueGrey[900] : colors.grey[100],
  };

  // theming
  const theme = createMuiTheme({
    palette: {
      type: themeOptions.type,
      background: {
        dark: themeOptions.dark,
        default: themeOptions.default,
        paper: themeOptions.paper,
      },
      action: {
        hover: themeOptions.hover,
      },
      primary: {
        main: themeOptions.primaryMain,
      },
      secondary: {
        main: themeOptions.secondaryMain,
      },
      dashboardLink: {
        main: themeOptions.dashboardLink,
      },
      text: {
        primary: themeOptions.textPrimary,
        secondary: themeOptions.textSecondary,
      },
      divider: themeOptions.divider,
      secondaryBars: themeOptions.secondaryBars,
    },
    shadows,
    typography,
  });

  // const routing = routerDom.useRoutes(routes);
  return (
    <div className="App">
      <themeContext.Provider
        value={{ isDarkModeEnabled, setIsDarkModeEnabled }}
      >
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {/* {routing} */}
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/dashboard" component={DashboardLayout} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/error" component={Error} />
          </Switch>
        </ThemeProvider>
      </themeContext.Provider>
    </div>
  );
}

export default App;
