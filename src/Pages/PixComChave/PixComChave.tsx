import {
  Button,
  Grid,
  AppBar,
  Tabs,
  Tab,
  TextField,
  Snackbar,
  useMediaQuery,
  IconButton,
  Typography,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { useEffect, useState } from "react";
import { FavoritoModel } from "../../models/Favorito.model";
import { BancoModel } from "../../models/Banco.model";
import { obterFavoritosPorCpfCnpj } from "../../../services/favorito.service";
import { obterBancos, getNameByIspb } from "../../../services/banco.service";
import { consultarChave } from "../../../services/chave.service";
import SquareButton from "../../layouts/components/SquareButton";
import SimpleDialog from "../../layouts/components/SimpleDialog";
import { InfoChavePix } from "../../models/InfoChavePix.model";
import CustomUserCard from "../../layouts/components/CustomUserCard";
import { MaskUtil } from "../../../services/util.service";
import { TipoChaveEnum } from "../../enums/tipo-chave.enum";
import { Alert } from "@material-ui/lab";
import { storageService } from "../../../services/storage.service";
import { ArrowBack, ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useStylesPixComChave } from "./PixComChave.styles";
import {
  aplicarMascara,
  retornaPlaceHolder,
  validarChave,
} from "../../../services/pix-com-chave.service";
import { obterTransacoesAnterioresPorChave } from "../../../services/transferencia.service";
import { TransferenciaAnteriorModel } from "../../models/TransferenciaAnterior.model";

interface TabsProps {
  key: number;
  value: number;
  label: string;
  classes?: ClassNameMap;
}

const initialDadosConsulta = {
  identificadorFimAFim: "",
  chave: "",
  tipoChave: "",
  ispb: "",
  agencia: "",
  conta: "",
  tipoConta: "",
  tipoUsuario: "",
  cpfCnpj: "",
  nome: "",
};

const snackInitialForm = {
  open: false,
  message: "",
  severity: "success" as any,
};

const initialFormTransferencias: Array<TransferenciaAnteriorModel> = [
  //initialFormTransferenciaAnterior
];

const MSG_ERROR_CONSULTA =
  "Transação não concluída. Falha de comunicação para consulta de dados do recebedor. Tente novamente mais tarde";
const MSG_ERROR_FAVORITOS =
  "Ocorreu um erro ao recuperar os favoritos. Tente novamente mais tarde.";
const MSG_ERROR_TRANSFERENCIAS =
  "Ocorreu um erro ao recuperar as transações anteriores. Tente novamente mais tarde.";

export function PixComChave() {
  const classes = useStylesPixComChave();

  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(1);
  const [favoritosList, setFavoritosList] = useState(Array<FavoritoModel>);
  const [transferenciasList, setTransferenciasList] = useState(
    initialFormTransferencias
  );
  const [chavePixList, setChavePixList] = useState(Array<InfoChavePix>);
  const [tipoChavePix, setTipoChavePix] = useState(TipoChaveEnum.CPF_CNPJ);
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState(snackInitialForm);
  const [chaveConsultada, setChaveConsultada] = useState(initialDadosConsulta);
  const [bancos, setBancos] = useState(Array<BancoModel>);
  const [inputChave, setInputChave] = useState("");

  const handleTabIndexChange = (event: any, value: any) => {
    if (value === 1) {
      setChavePixList(
        favoritosList.map((item: FavoritoModel) => {
          return new InfoChavePix(
            item.nomeDestinatario,
            getNameByIspb(bancos, item.ispb),
            item.chaveDestinatario,
            item.apelidoDestinatario
          );
        })
      );
    } else {
      setChavePixList(
        transferenciasList.map((item: TransferenciaAnteriorModel) => {
          return new InfoChavePix(
            item.nomeDestinatario,
            getNameByIspb(bancos, item.ispb),
            'chave'
            //item.ch_en_rcb
          );
        })
      );
    }
    setTabIndex(value);
  };

  const defaultTabStyle: ClassNameMap = { root: classes.tabStyle };

  const tabs: Array<TabsProps> = [
    {
      key: 1,
      value: 1,
      label: "Favoritos",
      classes: defaultTabStyle,
    },
    {
      key: 2,
      value: 2,
      label: "Transferências Anteriores",
      classes: defaultTabStyle,
    },
  ];

  const obterFavoritos = (bancosResgatados: Array<BancoModel>) => {
    obterFavoritosPorCpfCnpj(dadosSessao.codigoCliente)
      .then((response: any) => {
        console.log("carregou favoritos");

        const favoritos: Array<FavoritoModel> = response.data.result.data;

        setFavoritosList(favoritos);

        setChavePixList(
          favoritos.map((item: FavoritoModel) => {
            return new InfoChavePix(
              item.nomeDestinatario,
              getNameByIspb(bancosResgatados, item.ispb),
              item.chaveDestinatario,
              item.apelidoDestinatario
            );
          })
        );
      })
      .catch((error: any) => {
        setSnack({
          open: true,
          message: MSG_ERROR_FAVORITOS,
          severity: "error",
        });
      });
  };

  const obterTransferenciasAnteriores = () => {
    obterTransacoesAnterioresPorChave(
      dadosConta.agencia,
      dadosConta.conta,
      dadosConta.digito,
      dadosConta.tipoConta
    )
      .then((response: any) => {
        console.log("carregou transferencias");

        const transferencias: Array<TransferenciaAnteriorModel> =
          response.data.result;

        console.log(transferencias);

        setTransferenciasList(transferencias);

        // setChavePixList(transferencias.map((item: TransferenciaAnteriorModel) => {
        //   return new InfoChavePix(
        //     item.nm_pri_ttl_dst,
        //     getNameByIspb(bancos, item.cd_ispb),
        //     item.ch_en_rcb
        //   );
        // }));
      })
      .catch((error: any) => {
        setSnack({
          open: true,
          message: MSG_ERROR_TRANSFERENCIAS,
          severity: "error",
        });
      });
  };

  const obterBancosIspb = () => {
    obterBancos()
      .then((response: any) => {
        setBancos(response.data.result);
        obterFavoritos(response.data.result);
      })
      .catch((error: any) => {
        console.error("Erro ao buscar os bancos: ", error);
      });
  };

  const handleTipoChaveChange = (tipoChave: TipoChaveEnum) => {
    if (tipoChave === TipoChaveEnum.PHONE) {
      setInputChave("+");
    } else {
      setInputChave("");
    }
    setTipoChavePix(tipoChave);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const validarChaveInserida = () => {
    const { invalid, message } = validarChave(inputChave, tipoChavePix);

    if (invalid) {
      setSnack({
        open: true,
        message,
        severity: "warning",
      });
    } else {
      confirmarConsulta(inputChave);
    }
  };

  const confirmarConsulta = (chave: string) => {
    let consultaChave = chave;

    if (
      TipoChaveEnum.CPF_CNPJ === tipoChavePix ||
      TipoChaveEnum.PHONE === tipoChavePix
    ) {
      consultaChave = MaskUtil.removeMask(chave);
    }

    consultarChave(
      dadosConta.agencia,
      dadosConta.conta,
      dadosConta.tipoConta,
      consultaChave,
      dadosConta.documento,
      dadosSessao.codigoCliente
    )
      .then((response: any) => {
        console.log(response.data);
        if (response.status === 200 && response.data.result.codigo === "0") {
          setChaveConsultada(
            response.data.result
              .dadosChavesEnderecamento /*aplicarMascaraSeCpf(response.data.result.dadosChavesEnderecamento)*/
          );
          setOpen(true);
        } else {
          setSnack({
            open: true,
            message: response.data.result.mensagem,
            severity: "warning",
          });
        }
      })
      .catch((error: any) => {
        setSnack({
          open: true,
          message: MSG_ERROR_CONSULTA,
          severity: "error",
        });
      });
  };

  const handleSnackClose = () => {
    setSnack({ ...snack, open: false });
  };

  const handleChaveChange = (event: any) => {
    setInputChave(MaskUtil.maskByTipoChave(event.target.value, tipoChavePix));
  };

  const isDesktop = useMediaQuery("(min-width:600px)");

  const [currentPage, setCurrentPage] = useState(0);

  const itensPerPage = 10;

  const pages = Math.ceil(chavePixList.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentChaves = chavePixList.slice(startIndex, endIndex);

  const dadosConta = storageService.recover("conta_no_asp");
  const dadosSessao = storageService.recover("x_access_token");

  useEffect(() => {
    // 401
    // obterTransacoesAnteriores()
    //   .then((response) => console.log(response.data));

    obterBancosIspb();
    obterTransferenciasAnteriores();
    console.log("Dados: ", dadosConta, dadosSessao);
  }, []);

  return (
    <Grid container spacing={3} classes={{ root: classes.main }}>
      <Grid item lg={12} xs={12}>
        {isDesktop && (
          <Grid style={{ display: "flex" }}>
            <Button
              onClick={() => navigate(-1)}
              style={{ position: "static" }}
              startIcon={<ArrowBack htmlColor='grey' />}>
              <span
                style={{ fontSize: "12px", fontWeight: "bold", color: "grey" }}>
                VOLTAR
              </span>
            </Button>
            <Typography
              style={{
                fontWeight: "bold",
                color: "grey",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flex: "90%",
                fontSize: "18px",
              }}>
              PIX - Pagar com Chave Pix
            </Typography>
          </Grid>
        )}

        {!isDesktop && (
          <Typography style={{ fontWeight: "bold", color: "#a6193c" }}>
            Pagar com Chave Pix
          </Typography>
        )}

        <Typography style={{ fontWeight: "bold", margin: "1em 0px" }}>
          Selecione o tipo de Chave
        </Typography>

        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <div className={classes.buttonGroup}>
            <SquareButton
              label='CPF/CNPJ'
              icon='cpfCnpj'
              color='primary'
              customOnClick={() =>
                handleTipoChaveChange(TipoChaveEnum.CPF_CNPJ)
              }
              selected={tipoChavePix == TipoChaveEnum.CPF_CNPJ}
            />
            <SquareButton
              label='Celular'
              icon='celular'
              color='primary'
              customOnClick={() => handleTipoChaveChange(TipoChaveEnum.PHONE)}
              selected={tipoChavePix == TipoChaveEnum.PHONE}
            />
            <SquareButton
              label='E-mail'
              icon='email'
              color='primary'
              customOnClick={() => handleTipoChaveChange(TipoChaveEnum.EMAIL)}
              selected={tipoChavePix == TipoChaveEnum.EMAIL}
            />
            <SquareButton
              label='Chave aleatória'
              icon='evp'
              color='primary'
              style={{ marginRight: "0px" }}
              customOnClick={() => handleTipoChaveChange(TipoChaveEnum.EVP)}
              selected={tipoChavePix == TipoChaveEnum.EVP}
            />
          </div>
        </Grid>
      </Grid>

      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
        <TextField
          value={inputChave}
          onChange={handleChaveChange}
          inputProps={{ inputMode: "numeric" }}
          variant='outlined'
          style={{ width: "calc(100%)" }}
          placeholder={retornaPlaceHolder(tipoChavePix)}
        />
      </Grid>
      <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
        <Button
          variant='contained'
          style={{ height: "95%", fontSize: "20px", fontWeight: "400" }}
          color='secondary'
          onClick={() => validarChaveInserida()}
          fullWidth>
          Continuar
        </Button>
      </Grid>

      <Grid item lg={12} xs={12}>
        <AppBar position='static' classes={{ root: classes.appBarStyle }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabIndexChange}
            classes={{
              indicator:
                tabIndex == 1
                  ? classes.indicatorFavoritos
                  : classes.indicatorTransferencias,
              root: classes.tabStyle,
            }}
            TabIndicatorProps={{ children: <span /> }}
            variant='scrollable'>
            {tabs.map((tab) => {
              return (
                <Tab
                  key={tab.key}
                  value={tab.value}
                  label={tab.label}
                  classes={tab.classes}
                />
              );
            })}
          </Tabs>
        </AppBar>
      </Grid>

      <Grid item xs={12}>
        {currentChaves.map((item: InfoChavePix, index: number) => {
          return (
            <CustomUserCard
              key={index}
              nomeRecebedor={item.nomeRecebedor}
              chaveRecebedor={aplicarMascara(item.chaveRecebedor)}
              apelidoRecebedor={item.apelidoRecebedor}
              bancoRecebedor={item.bancoRecebedor}
              elevation={isDesktop}
              onClick={() => confirmarConsulta(item.chaveRecebedor)}
            />
          );
        })}
      </Grid>

      <Grid container justifyContent='flex-end' alignItems='center'>
        <Typography classes={{ root: classes.pageablePages }}>
          {`${startIndex + 1}-${endIndex} de ${chavePixList.length}`}
        </Typography>
        <IconButton
          style={{ marginRight: "-10px" }}
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}>
          <ArrowBackIos classes={{ root: classes.pageableIcon }} />
        </IconButton>

        <IconButton
          disabled={currentPage + 1 === pages}
          onClick={() => setCurrentPage(currentPage + 1)}>
          <ArrowForwardIos classes={{ root: classes.pageableIcon }} />
        </IconButton>
      </Grid>

      <SimpleDialog
        open={open}
        title='Confirma o destinatário?'
        handleClose={() => handleDialogClose()}>
        <CustomUserCard
          nomeRecebedor={chaveConsultada.nome}
          chaveRecebedor={aplicarMascara(chaveConsultada.chave)}
          elevation
          bancoRecebedor={getNameByIspb(bancos, chaveConsultada.ispb)}
        />
      </SimpleDialog>

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
    </Grid>
  );
}
