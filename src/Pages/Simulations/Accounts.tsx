import { Box, FormLabel, Typography } from "@material-ui/core";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Contexts/LoginContext";

export default function Account() {
  let navigate = useNavigate();

  const { isLoggedIn } = React.useContext(LoginContext);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);

  function selectAccount() {
    var payload = {
      agencia: "016",
      conta: "000003874",
      digito: "1",
      dispositivo: "Desktop",
      tipoAutenticacao: 2,
      tipoConta: "C",
      usuario: "vicente",
      documento: "11687762368",
      tokenDispositivo: "teste",
    };

    window.parent.postMessage(JSON.stringify(payload), "*");

    navigate("/session", { replace: true });
  }

  return (
    <React.Fragment>
      <Typography>Selecione a sua conta abaixo:</Typography>
      <Box component='form'>
        <FormLabel
          style={{ cursor: "pointer", color: "red" }}
          onClick={selectAccount}>
          16 | 34851-1
        </FormLabel>        
      </Box>
    </React.Fragment>
  );
}
