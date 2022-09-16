import * as React from "react";

import { LoginContext } from "../Contexts/LoginContext";
import { Navigate } from "react-router-dom";
import { Props } from "../Types/Types";
import { MyQRCodeIcon } from "../../assets/icons/iconsSvg";
import { storageService } from "../../services/storage.service";

export const PrivateRoute = ({ children, ...props }: Props) => {
  const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo } =
    React.useContext(LoginContext);

  function userIsLogged() {
    console.log("Validando acesso");
    const accessToken = storageService.recover("x_access_token");
    return accessToken && accessToken?.documento;
  }

  if (!userIsLogged()) {
    // not logged in so redirect to login page with the return url
    return (
      <React.Fragment>
        <Navigate to='/noAccess' />;
      </React.Fragment>
    );
  }

  // authorized so return child components
  return <React.Fragment>{children}</React.Fragment>;
};
