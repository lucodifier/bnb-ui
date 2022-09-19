import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import useStyles from "./NovaTransferencia.Style";
import SearchIcon from "@material-ui/icons//Search";
import Header from "../../layouts/components/Header";
import RadioButton from "../../layouts/components/RadioButton";

import BankModal from "./BankSearchModal";
import { BancoModel } from "../../models/Banco.model";

const snackInitialForm = {
  open: false,
  message: "",
  severity: "success" as any,
};

const MSG_CPF_INVALIDO = "CPF inválido";

export function NovaTransferencia() {
  const classes = useStyles();

  const [valueTitular, setValueTitular] = useState("same");
  const [account, setAccount] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bank, setBank] = useState<BancoModel>({
    idBanco: 0,
    ispbBanco: "",
    nomeBanco: "",
  });
  const [snack, setSnack] = useState(snackInitialForm);

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueTitular((event.target as HTMLInputElement).value);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const setBankSelected = (newBank: any) => {
    setBank(newBank);
    setModalIsOpen(false);
  };

  const handleSnackClose = () => {
    setSnack({ ...snack, open: false });
  };

  const validarCpf = (cpf: string) => {
    setSnack({
      open: true,
      message: MSG_CPF_INVALIDO,
      severity: "error",
    });
  };

  return (
    <React.Fragment>
      <Header
        title='Pix - Pagar com Agência e Conta'
        titleMobile='Pagar com Agência e Conta'
      />

      <Grid container spacing={1} className={classes.main_header}>
        <Grid item xs={12} md={12} sm={12}>
          <Typography className={classes.title_account_data}>
            Quais os dados da conta?
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} className={classes.input_row}>
        <Grid item xs={12} md={3} sm={12}>
          <TextField
            className={classes.text_field_input}
            id='bank-input'
            label='Banco'
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            onClick={() => setModalIsOpen(!modalIsOpen)}
            value={bank.nomeBanco}
            InputProps={{
              readOnly: true,
              endAdornment: <SearchIcon></SearchIcon>,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3} sm={12}>
          <TextField
            className={classes.text_field_input}
            id='account-type-input'
            label='Tipo de Conta'
            variant='outlined'
            select
            value={account}
            onChange={(e) => setAccount(parseInt(e.target.value))}
            InputLabelProps={{ shrink: true }}>
            <MenuItem value={1}>Conta Corrente</MenuItem>
            <MenuItem value={2}>Conta Poupança</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={3} sm={12}>
          <TextField
            className={classes.text_field_input}
            id='agency-input'
            label='Agência'
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            placeholder='0000'
          />
        </Grid>
        <Grid item xs={12} md={3} sm={12}>
          <TextField
            className={classes.text_field_input}
            id='account-input'
            label='Conta'
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            placeholder='0000000000-0'
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} className={classes.input_row}>
        <Grid
          item
          xs={12}
          md={3}
          sm={12}
          className={classes.grid_radio_container}>
          <div className={classes.radio_container}>
            <FormControlLabel
              value='same'
              checked={valueTitular === "same"}
              control={<RadioButton onChange={handleChangeRadio} />}
              label={
                <Typography className={classes.radio_label}>
                  Mesma titularidade
                </Typography>
              }
              className={classes.radio_label}
            />
            <FormControlLabel
              value='other'
              checked={valueTitular === "other"}
              control={<RadioButton onChange={handleChangeRadio} />}
              label={
                <Typography className={classes.radio_label}>
                  Outra titularidade
                </Typography>
              }
              className={classes.radio_label}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={3} sm={12}>
          <TextField
            className={classes.text_field_input}
            id='cpf-input'
            label='CPF/CNPJ'
            variant='outlined'
            onBlur={(e) => validarCpf(e.target.value)}
            InputLabelProps={{ shrink: true }}
            placeholder='000.000.000-00'
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            className={classes.text_field_input}
            id='name-input'
            label='Nome Completo'
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            placeholder='PM ALEXANDRE MOTA ITAU'
          />
        </Grid>
      </Grid>

      <BankModal
        modalIsOpen={modalIsOpen}
        modalClose={closeModal}
        selectNewBank={setBankSelected}
      />

      <Grid container spacing={2} className={classes.submit_button_container}>
        <Grid item xs={12} md={2} sm={12}>
          <Button
            classes={{ root: classes.submit_button }}
            variant='contained'
            color='primary'
            size='large'>
            <span>CONTINUAR</span>
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        {...snack}
        style={{ width: "100%" }}
        autoHideDuration={5000}
        onClose={handleSnackClose}>
        <Alert
          variant='filled'
          onClose={handleSnackClose}
          severity={snack.severity}
          style={{ width: "90%", backgroundColor: "#ebae2a" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
