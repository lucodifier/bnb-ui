import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

// Icons
import {
  PaymentVoucherIcon,
  ExtractIcon,
  PixIcon,
  MyQRCodeIcon,
  FavoritesIcon,
  MyLimitsIcon,
  LocationsIcon,
  ContestationIcon,
  ComplainIcon,
} from "../../../assets/icons/iconsSvg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    margin: "auto",
    maxWidth: 500,
  },
  grid_card: {
    height: "60px",
    "@media (max-width:600px)": {
      height: "auto",
    },
  },
  title: {
    color: "#a6193c",
    fontWeight: "bold",
    fontSize: "0.8rem",
    paddingTop: "5px",
    "@media (max-width:600px)": {
      padding: "5px 0px 0px 10px",
    },
  },
  title_without_icon: {
    color: "#a6193c",
    fontWeight: "bold",
    padding: "12px 0px 0px 5px",
    "@media (max-width:600px)": {
      fontSize: "0.8rem",
      padding: "5px 0px 0px 10px",
    },
  },
  icon: {
    marginTop: "8px",
    width: "40px",
    height: "35px",
    "@media (max-width:600px)": {
      marginTop: "5px",
      width: "30px",
      height: "30px",
    },
  },
  link: {
    fontSize: "0.7rem",
    color: "#656565",
    paddingRight: "10px",
    "@media (max-width:600px)": {
      display: "none",
    },
  },
}));

export default function IconCard(props: any) {
  const classes = useStyles();

  function renderIcon() {
    if (props.icon == "extrato") {
      return <ExtractIcon />;
    }
    if (props.icon == "comprovantes") {
      return <PaymentVoucherIcon />;
    }
    if (props.icon == "chaves") {
      return <PixIcon />;
    }
    if (props.icon == "qrcodes") {
      return <MyQRCodeIcon />;
    }
    if (props.icon == "favoritos") {
      return <FavoritesIcon />;
    }
    if (props.icon == "meuslimites") {
      return <MyLimitsIcon />;
    }
    if (props.icon == "locais") {
      return <LocationsIcon />;
    }
    if (props.icon == "contestacao") {
      return <ContestationIcon />;
    }
    if (props.icon == "reclame") {
      return <ComplainIcon />;
    }
  }

  function toLink() {
    if (!props.itens) {
      if (props.to) {
        // navigate to link
        alert(props.to);
      }
    }
  }

  return (
    <div className={classes.root}>
      <Paper
        className={classes.paper}
        onClick={toLink}
        style={{ cursor: `${!props.itens ? "pointer" : ""}` }}>
        <Grid container spacing={1}>
          <Grid item className={classes.icon}>
            {renderIcon()}
          </Grid>
          <Grid item xs={9} className={classes.grid_card}>
            <Typography
              className={
                props.itens ? classes.title : classes.title_without_icon
              }>
              {props.title}
            </Typography>
            <Typography>
              {props.itens &&
                props.itens.map((item: any, index: number) => (
                  <Link className={classes.link} to={item.link} key={index}>
                    {item.title}
                  </Link>
                ))}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
