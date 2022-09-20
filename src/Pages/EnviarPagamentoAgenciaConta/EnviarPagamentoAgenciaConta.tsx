import React, { useState } from "react";
import Header from "../../layouts/components/Header";
import {
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  FormGroup,
  Snackbar,
  Button,
} from "@material-ui/core";
import useStyles from "./EnviarPagamentoAgenciaConta.Style";
import { LoginContext } from "../../Contexts/LoginContext";
import CardFavorecido from "../../layouts/components/CardFavorecido";
import { MaskUtil, toCurrency } from "../../../services/util.service";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import RadioButton from "../../layouts/components/RadioButton";
import InfoIcon from "@material-ui/icons/Info";
import { maskValor } from "../../../services/mask";
import { Alert } from "@material-ui/lab";
import ModalSenha from "./ModalSenha";
import { SettingsInputComponent } from "@material-ui/icons";

const snackInitialForm = {
  open: false,
  message: "",
  severity: "success" as any,
};

const MSG_VALOR_NAO_INFORMADO = "Valor não informado";
const MSG_VALOR_FORA_LIMITE = "Valor maior que seu limite diário";
const MSG_DATA_AGENDAMENTO = "Informe a data do agendamento";

export function EnviarPagamentoAgenciaConta() {
  const classes = useStyles();
  const [snack, setSnack] = useState(snackInitialForm);
  const [valorTransferencia, setValorTransferencia] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [momento, setMomento] = useState("hoje");
  const [dataAgendamento, setDataAgendamento] = useState("");

  const [editandoValor, setEditandoValor] = useState(false);
  const [verSaldo, setVerSaldo] = useState(false);
  const [modalSenha, setModalSenha] = useState(false);

  const handleValor = (valor) => {
    setValorTransferencia(maskValor(valor));
  };

  const handleVerSaldo = async () => {
    if (!verSaldo) {
      const response = await buscarSaldo();
      if (response) {
        setSaldo(response);
      }
    }

    setVerSaldo(!verSaldo);
  };

  const buscarSaldo = async () => {
    return 1010524523;
  };

  const handleSnackClose = () => {
    setSnack({ ...snack, open: false });
  };

  const handleModalSenhaOpen = () => {
    setModalSenha(true);
  };

  const handleModalSenhaClose = () => {
    setModalSenha(false);
  };

  const handlePagar = async () => {
    if (valorTransferencia === 0) {
      setSnack({
        open: true,
        message: MSG_VALOR_NAO_INFORMADO,
        severity: "error",
      });
      return;
    }
    if (momento === "agendar" && dataAgendamento === "") {
      setSnack({
        open: true,
        message: MSG_DATA_AGENDAMENTO,
        severity: "error",
      });
      return;
    }

    handleModalSenhaOpen();
  };

  return (
    <>
      <Header
        title="Pix - Pagar com Agência e Conta"
        titleMobile="Pagar com Agência e Conta"
      />

      <ModalSenha open={modalSenha} onClose={handleModalSenhaClose} />

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
            {editandoValor ? (
              <TextField
                label="Valor"
                className={classes.text_field_input}
                variant="outlined"
                value={valorTransferencia}
                onChange={(e) => handleValor(e.target.value)}
                onBlur={() => setEditandoValor(false)}
                InputLabelProps={{ shrink: true }}
                placeholder="00,00"
              />
            ) : (
              <React.Fragment>
                R${" "}
                {maskValor(MaskUtil.removeMask(valorTransferencia.toString()))}{" "}
                <EditIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setEditandoValor(true)}
                />
              </React.Fragment>
            )}
          </Typography>

          <span className={classes.saldo}>
            Saldo:{" "}
            {!verSaldo ? (
              <span>...</span>
            ) : (
              <span>
                R$ {maskValor(MaskUtil.removeMask(saldo.toString()))}{" "}
              </span>
            )}
            <VisibilityIcon
              style={{ cursor: "pointer" }}
              onClick={() => handleVerSaldo()}
            />
          </span>
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
              control={<RadioButton onChange={(e) => setMomento("agendar")} />}
              label={<Typography>Agendar</Typography>}
            />

            <TextField
              id="datetime-local"
              variant="outlined"
              className={classes.input_agendamento}
              label="Data"
              type="date"
              value={dataAgendamento}
              onChange={(e) => setDataAgendamento(e.target.value)}
              disabled={momento === "hoje"}
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
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handlePagar()}
          >
            <span>PAGAR</span>
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        {...snack}
        style={{ width: "100%" }}
        autoHideDuration={5000}
        onClose={handleSnackClose}
      >
        <Alert
          variant="filled"
          onClose={handleSnackClose}
          severity={snack.severity}
          style={{ width: "90%", backgroundColor: "#ebae2a" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}
