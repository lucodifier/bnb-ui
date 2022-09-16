import * as React from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  MenuItem,
} from "@material-ui/core";
import useStyles from "./NewTransfer.Style";
import SearchIcon from "@material-ui/icons//Search";
import Header from "../../layouts/components/Header";
import RadioButton from "../../layouts/components/RadioButton";
import Alert from "../../layouts/components/Alert";
import BankModal from "./BankSearchModal";
import { BancoModel } from "../../models/Banco.model";

export function NewTransfer() {
  const classes = useStyles();

  const [valueTitular, setValueTitular] = React.useState("same");
  const [error, setError] = React.useState("CPF Inválido");
  const [hasError, setHasError] = React.useState(false);
  const [account, setAccount] = React.useState(1);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [bank, setBank] = React.useState<BancoModel>({
    idBanco: 0,
    ispbBanco: "",
    nomeBanco: "",
  });

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueTitular((event.target as HTMLInputElement).value);
  };

  const closeError = () => {
    setHasError(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const setBankSelected = (newBank: any) => {
    setBank(newBank);
    setModalIsOpen(false);
  };

  const tipoContas = [
    { id: 1, nome: "Conta Corrente" },
    { id: 2, nome: "Conta Poupança" },
  ];

  return (
    <React.Fragment>
      <Header
        title='Pix - Pagar com Agência e Conta'
        titleMobile='Pagar com Agência e Conta'
      />
      <Alert
        error={error}
        hasError={hasError}
        closeErrorFunction={closeError}
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
            id='acount-type-input'
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
            id='acount-input'
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
            size='large'
            onClick={() => setHasError(!hasError)}>
            <span>CONTINUAR</span>
          </Button>
        </Grid>
      </Grid>
      <BankModal />
    </React.Fragment>
  );
}
