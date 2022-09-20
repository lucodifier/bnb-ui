import React, { Dispatch, SetStateAction } from "react";
import { FavorecidoModel } from "../models/Favorecido.model";
import { UserInfo } from "../models/UserInfo.model";

type ContextProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  userInfo: UserInfo;
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;
  favorecido: FavorecidoModel;
  setFavorecido: Dispatch<SetStateAction<FavorecidoModel>>;
};

export const LoginContext = React.createContext<Partial<ContextProps>>({});
