import React, { useEffect, useState } from "react";
import { favoritoService } from "../../../services/favorito.service";
import { FavoritoModel } from "../../models/Favorito.model";
import FavoredCard from "./FavoredCard";
import { bancoService } from "../../../services/banco.service";
import { BancoModel } from "../../models/Banco.model";
import { LinearProgress } from "@material-ui/core";

export default function TabFavorites() {
  const [favoritos, setaFavoritos] = useState<FavoritoModel[]>([]);
  const [loading, isLoading] = useState(true);

  const obterFavoritos = async () => {
    isLoading(true);
    try {
      const response = await favoritoService.obterFavoritos();
      const listaFavoritos = response as FavoritoModel[];
      const listaBancos = (await bancoService.listaBancos()) as BancoModel[];
      const data = listaFavoritos.map((item) => {
        item.nomeBanco = bancoService.filtraPorISPB(listaBancos, item.ispb);
        if (!item.nomeBanco) item.nomeBanco = item.ispb;
        return item;
      });
      setaFavoritos(data);
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await obterFavoritos();
      return () => {
        setaFavoritos([]);
      };
    };
    initialize();
  }, []);

  return (
    <div>
      {loading ? <LinearProgress /> : ""}

      {favoritos &&
        favoritos.map((item, index) => (
          <FavoredCard
            name={item.nomeDestinatario}
            apelido={item.apelidoDestinatario}
            bank={item.nomeBanco}
            account={`${item.codAgencia} | ${item.codConta}-${item.digitoValidadorConta}`}
            accountType={item.tipoConta}
            key={index}
          />
        ))}
    </div>
  );
}
