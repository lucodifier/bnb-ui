import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { LoginContext } from "./Contexts/LoginContext";
import Session from "./integrations/session";
import Sso from "./integrations/sso";
import Layout from "./layouts/Layout";
import { PrivateRoute } from "./layouts/PrivateRoute";
import NotFound from "./Pages/NotFound";
import Account from "./Pages/Simulations/Accounts";
import Login from "./Pages/Simulations/Login";

import { Home } from "./Pages/Home";
import NoAccess from "./Pages/NoAccess";
import { UserInfo } from "./models/UserInfo.model";
import { PixComChave } from "./Pages/PixComChave/PixComChave";
import ComprovantePix from "./Pages/ComprovantePix";
import ConsultaComprovante from "./Pages/ConsultaComprovante/ConsultaComprovante";
import { AgenciaConta } from "./Pages/AgenciaConta/AgenciaConta";
import { NovaTransferencia } from "./Pages/NovaTransferenciaAgenciaConta/NovaTransferencia";
import { EnviarPagamentoAgenciaConta } from "./Pages/EnviarPagamentoAgenciaConta/EnviarPagamentoAgenciaConta";
import { FavorecidoModel } from "./models/Favorecido.model";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>(
    null || {
      name: "",
      login: "",
      document: "",
      accessToken: "",
      tokenSSO: "",
    }
  );
  const [favorecido, setFavorecido] = useState<FavorecidoModel>(
    null || {
      nomeDestinatario: "",
      nomeBanco: "",
      cpfCnpjDestinatario: "",
      tipoConta: "",
      codAgencia: 0,
      codConta: 0,
      ispb: "",
      digitoValidadorConta: "",
    }
  );

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        loading,
        setLoading,
        userInfo,
        setUserInfo,
      }}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/noAccess' element={<NoAccess />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sso' element={<Sso />} />
          <Route path='/session' element={<Session />} />

          <Route
            path='/'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path='/home'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path='/pix-com-chave'
            element={
              <PrivateRoute>
                <PixComChave />
              </PrivateRoute>
            }
          />

          <Route
            path='/consultaComprovante'
            element={
              // <PrivateRoute>
              <ConsultaComprovante />
              // </PrivateRoute>
            }
          />

          <Route
            path='/accounts'
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />

          <Route
            path='/comprovantePix'
            element={
              <PrivateRoute>
                <ComprovantePix transacaoId={""} />
              </PrivateRoute>
            }
          />

          <Route
            path='/pagar-agencia-conta'
            element={
              <PrivateRoute>
                <AgenciaConta />
              </PrivateRoute>
            }
          />

          <Route
            path='/tranferencia-agencia-conta'
            element={
              <PrivateRoute>
                <NovaTransferencia />
              </PrivateRoute>
            }
          />

          <Route
            path='/pagamento-agencia-conta'
            element={
              <PrivateRoute>
                <EnviarPagamentoAgenciaConta />
              </PrivateRoute>
            }
          />

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </LoginContext.Provider>
  );
}
