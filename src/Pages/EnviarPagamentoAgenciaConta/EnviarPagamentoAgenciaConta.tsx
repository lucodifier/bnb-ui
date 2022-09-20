import React, { useState, useContext, useSyncExternalStore } from "react";
import Header from "../../layouts/components/Header";
import {
  Grid,
  MenuItem,
  TextField,
  Typography,
  FormControlLabel,
  FormGroup,
  Button,
} from "@material-ui/core";
import useStyles from "./EnviarPagamentoAgenciaConta.Style";
import { LoginContext } from "../../Contexts/LoginContext";
import CardFavorecido from "../../layouts/components/CardFavorecido";
import { toCurrency } from "../../../services/util.service";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import RadioButton from "../../layouts/components/RadioButton";
import InfoIcon from "@material-ui/icons/Info";

export function EnviarPagamentoAgenciaConta() {
  const classes = useStyles();

  const [valorTransferencia, setValorTransferencia] = useState(50.01);
  const [saldo, setSaldo] = useState(500100.2);
  const [momento, setMomento] = useState("hoje");

  return (
    <>
      <Header
        title="Pix - Pagar com Agência e Conta"
        titleMobile="Pagar com Agência e Conta"
      />
      <Grid container spacing={2} className={classes.main_header}>
        <Grid item xs={12} md={12} sm={12}>
          <Typography className={classes.title_transfer}>
            Enviar pagamento para
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} sm={6}>
          <CardFavorecido />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <Typography className={classes.valorTransferencia}>
            {toCurrency(valorTransferencia)} <EditIcon />
          </Typography>

          <Typography className={classes.saldo}>
            Saldo: {toCurrency(saldo)} <VisibilityIcon />
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} sm={6}>
          <TextField
            label="Descrição"
            className={classes.text_field_input}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            placeholder="Descrição (opcional)"
          />
        </Grid>
        <Grid item xs={1} md={1} sm={1}></Grid>
        <Grid item xs={12} md={12} sm={6}>
          
            <FormGroup row>
              <FormControlLabel
                value="hoje"
                checked={momento === "hoje"}
                control={<RadioButton onChange={(e) => setMomento("hoje")} />}
                label={<Typography>Pagar hoje</Typography>}
              />
              <FormControlLabel
                value="agendar"
                checked={momento === "agendar"}
                control={
                  <RadioButton onChange={(e) => setMomento("agendar")} />
                }
                label={<Typography>Agendar</Typography>}
              />
             
               <TextField
              id="datetime-local"
              variant="outlined"
              className={classes.input_agendamento}
              label="Data"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            
            </FormGroup>
          
            </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <Typography>
            <InfoIcon /> Limites Pix
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} className={classes.submit_button_container}>
        <Grid item xs={12} md={2} sm={12}>
          <Button
            classes={{ root: classes.submit_button }}
            variant='contained'
            color='primary'
            size='large'>
            <span>PAGAR</span>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
