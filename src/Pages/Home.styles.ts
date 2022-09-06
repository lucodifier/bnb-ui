import { makeStyles } from "@material-ui/core";
import theme from "../layouts/Theme/theme";

const useStyles = makeStyles((theme) => ({
  card_link: {
    backgroundColor: "primary", //TODO: Pegar do theme
    color: "#fff",
    border: 0,
    borderRadius: 10,
    textAlign: "center",
    height: "100%",
    padding: "10px",
    width: "100%",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "16px",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
  },
  cards_blocks: {
    display: "flex",
    alignItems: "center",
    textAlign: "start",
    background: "#FFFFFF",
    border: "1px solid #DADADA",
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
    borderRadius: "6px",
    padding: "0px 5%",
    height: "8rem",
    "@media (max-width:800px)": {
      height: "7rem",
    },
  },
  card_key_text: {
    fontSize: "1.2rem",
    color: "#656565",
    fontWeight: "bold",
  },
  card_key_sub_text: {
    fontSize: "0.8rem",
    color: "#656565",
    fontWeight: "bold",
  },

  title_section: {
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "23px",
  },
  section_grid: {
    marginTop: "40px",
  },
  user_title: {
    fontWeight: 700,
    fontSize: "1.1rem",
    lineHeight: "28px",
    color: "#686868",
    paddingBottom: "0px",
  },
  actions_card_usuario: {
    flexDirection: "column",
    alignItems: "start",
  },
  conteudo_card_usuario: {
    width: "50%",
  },
  text_action: {
    textAlign: "start",
    marginLeft: "8px",
    color: "#686868",
    fontSize: "0.8rem",
  },
  button_text_actions: {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#a6193c",
    fontSize: "0.9rem",
  },

  button_receber: {
    margin: "auto",
    background: "#F7F7F7",
    border: "1px solid #C7C7C7",
    borderRadius: "6px",
    width: "98px",
    height: "98px",
    "@media (max-width:600px)": {
      width: "80px",
      height: "80px",
    },
  },
  text_receber: {
    fontWeight: "bold",
    color: "#a6193c",
    fontSize: "0.8rem",
    paddingLeft: "-20px",
    textDecoration: "none",
  },
  icon_receber: {
    margin: "auto",
    padding: "5px 0 0 0 ",
    width: "50px",
    height: "40px",
    "@media (max-width:600px)": {
      width: "40px",
      height: "40px",
    },
  },
  text_cards: {
    fontWeight: 500,
    fontSize: "1vw",
    lineHeight: "16px",
    textDecorationLine: "underline",
    color: "#656565",
    "@media (max-width:600px)": {
      visibility: "hidden",
    },
  },
  label: {
    flexDirection: "column",
  },
  card_blocks_icone: {
    width: "34px",
    height: "40px",
  },
  text_button: {
    paddingTop: "15px",
  },
}));

export default useStyles;
