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
  valorTransferencia: {
    color:theme.palette.primary.dark,
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  saldo: {
    fontSize: "1.1rem",
  }
}));

export default useStyles;
