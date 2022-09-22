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
import { storageService } from "../../../services/storage.service";
import { criptografiaService } from "../../../services/criptografia.service";
import { LoginContext } from "../../Contexts/LoginContext";
import { transferenciaService } from "../../../services/transferencia.service";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText 
} from "@material-ui/core";

const snackInitialForm = {
  open: false,
  message: "",
  severity: "success" as any,
};

const MSG_VALOR_NAO_INFORMADO = "Valor não informado";
const MSG_VALOR_FORA_LIMITE = "Valor maior que seu limite diário";
const MSG_DATA_AGENDAMENTO = "Informe a data do agendamento";
const MSG_VALOR_MAIOR_SALDO = "Valor maior que o saldo disponível";
const MSG_INFORME_FAVORECIDO ="Informe o favorecido novamente na tela anterior";
const MSG_ERRO_TRANSFERENCIA ="No momento, não foi possível realizar sua transação. Deseja agendar para que seja realizada ao longo do dia?";

export function EnviarPagamentoAgenciaConta() {
  const classes = useStyles();
  const navigate = useNavigate();
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
  const [enviando, setEnviando] = useState(false);
  const [dialogAlerta, setDialogAlerta] = useState({open:false, message: ""});

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

  const handleDialogAlertClose = () => {
    setDialogAlerta({open:false, message: ""});
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

    if (!favorecido?.nomeDestinatario) {
      setSnack({
        open: true,
        message: MSG_INFORME_FAVORECIDO,
        severity: "error",
      });
      return;
    }

    handleModalSenhaOpen();
  };

  const senhaInformada = async (senha) => {
    const de = storageService.recover("user_session");

    debugger;

    const valorAtualizado = Number(
      MaskUtil.removeMask(valorTransferencia.toString())
    );

    var senhaCriptografada = criptografiaService.criptografar(senha);

    const dataTransacao = dataAgendamento ? dataAgendamento : new Date();

    const payload = {
      autorizacaoTransferencia: {
        posicaoCartaoContraSenha: 0,
        senha: senhaCriptografada,
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
      DataTransacao: dataTransacao
    };

    try {
      setEnviando(true);

      var transacao = await transferenciaService.realizarTransferencia(payload);

      if (transacao) {
        if (transacao?.transacaoId > 0) {
          storageService.store("transaction", transacao);
          navigate("/consultaComprovante");
          return;
        } else {
          setDialogAlerta({open:true, message: MSG_ERRO_TRANSFERENCIA});
        }
      }
    } catch (error) {
      console.log(error);
      setEnviando(false);
    } finally {
      setEnviando(false);
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
            onChange={(e) => setDescricao(e.target.value)}
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

      <Dialog
        open={dialogAlerta.open}
        onClose={handleDialogAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Atenção
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {dialogAlerta.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogAlertClose}>NÃO</Button>
          <Button onClick={handleDialogAlertClose} autoFocus>
            SIM
          </Button>
        </DialogActions>
      </Dialog>

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
