import React, { Dispatch, SetStateAction } from "react";
import { FavorecidoModel } from "../models/Favorecido.model";

type ContextProps = {
  favorecido: FavorecidoModel;
  setFavorecido: Dispatch<SetStateAction<FavorecidoModel>>;
};

export const FavorecidoContext = React.createContext<Partial<ContextProps>>({});
