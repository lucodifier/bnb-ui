import React, { useContext, useState } from "react";
import Header from "../../layouts/components/Header";
import {
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  FormGroup,
  Snackbar,
  Button,
  CircularProgress,
} from "@material-ui/core";
import useStyles from "./EnviarPagamentoAgenciaConta.Style";
import CardFavorecido from "../../layouts/components/CardFavorecido";
import { MaskUtil } from "../../../services/util.service";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import RadioButton from "../../layouts/components/RadioButton";
import InfoIcon from "@material-ui/icons/Info";
import { maskValor } from "../../../services/mask";
import { contaService } from "../../../services/conta.service";
import { Alert } from "@material-ui/lab";
import ModalSenha from "./ModalSenha";
import { SettingsInputComponent } from "@material-ui/icons";
import { storageService } from "../../../services/storage.service";
import { LoginContext } from "../../Contexts/LoginContext";

const snackInitialForm = {
  open: false,
  message: "",
  severity: "success" as any,
};

const MSG_VALOR_NAO_INFORMADO = "Valor não informado";
const MSG_VALOR_FORA_LIMITE = "Valor maior que seu limite diário";
const MSG_DATA_AGENDAMENTO = "Informe a data do agendamento";
const MSG_VALOR_MAIOR_SALDO = "Valor maior que o saldo disponível";
const MSG_INFORME_FAVORECIDO =
  "Informe o favorecido novamente na tela anterior";

export function EnviarPagamentoAgenciaConta() {
  const classes = useStyles();
  const { favorecido } = useContext(LoginContext);
  const [snack, setSnack] = useState(snackInitialForm);
  const [valorTransferencia, setValorTransferencia] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [momento, setMomento] = useState("hoje");
  const [dataAgendamento, setDataAgendamento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editandoValor, setEditandoValor] = useState(false);
  const [verSaldo, setVerSaldo] = useState(false);
  const [buscouSaldo, setBuscouSaldo] = useState(false);
  const [modalSenha, setModalSenha] = useState(false);
  const [carregandoSaldo, setCarregandoSaldo] = useState(false);

  const buscarSaldo = async () => {
    setCarregandoSaldo(true);
    try {
      const userSession = storageService.recover("user_session");
      const response = await contaService.obterSaldo(
        userSession?.agencia,
        userSession?.conta,
        userSession?.digito
      );

      return response?.saldo;
    } catch {
      return 0;
    } finally {
      setCarregandoSaldo(false);
    }
  };

  const handleVerSaldo = async () => {
    if (!verSaldo) {
      if (saldo === 0) {
        const response = await buscarSaldo();
        if (response) {
          setBuscouSaldo(true);
          setSaldo(response);
        }
      }
    }

    setVerSaldo(!verSaldo);
  };

  const handleValor = (valor) => {
    setValorTransferencia(maskValor(valor));
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

    if (buscouSaldo) {
      const valorAtualizado = Number(
        MaskUtil.removeMask(valorTransferencia.toString())
      );
      if (valorAtualizado > saldo) {
        setSnack({
          open: true,
          message: MSG_VALOR_MAIOR_SALDO,
          severity: "error",
        });
        return;
      }
    }

    if (!favorecido) {
      setSnack({
        open: true,
        message: MSG_INFORME_FAVORECIDO,
        severity: "error",
      });
    }

    handleModalSenhaOpen();
  };

  const senhaInformada = (senha) => {
    const de = storageService.recover("user_session");

    const valorAtualizado = Number(
      MaskUtil.removeMask(valorTransferencia.toString())
    );

    const payload = {
      autorizacaoTransferencia: {
        posicaoCartaoContraSenha: 0,
        senha: senha,
      },
      de: {
        agencia: de.agencia,
        conta: de.conta,
        digito: de.digito,
        documento: de.documento,
        tipoConta: de.tipoConta.substring(0, 1), // Pegar apenas inicial P ou C
      },
      para: {
        nome: favorecido?.nomeDestinatario,
        agencia: favorecido?.codAgencia.toString(),
        conta: favorecido?.codConta.toString(),
        digito: favorecido?.digitoValidadorConta,
        documento: favorecido?.cpfCnpjDestinatario.toString(),
        idBanco: favorecido?.ispb,
        nomeBanco: favorecido?.nomeBanco,
        tipoConta: favorecido?.tipoConta,
      },
      observacao: descricao,
      valor: valorAtualizado,
    };

    try {
      setLoading(true);
      const response = await api.post("Transferencia", payload);

      if (response) {
        validateResponse(response);

        if (response.data.result) {
          var transaction = response.data.result;
          if (transaction.transacaoId > 0) {
            storageService.store("transaction", transaction);
            setLoading(false);
            history.push("/result-transfer");
            return;
          }
        }

        setPassIndication(
          "Não foi possível realizar a transfererência. Problemas técnicos."
        );
        setColor("#ed3c0d");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      validateResponse(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title="Pix - Pagar com Agência e Conta"
        titleMobile="Pagar com Agência e Conta"
      />

      <ModalSenha
        open={modalSenha}
        onClose={handleModalSenhaClose}
        senhaInformada={senhaInformada}
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
            {carregandoSaldo ? (
              <CircularProgress style={{ width: "20px", height: "20px" }} />
            ) : (
              <>
                {!verSaldo ? (
                  <span>...</span>
                ) : (
                  <>
                    <span>
                      R$ {maskValor(MaskUtil.removeMask(saldo.toString()))}{" "}
                    </span>
                  </>
                )}
              </>
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
            onChange={(e)=>setDescricao(e.target.value)}
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
