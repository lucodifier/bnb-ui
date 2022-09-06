import * as React from "react";

import { LoginContext } from "../Contexts/LoginContext";
import { Navigate } from "react-router-dom";
import { Props } from "../Types/Types";
import { storageService } from "../../services/storage.service";
import { UserInfo } from "../models/UserInfo.model";

export const PrivateRoute = ({ children, ...props }: Props) => {
  const { isLoggedIn, setIsLoggedIn, setUserInfo } =
    React.useContext(LoginContext);

  const [access, setAccess] = React.useState<UserInfo>(
    null || {
      name: "",
      login: "",
      document: "",
      accessToken: "",
      tokenSSO: "",
    }
  );

  React.useEffect(() => {
    debugger;
    if (storageService.recover("x_access_token")) {
      setAccess(storageService.recover("x_access_token"));
      if (access) {
        if (setIsLoggedIn) setIsLoggedIn(true);
        if (setUserInfo) setUserInfo(access);
      }
    }
  }, []);

  debugger;
  if (!isLoggedIn && !access?.document) {
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
