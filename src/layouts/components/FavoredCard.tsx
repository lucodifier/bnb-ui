import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { ArrowIcon } from "../../../assets/icons/iconsSvg";
import { LoginContext } from "../../Contexts/LoginContext";
import { FavorecidoModel } from "../../models/Favorecido.model";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "2% auto",
    "@media (max-width:600px)": {
      margin: "5% auto",
    },
  },
  cards_blocks: {
    display: "flex",
    alignItems: "center",
    textAlign: "start",
    background: "#FFFFFF",
    border: "1px solid #DADADA",
    boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.3)",
    borderRadius: "6px",
    height: "7rem",
    padding: "0% 1%",
    "@media (max-width:600px)": {
      padding: "0% 3%",
    },
  },
  card_user_text: {
    fontSize: "1rem",
    color: "#a6193c",
    fontWeight: "bold",
    "@media (max-width:600px)": {
      fontSize: "0.9rem",
    },
    "@media (max-width:400px)": {
      fontSize: "0.8rem",
    },
  },
  card_user_sub_text: {
    fontSize: "0.8rem",
    color: "#656565",
    "@media (max-width:600px)": {
      fontSize: "0.8rem",
    },
    "@media (max-width:400px)": {
      fontSize: "0.7rem",
    },
  },
  user_avatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#D9D9D9",
    borderRadius: "50px",
    width: "77px",
    height: "77px",
    color: "#565656",
    fontSize: "2rem",
    "@media (max-width:800px)": {
      width: "60px",
      height: "60px",
      fontSize: "2rem",
    },
    "@media (max-width:600px)": {
      width: "50px",
      height: "50px",
      fontSize: "1.5rem",
    },
  },
  arrow_back_user: {
    textAlign: "end",
  },
  user_body: {
    paddingLeft: "2%",
    "@media (max-width:600px)": {
      paddingLeft: "10%",
    },
  },
}));

export default function FavoredCard(props: any) {
  const navigate = useNavigate();
  const { setFavorecido } = useContext(LoginContext);

  const selecionarFavorecido = () => {
    try {
      const conta = props.account?.split("|")[0].trim();
      const agencia = props.account?.split("|")[1].split("-")[0].trim();
      const digito = props.account?.split("|")[1].split("-")[1].trim();

      const favorecido = {
        nomeDestinatario: props.name,
        nomeBanco: props.bank,
        cpfCnpjDestinatario: props.document,
        tipoConta: props.accountType,
        codAgencia: agencia ? Number(agencia) : 0,
        codConta: conta ? Number(conta) : 0,
        digitoValidadorConta: digito,
        apelido: props.apelido,
      };

      if (setFavorecido) setFavorecido(favorecido as FavorecidoModel);

      navigate(props.to);
    } catch {
      console.info("Não selecionou o favorecido");
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root} key={props.key}>
      <Grid item xs={12} md={12} sm={12}>
        <Card
          className={classes.cards_blocks}
          style={{ cursor: "pointer" }}
          onClick={() => selecionarFavorecido()}>
          <Grid item xs={1} md={1} sm={1}>
            <div className={classes.user_avatar}>{props.name[0]}</div>
          </Grid>
          <Grid item xs={10} md={10} sm={10} className={classes.user_body}>
            <Typography className={classes.card_user_text}>
              {`${props.name} ${
                props.apelido ? "(" + props.apelido + ")" : ""
              }`}
            </Typography>
            <Typography className={classes.card_user_sub_text}>
              {props.bank}
            </Typography>
            <Typography className={classes.card_user_sub_text}>
              {props.account}{" "}
              {props.accountType == "C" ? "(Conta corrente)" : "(Poupança)"}
            </Typography>
          </Grid>
          <Grid item xs={1} md={1} sm={1} className={classes.arrow_back_user}>
            <Link to='/home'>
              <ArrowIcon />
            </Link>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
}
