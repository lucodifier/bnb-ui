import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  Button,
  Paper,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '10px',
  },
  paper: {
    height: 60,
    width: 50,
    "@media (max-width:600px)": {
      height: 40,
      width: 38,
    },
  },
  control: {
    padding: theme.spacing(1),
  },
}));

function ModalSenha(props: any) {
  const classes = useStyles();
  const { onClose, open } = props;
  const [senhas, setSenhas] = useState<string[]>(["", "", "", "", "", ""]);

  const handleClose = () => {
    onClose();
  };

  const informaSenha = (valor: string, posicao: number = 0) => {
    senhas[posicao] = valor[0];
    setSenhas((prev) => ({ ...prev, senhas }));
     
    
    if (posicao < 5 && valor){
        document.getElementById((posicao + 1).toString())?.setAttribute("focused", "true");
        document.getElementById((posicao + 1).toString())?.focus();
    }

  };

  const senhaInformada = () => {
    //const senha = senhas.map((s)=>s);
    props.senhaInformada(senhas);
  };

  const handleContinuar = () => {
    const temVazio = senhas.find(s=>s==="");
    if (!temVazio){

      handleClose();
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Digite sua senha</DialogTitle>
      <DialogContent>
        <Grid container className={classes.root} spacing={1}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={2}>
                <TextField id="0" 
                  className={classes.paper}
                  onChange={(e) => informaSenha(e.target.value, 0)}
                  variant="outlined"
                  inputProps={{ maxLength: 1 }}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField id="1"
                  className={classes.paper}
                  onChange={(e) => informaSenha(e.target.value, 1)}
                  variant="outlined"
                  inputProps={{ maxLength: 1 }}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField  id="2"
                  className={classes.paper}
                  onChange={(e) => informaSenha(e.target.value, 2)}
                  variant="outlined"
                  inputProps={{ maxLength: 1 }}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField id="3"
                  className={classes.paper}
                  onChange={(e) => informaSenha(e.target.value, 4)}
                  variant="outlined"
                  inputProps={{ maxLength: 1 }}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField  id="4"
                  className={classes.paper}
                  onChange={(e) => informaSenha(e.target.value, 5)}
                  variant="outlined"
                  inputProps={{ maxLength: 1 }}
                />
              </Grid>

              <Grid item xs={2}>
                <TextField id="4"
                  className={classes.paper}
                  onChange={(e) => informaSenha(e.target.value, 6)}
                  variant="outlined"
                  inputProps={{ maxLength: 1 }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleContinuar} color="primary" autoFocus>
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalSenha;
