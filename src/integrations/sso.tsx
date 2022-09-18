import { useContext, useState, useEffect } from "react";
import { storageService } from "../../services/storage.service";
import { authService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";
import { LinearProgress } from "@material-ui/core";
import { UserInfo } from "../models/UserInfo.model";
import Alert from "@material-ui/lab/Alert";

const Sso = () => {
  let navigate = useNavigate();
  const { setIsLoggedIn, setUserInfo } = useContext(LoginContext);
  const [ssoError, setSsoError] = useState<string>("");

  useEffect(() => {
    if (window)
    {
      window.addEventListener(
        "message",
        (event) => receiveAppMessage(event),
        false
      );
      console.info('Adicionou o listener do SSO no React via window')
    }
    else {
      document.addEventListener(
        "message",
        (event) => receiveAppMessage(event),
        false
      );
      console.info('Adicionou o listener do SSO no React via document')
    } 
    
  }, []);

  const receiveAppMessage = (event: any) => {
    event.preventDefault();

    if (import.meta.env.VITE_ORIGINS_URLS.includes(event.origin)) {
      if (
        event.data.type === "webpackInvalid" ||
        event.data.type === "webpackOk" ||
        event.data.type === "webpackWarnings" ||
        event.data.hello == true ||
        event.data.source == "react-devtools-content-script" ||
        event.data.source == "react-devtools-inject-backend" ||
        event.data.source == "react-devtools-bridge" ||
        event.data.isIvy == false
      )
        return;
      try {
        var json = JSON.parse(event.data);

        if (json?.user && json?.pass) {
          console.info("Recebido post message do Login ...");

          let environment = import.meta.env.VITE_ENVIRONMENT;

          if (environment == "local") {
            console.info("Postou o fake token!");

            const userInfo = {
              name: "Usuário fake",
              login: "Usuário fake",
              document: "001.002.003-04",
              accessToken: "fakesso",
              tokenSSO: "fakesso",
            };

            if (setIsLoggedIn) setIsLoggedIn(true);
            if (setUserInfo) setUserInfo(userInfo);

            window.removeEventListener("message", receiveAppMessage, false);

            storageService.store("x_access_token", {
              nome: "Usuário Fake",
              login: "Usuário Fake",
              documento: "00100200301",
              accessToken: "fakeSso",
            });

            setTimeout(() => {
              navigate("/accounts");
            }, 1000);

            return;
          }

          authService
            .login(
              json?.user,
              json?.pass,
              json?.authenticationType,
              json?.device
            )
            .then((response) => {
              storageService.removeAll();

              if (response !== "invalid") {
                console.info("O token foi retornado da API!");

                storageService.store("x_access_token", response);

                if (setIsLoggedIn) setIsLoggedIn(true);

                const userInfo: UserInfo = {
                  name: response.nome,
                  login: response.login,
                  document: response.documento,
                  accessToken: response.accessToken,
                  tokenSSO: response.tokenSSO,
                };

                if (setUserInfo) setUserInfo(userInfo);
              } else {
                console.info("O token NÃO foi retornado da API!");
              }

              console.info("Postou o token!");

              if (environment == "simulado") {
                window.removeEventListener("message", receiveAppMessage, false);
                navigate("/accounts");
              } else {
                window.removeEventListener("message", receiveAppMessage, false);

                console.log("Postou o token para o ASP!")

                // Posta mensagem com token
                event.source.postMessage(
                  JSON.stringify({ token_sso: response.accessToken }),
                  "*"
                );
              }
            })
            .catch((error) => {
              storageService.removeAll();

              console.log("Erro na leitura de postMessage");

              if (error.message && error.message.length > 0) {
                console.info(error.message[0]);

                if (error.message[0] == "Login ou senha não encontrados") {
                  setSsoError(error.message[0]);
                  if (environment == "local" || environment == "simulado") {
                    setTimeout(() => {
                      navigate("/login");
                    }, 2000);
                  }
                }

                // Envia mensagem de error
                event.source.postMessage(
                  JSON.stringify({
                    token_sso: "invalid",
                    error: error.message,
                  }),
                  "*"
                );
              }
            });
        }
      } catch (error: any) {
        console.log("Erro na chamada do SSO");
        console.log(error);
        // event.source.postMessage(JSON.stringify({ token_sso: "invalid" }), "*");
      }
    }
  };

  return (
    <>
      <LinearProgress />

      <h2>Gerando SSO ...</h2>
      {ssoError && <Alert severity='error'>{ssoError}</Alert>}
    </>
  );
};
export default Sso;
