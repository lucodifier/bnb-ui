import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { LoginContext } from "./Contexts/LoginContext";
import Session from "./integrations/session";
import Sso from "./integrations/sso";
import Layout from "./layouts/Layout";
import { PrivateRoute } from "./layouts/PrivateRoute";
import NotFound from "./pages/NotFound";
import Account from "./pages/Simulations/Accounts";
import Login from "./pages/Simulations/Login";

import { Home } from "./pages/Home";
import NoAccess from "./pages/NoAccess";
import { NewPayment } from "./pages/NewPayment";
import { UserInfo } from "./models/UserInfo.model";
import { PixComChave } from "./pages/PixComChave/PixComChave";
import ComprovantePix from "./pages/ComprovantePix";
import { storageService } from "../services/storage.service";
import ConsultaComprovante from "./pages/ConsultaComprovante/ConsultaComprovante";

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

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        loading,
        setLoading,
        userInfo,
        setUserInfo,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/noAccess" element={<NoAccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sso" element={<Sso />} />
          <Route path="/session" element={<Session />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/pix-com-chave"
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
            path="/accounts"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />

          <Route
            path="/newpayment"
            element={
              <PrivateRoute>
                <NewPayment />
              </PrivateRoute>
            }
          />

          <Route
            path="/comprovantePix"
            element={
              <PrivateRoute>
                <ComprovantePix
                  transacaoId={""}                  
                />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </LoginContext.Provider>
  );
}
