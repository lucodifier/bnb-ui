import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container, ThemeProvider } from "@material-ui/core";
import theme from "./Theme/theme";
import { Outlet } from "react-router-dom";
import layoutStyle from "./Layout.style";

export default function Layout() {
  const classes = layoutStyle();
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <Container className={classes.root}>
          <Outlet />
        </Container>
      </React.Fragment>
    </ThemeProvider>
  );
}
