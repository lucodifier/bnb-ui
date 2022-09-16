import { createTheme } from "@material-ui/core/styles";
//require("typeface-lato");
import "typeface-lato";
//import 'typeface-roboto';

// A custom theme for this app
const theme = createTheme({
  typography: {
    // useNextVariants: true,
    fontFamily: "Lato",
  },
  // overrides: {
  //   MuiDrawer: {
  //     paper: {
  //       background: "#a6193c",
  //       "& *": { color: "#fff" },
  //     },
  //   },
  //   MuiExpansionPanel: {
  //     root: {
  //       backgroundColor: "#fafafa",
  //     },
  //   },
  //   MuiListItemText: {
  //     root: {
  //       "& *": { color: "#fff" },
  //     },
  //   },
  //   MuiTableCell: {
  //     head: {
  //       fontWeight: 700,
  //       fontSize: "small",
  //       color: "#000",
  //     },
  //   },
  //   MuiListItemIcon: {
  //     root: {
  //       minWidth: "30px",
  //     },
  //   },
  // },
  palette: {
    primary: {
      main: "#a6193c",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f88a27",
      contrastText: "#ffffff",
    },
  },
});

export default theme;
