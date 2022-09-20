import React, { useState, useContext } from "react";
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
import ModalBancos from "./ModalBancos";
import { BancoModel } from "../../models/Banco.model";
import { storageService } from "../../../services/storage.service";
import {
  formatDocument,
  validateCNPJ,
  validateCPF,
} from "../../../services/util.service";
import { FavorecidoModel } from "../../models/Favorecido.model";
import { LoginContext } from "../../Contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../Constants/Routes";
import { maskAcc, maskDoc } from "../../../services/mask";

const snackInitialForm = {
  open: false,
  message: "",
  severity: "success" as any,
};

const MSG_CPF_INVALIDO = "CPF inválido";
const MSG_SEM_BANCOS =
  "Não foi possível localizar bancos. Tente novamente mais tarde";
const MSG_OBRIGATORIOS = "Informe todos os campos!";

export function NovaTransferencia() {
  const classes = useStyles();
  const { setFavorecido } = useContext(LoginContext);
  const navigate = useNavigate();

  const [snack, setSnack] = useState(snackInitialForm);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [bancoSelecionado, setBancoSelecionado] = useState<BancoModel>({
    idBanco: 0,
    ispbBanco: "",
    nomeBanco: "",
  });

  const [tipoConta, setTipoConta] = useState("C");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState("");
  const [valueTitular, setValueTitular] = useState("other");
  const [cpf, setCPF] = useState("");
  const [nome, setNome] = useState("");

  const selecionaBanco = (banco: BancoModel) => {
    setBancoSelecionado(banco);
    setModalIsOpen(false);
  };

  const buscaBancoErros = (error: boolean) => {
    if (error) {
      setSnack({
        open: true,
        message: MSG_SEM_BANCOS,
        severity: "error",
      });
      setModalIsOpen(false);
    }
  };

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueTitular((event.target as HTMLInputElement).value);

    if ((event.target as HTMLInputElement).value === "same") {
      var user_session = storageService.recover("user_session");
      if (user_session) setCPF(formatDocument(user_session.documento));
    } else {
      setCPF("");
    }
  };

  const closeModal = () => {
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

  const handleConta = (conta) => {
    setConta(maskAcc(conta));
  };

  const handleCPF = (cpf) => {
    cpf = maskDoc(cpf);
    setCPF(cpf);

    if (cpf) {
      if (cpf.length !== 14 && cpf.length < 14) {
        setSnack({
          open: true,
          message: MSG_CPF_INVALIDO,
          severity: "error",
        });
      }

      if (cpf.length === 14) {
        if (!validateCPF(cpf)) {
          setSnack({
            open: true,
            message: MSG_CPF_INVALIDO,
            severity: "error",
          });
        }
      }

      if (cpf.length === 18) {
        if (!validateCNPJ(cpf)) {
          setSnack({
            open: true,
            message: MSG_CPF_INVALIDO,
            severity: "error",
          });
        }
      }

      if (cpf.length !== 18 && cpf.length < 18 && cpf.length > 14) {
        setSnack({
          open: true,
          message: MSG_CPF_INVALIDO,
          severity: "error",
        });
      }
    }
  };

  const handleContinuar = () => {
    if (bancoSelecionado.idBanco === 0 || !agencia || !conta || !cpf || !nome) {
      setSnack({
        open: true,
        message: MSG_OBRIGATORIOS,
        severity: "error",
      });
      return;
    }

    const somenteConta = conta?.split("-")[0].trim();
    const digito = conta?.split("-")[1].trim();

    const favorecido = {
      nomeDestinatario: nome,
      nomeBanco: bancoSelecionado.nomeBanco,
      ispb: bancoSelecionado.ispbBanco,
      cpfCnpjDestinatario: cpf,
      tipoConta: tipoConta,
      codAgencia: agencia ? Number(agencia) : 0,
      codConta: conta ? Number(somenteConta) : 0,
      digitoValidadorConta: digito,
      apelido: "",
    };

    if (setFavorecido) setFavorecido(favorecido as FavorecidoModel);

    navigate(`/${Routes.EnviarPagamentoAgenciaConta}`);
  };

  return (
    <React.Fragment>
      <Header
        title='Pix - Pagar com Agência e Conta'
        titleMobile='Pagar com Agência e Conta'
      />

      <ModalBancos
        modalIsOpen={modalIsOpen}
        modalClose={closeModal}
        selecionaBanco={selecionaBanco}
        buscaBancoErros={buscaBancoErros}
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
            value={bancoSelecionado.nomeBanco}
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
            value={tipoConta}
            onChange={(e) => setTipoConta(e.target.value)}
            InputLabelProps={{ shrink: true }}>
            <MenuItem value={"C"}>Conta Corrente</MenuItem>
            <MenuItem value={"P"}>Conta Poupança</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={3} sm={12}>
          <TextField
            className={classes.text_field_input}
            id='agency-input'
            label='Agência'
            variant='outlined'
            value={agencia}
            onChange={(e) => setAgencia(e.target.value)}
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
            value={conta}
            onChange={(e) => handleConta(e.target.value)}
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
            value={cpf}
            onChange={(e) => handleCPF(e.target.value)}
            disabled={valueTitular === "same"}
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
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            InputLabelProps={{ shrink: true }}
            placeholder='Nome completo'
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} className={classes.submit_button_container}>
        <Grid item xs={12} md={2} sm={12}>
          <Button
            classes={{ root: classes.submit_button }}
            variant='contained'
            color='primary'
            onClick={() => handleContinuar()}
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
