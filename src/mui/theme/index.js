import { createMuiTheme, colors } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";

const theme = createMuiTheme({
  palette: {
    background: {
      dark: "#222431",
      default: colors.blueGrey[900],
      paper: "#2a2d3d",
    },
    primary: {
      main: colors.indigo[600],
    },
    secondary: {
      main: colors.indigo[800],
    },
    dashboardLink: {
      main: colors.indigo[400],
    },
    text: {
      primary: colors.grey[100],
      secondary: colors.grey[500],
    },
    divider: colors.grey[500],
  },
  shadows,
  typography,
});

export default theme;
