import { makeStyles } from "@material-ui/core";

export const useStylesPixComChave = makeStyles({
  main: {
    padding: "12px",
    "@media (max-width:600px)": {
      padding: "0",
    },
  },
  card_link: {
    backgroundColor: "#a6193c",
    color: "#fff",
    border: 0,
    borderRadius: 3,
    textAlign: "center",
    height: "6em",
    padding: "15px",
    marginRight: "0.5em",
  },
  indicatorFavoritos: {
    display: "flex",
    justifyContent: "center",
    background: "transparent",
    width: 50,
    "& > span": {
      maxWidth: "4.5em",
      width: "100%",
      backgroundColor: "#a6193c",
    },
  },
  indicatorTransferencias: {
    display: "flex",
    justifyContent: "center",
    background: "transparent",
    width: 50,
    "& > span": {
      maxWidth: "11.8em",
      width: "100%",
      backgroundColor: "#a6193c",
    },
  },
  tabStyle: {
    fontWeight: 600,
    textTransform: "none",
    "&.Mui-selected": {
      color: "#a6193c",
    },
    color: "#a3a3a3",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  pageableIcon: {
    fontSize: "16px",
    "@media (max-width:600px)": {
      fontSize: "14px",
    },
  },

  pageablePages: {
    fontSize: "14px",
  },

  appBarStyle: {
    backgroundColor: "#ebebeb",
    borderRadius: "1px",
  },
});
