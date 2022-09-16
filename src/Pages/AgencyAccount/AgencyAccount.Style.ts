import { makeStyles } from "@material-ui/core";
import theme from "../../layouts/Theme/theme";

const useStyles = makeStyles((theme) => ({
  main_header: {
    display: "flex",
    alignItems: "center",
    color: "#656565",
    marginBottom: "2.5%",
    "@media (max-width:600px)": {
      marginBottom: "5%",
    },
  },
  title_header: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    "@media (max-width:600px)": {
      fontSize: "1.1rem",
    },
    "@media (max-width:400px)": {
      fontSize: "1rem",
    },
  },
  title_transfer: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: "1.1rem",
    "@media (max-width:600px)": {
      fontSize: "1rem",
    },
  },
  back_btn: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.7rem",
    fontWeight: "bold",
    color: "#656565",
    textDecoration: "none",
  },
  icon_margin: {
    marginRight: "5px",
  },
  title_new_transfer: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.9rem",
    color: "#656565",
    cursor: "pointer",
  },
  tab_custom: {
    color: "#656565",
    fontSize: "0.9rem",
    fontWeight: "bold",
    "@media (max-width:400px)": {
      fontSize: "0.8rem",
    },
  },
  tab_custom_selected: {
    color: "#A6193C",
    fontSize: "0.9rem",
    fontWeight: "bold",
    "@media (max-width:400px)": {
      fontSize: "0.8rem",
    },
  },
  tabsPanel_custom: {
    padding: "1% 0px"
  },
  tabs_container_custom: {
    backgroundColor: "#f6f6f6",
    boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.25)",
  },

  indicator: {
    backgroundColor: "#A6193C",
    height: "3px",
  }
  }));
  
  export default useStyles;
  