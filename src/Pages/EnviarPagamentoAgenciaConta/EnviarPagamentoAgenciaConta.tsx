import React, { useState, useContext } from "react";
import Header from "../../layouts/components/Header";
import { Grid, Typography } from "@material-ui/core";
import useStyles from "./EnviarPagamentoAgenciaConta.Style";
import FavoredCard from "../../layouts/components/FavoredCard";
import { FavorecidoContext } from "../../Contexts/FavorecidoContext";

export function EnviarPagamentoAgenciaConta() {
  const classes = useStyles();
  const { favorecido } = useContext(FavorecidoContext);

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
          {favorecido && (
            <FavoredCard
              name={favorecido.nomeDestinatario}
              apelido={""}
              bank={favorecido.nomeBanco}
              account={`${favorecido.codAgencia} | ${favorecido.codConta}-${favorecido.digitoValidadorConta}`}
              accountType={favorecido.tipoConta}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
