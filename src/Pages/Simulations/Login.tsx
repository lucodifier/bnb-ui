import * as React from "react";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();

  const [user, setUser] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const onLogin = async () => {
    try {
      if (window && window.parent) {
        let authenticationType = "1";
        let device = "desktop";

        const payloadMessage = {
          user,
          pass,
          authenticationType,
          device,
        };

        window.parent.postMessage(JSON.stringify(payloadMessage), "*");

        navigate("/sso", { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth='sm'>
        <Typography>Login Simulado</Typography>
        <TextField
          margin='normal'
          required
          fullWidth
          id='Login'
          label='Login'
          name='Login'
          autoComplete='Login'
          autoFocus
          onChange={(e) => setUser(e.target.value)}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='Senha'
          label='Senha'
          type='Senha'
          id='Senha'
          autoComplete='current-password'
          onChange={(e) => setPass(e.target.value)}
        />

        <Button
          type='submit'
          fullWidth
          className="primary"
          variant='contained'
          onClick={() => onLogin()}>
          Logar
        </Button>
      </Container>
    </React.Fragment>
  );
}
