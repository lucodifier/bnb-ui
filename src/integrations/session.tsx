import { useContext, useEffect } from "react";
import { storageService } from "../../services/storage.service";
import { authService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";
import { LinearProgress } from "@material-ui/core";
import { UserInfo } from "../models/UserInfo.model";

const Session = () => {
  let navigate = useNavigate();
  const { setIsLoggedIn, userInfo, setUserInfo } = useContext(LoginContext);

  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => receiveAppMessage(event),
      false
    );
  }, []);

  const receiveAppMessage = async (event: any) => {
    if (event.origin == import.meta.env.VITE_ORIGIN_URL) {
      event.preventDefault();
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

        if (json.agencia && json.conta && json.digito && json.tipoConta) {
          // Inclusão de Banco fixo do BNB
          json["banco"] = import.meta.env.VITE_CONFIG_BANK_NAME;
          json["idBanco"] = import.meta.env.VITE_CONFIG_BANK_ID;
          json["ISPBBanco"] = import.meta.env.VITE_CONFIG_BANK_ISPB;

          console.info("Recebido post message do Refresh ...");

          let environment = import.meta.env.VITE_ENVIRONMENT;

          if (environment == "local") {
            console.info("Postou o refresh token!");

            if (setIsLoggedIn) setIsLoggedIn(true);

            if (userInfo) userInfo.accessToken = "fakeRefreshToken";

            if (setUserInfo && userInfo) setUserInfo(userInfo);

            navigate("/home");

            return;
          }

          // Refresh do token
          const refreshTokenResponse = await authService.refreshToken(
            json.agencia,
            json.conta,
            json.digito,
            json.tipoConta,
            json.tokenDispositivo
          );

          if (refreshTokenResponse !== "invalid") {
            storageService.store("x_access_token", refreshTokenResponse);

            console.info("Refresh token foi retornado da API!");

            if (setIsLoggedIn) setIsLoggedIn(true);

            var access = storageService.recover("x_access_token");
            access.accessToken = refreshTokenResponse.accessToken;
            storageService.store("x_access_token", access);

            const userInfo: UserInfo = {
              name: access.nome,
              login: access.login,
              document: access.documento,
              accessToken: access.accessToken,
              tokenSSO: access.tokenSSO,
              bankName: json["banco"],
              bankId: json["idBanco"],
              bankISPB: json["ISPBBanco"],
            };

            if (setUserInfo) setUserInfo(userInfo);
          } else {
            console.info("Refresh token NÃO foi retornado da API!");
          }

          if (environment == "simulado") {
            navigate("/home");
          } else {
            console.info("Postou o refresh token!");

            storageService.store("user_session", json);

            window.removeEventListener("message", receiveAppMessage, false);

            event.source.postMessage(
              JSON.stringify({ token_sso: refreshTokenResponse.accessToken }),
              "*"
            );
          }
        }
      } catch (error) {
        console.log("Erro ao buscar refreshToken");
        console.log(error);
      }
    }
  };
  return (
    <>
      <LinearProgress />
      <h2>Gerando Refresh Token (user session) ...</h2>{" "}
    </>
  );
};
export default Session;
