import React, { useEffect } from "react";
import {
  Modal,
  Typography,
  Box,
  TextField,
  Tab,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { obterBancos } from "../../../services/banco.service";
import { BancoModel } from "../../models/Banco.model";

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
    fontSize: "1.2rem",
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

export default function BankModal(props: any) {
  const classes = useStyles();
  const [selectedBank, setSelectedBank] = React.useState<BancoModel>({
    idBanco: 0,
    ispbBanco: "",
    nomeBanco: "",
  });
  const [banks, setBanks] = React.useState(Array<BancoModel>);

  const selectBank = (newBank: any) => {
    setSelectedBank(newBank);
  };

  useEffect(() => {
    obterBancos()
      .then((response: any) => {
        setBanks(response.data.result);
      })
      .catch((error: any) => {
        console.error("Erro ao buscar os bancos: ", error);
      });
  }, []);

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
            className={classes.search_input}
          />
        </div>
        <div className={classes.bank_container}>
          {banks.map((bank) => {
            return (
              <div
                key={bank.idBanco}
                className={
                  bank.idBanco === selectedBank.idBanco
                    ? classes.bank_tab_selected
                    : classes.bank_tab
                }
                onClick={() => {
                  selectBank(bank);
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
          <Button
            color='primary'
            size='large'
            className={classes.btn_style}
            onClick={() => {
              props.selectNewBank(selectedBank);
            }}>
            <span>CONTINUAR</span>
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
