import React, { useState, useContext, useSyncExternalStore } from "react";
import Header from "../../layouts/components/Header";
import { Grid, Typography } from "@material-ui/core";
import useStyles from "./EnviarPagamentoAgenciaConta.Style";
import { LoginContext } from "../../Contexts/LoginContext";
import CardFavorecido from "../../layouts/components/CardFavorecido";
import { toCurrency } from "../../../services/util.service";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

export function EnviarPagamentoAgenciaConta() {
  const classes = useStyles();

  const [valorTransferencia, setValorTransferencia] = useState(50.01);
  const [saldo, setSaldo] = useState(500100.2);

  return (
    <>
      <Header
        title='Pix - Pagar com Agência e Conta'
        titleMobile='Pagar com Agência e Conta'
      />
      <Grid container spacing={1} className={classes.main_header}>
        <Grid item xs={12} md={12} sm={12}>
          <Typography className={classes.title_transfer}>
            Enviar pagamento para
          </Typography>
        </Grid>

        <Grid item xs={12} md={12} sm={12}>
          <CardFavorecido />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <Typography className={classes.valorTransferencia}>
            {toCurrency(valorTransferencia)} <EditIcon />
          </Typography>

          <Typography className={classes.saldo}>
            Saldo: {toCurrency(saldo)} <VisibilityIcon />
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
