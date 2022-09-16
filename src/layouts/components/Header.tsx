import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    color: "#656565",
    marginBottom: "2.5%",
    "@media (max-width:600px)": {
      marginBottom: "5%",
    },
  },
  back_btn: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.7rem",
    fontWeight: "bold",
    color: "#656565",
    textDecoration: "none",
    "@media (max-width:600px)": {
      display: "none",
    },
  },
  icon_margin: {
    marginRight: "5px",
  },
  title_header: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    "@media (max-width:600px)": {
      display: "none",
      fontSize: "1.1rem",
    },
  },
  title_header_mobile: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    display: "none",
    color: "#A6193C",
    "@media (max-width:600px)": {
      display: "inline",
      fontSize: "1.1rem",
    },
    "@media (max-width:400px)": {
      fontSize: "1rem",
    },
  },
}));

export default function Header(props: any) {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={1} className={classes.header}>
        <Grid item xs={10} md={5} sm={5}>
          <Link to='/home' className={classes.back_btn}>
            <ArrowBackIcon className={classes.icon_margin} />
            Voltar
          </Link>
          <Typography className={classes.title_header_mobile}>
            {props.titleMobile}
          </Typography>
        </Grid>
        <Grid item xs={2} md={7} sm={7}>
          <Typography className={classes.title_header}>
            {props.title}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
