import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  alert: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    backgroundColor: "#F2B53F",
    marginBottom: "2.5%",
    height: "3rem",
    "@media (max-width:600px)": {
      marginBottom: "5%",
      height: "4rem",
    },
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.7rem",
  },
  icon_margin: {
    marginRight: "5px",
  },
  title_error: {
    fontSize: "1rem",
    "@media (max-width:600px)": {
      fontSize: "1.1rem",
    },
  },
  icon_close: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.7rem",
    cursor: "pointer",
  },
  display_none: {
    display: "none",
  },
}));

export default function Alert(props: any) {
  const classes = useStyles();

  const handleClose = () => {
    props.closeErrorFunction();
  };

  return (
    <div>
      {props.hasError ? (
        <Grid container spacing={1} className={classes.alert}>
          <Grid item xs={1} md={1} sm={1} className={classes.icon}>
            <ReportProblemIcon />
          </Grid>
          <Grid item xs={10} md={10} sm={10}>
            <Typography className={classes.title_error}>
              {props.error}
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            md={1}
            sm={1}
            className={classes.icon_close}
            onClick={() => handleClose()}>
            <CloseIcon />
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
}
