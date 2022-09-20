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
  title_account_data: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: "1.1rem",
    "@media (max-width:600px)": {
      fontSize: "1rem",
    },
  },
  text_field_input: {
    width: "100%",
  },
  radio_group_input: {
    display: "flex",
    flexDirection: "row",
  },
  radio_container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  radio_label: {
    textAlign: "center",
    fontSize: "0.8rem",
    width: "100%",
    marginRight: "0px",
    marginLeft: "0px",
    color: "#656565",
    "@media (max-width:1200px)": {
      fontSize: "0.6rem",
    },
    "@media (max-width:1000px)": {
      fontSize: "1rem",
    },
    "@media (max-width:400px)": {
      fontSize: "0.8rem",
    },
  },
  grid_radio_container: {
    display: "flex",
    alignItems: "center",
  },
  input_row: {
    paddingBottom: "2%",
  },
  submit_button_container: {
    display: "flex",
    justifyContent: "center",
    bottom: 0,
  
    "@media (max-width:800px)": {
      marginTop: "0",
    },
  },
  submit_button: {
    backgroundColor: "#F2711C",
    color: "#fff",
    borderRadius: 5,
    textAlign: "center",
    width: "100%",
    fontSize: "14px",
  },
  "&:active": {
    backgroundColor: "#F2711C",
  },
}));

export default useStyles;
