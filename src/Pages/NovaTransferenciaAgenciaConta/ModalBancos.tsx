import React, { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BancoModel } from "../../models/Banco.model";
import { bancoService } from "../../../services/banco.service";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#FFFFFF",
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10%",
    borderRadius: "5px",
    "@media (max-width:1200px)": {
      marginTop: "15%",
    },
    "@media (max-width:800px)": {
      marginTop: "18%",
    },
    "@media (max-width:600px)": {
      marginTop: "30%",
      maxWidth: "350px",
    },
    "@media (max-width:400px)": {
      marginTop: "35%",
      maxWidth: "330px",
    },
    "@media (max-width:350px)": {
      marginTop: "38%",
      maxWidth: "300px",
    },
  },
  search_input: {
    width: "100%",
  },
  search_container: {
    padding: "6% 3%",
  },
  bank_container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingBottom: "2rem",
    height: '50vh',
    overflow: 'auto',
  },
  bank_tab: {
    width: "100%",
    color: "#A6193C",
    border: "1px solid #DADADA",
    maxWidth: "100%",
    padding: "0.7rem 1rem",
    cursor: "pointer",
    backgroundColor: "#FFFFFF",
  },
  bank_tab_selected: {
    width: "100%",
    color: "#A6193C",
    border: "1px solid #DADADA",
    maxWidth: "100%",
    padding: "0.7rem 1rem",
    cursor: "pointer",
    backgroundColor: "#DADADA",
  },
  bank_tab_text: {
    fontSize: "0.8rem",
  },
  btn_style: {
    backgroundColor: "#FFFFFF",
    color: "#F2711C",
  },
  btn_container: {
    display: "flex",
    justifyContent: "end",
    padding: "1rem",
  },
}));

const ModalBancos = React.memo((props: any) => {
  const classes = useStyles();

  const [bancos, setBancos] = useState(Array<BancoModel>);
  const [carregando, setCarregando] = useState<boolean>(true);

  const filtrarBancos = async (nome: string) => {
    
    const filtrados = bancos.filter((x) =>
      x.nomeBanco.toLowerCase().includes(nome)
    );

    setBancos(filtrados);
    console.log("filtrarBancos");
  };

  const buscaBancos = async () => {
    setCarregando(true);
    try {
      const response = await bancoService.listaBancos();
      if (response) {
        props.buscaBancoErros(false);
        setBancos(response);
        return;
      }

      props.buscaBancoErros(true);
    } catch {
      props.buscaBancoErros(true);
    } finally {
      setCarregando(false);
    }
  };

  const selecionaBanco = (banco: BancoModel) => {
    props.selecionaBanco(banco);
  };

  useEffect(() => {
    let foiCancelado = false;
    (async () => {
     
      if (props.modalIsOpen) {
        if (!foiCancelado)
          await buscaBancos();

          console.log('buscar bancos')
      }
    })();    

    return () => {
      foiCancelado = true;
    };

  }, [props]);


  return (
    <Modal
      open={props.modalIsOpen}
      onClose={props.modalClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box className={classes.container}>
        <div className={classes.search_container}>
          <TextField
            id='bank-input'
            label='Procurar instituição'
            variant='outlined'
            onChange={(e) => {
              console.log(e.target.value);
              e.target.value.length >= 2 ? filtrarBancos(e.target.value) : "";
            }}
            className={classes.search_input}
          />
        </div>
        <div className={classes.bank_container}>
          {carregando ? (
            <LinearProgress
              style={{ marginLeft: "10px", marginRight: "10px" }}
            />
          ) : (
            ""
          )}

          {bancos &&
            bancos.map((bank, index) => {
              return (
                <div
                  key={index}
                  className={
                    bank.idBanco === props.bancoSelecionado?.idBanco
                      ? classes.bank_tab_selected
                      : classes.bank_tab
                  }
                  onClick={() => {
                    selecionaBanco(bank);
                  }}>
                  <Typography className={classes.bank_tab_text}>
                    {bank.nomeBanco}
                  </Typography>
                </div>
              );
            })}
        </div>
        <div className={classes.btn_container}>
          <Button
            color='primary'
            size='large'
            className={classes.btn_style}
            onClick={props.modalClose}>
            <span>CANCELAR</span>
          </Button>
        </div>
      </Box>
    </Modal>
  );
});
export default ModalBancos;
