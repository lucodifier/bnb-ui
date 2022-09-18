import React, { useEffect, useState } from "react";
import { favoritoService } from "../../../services/favorito.service";
import { FavoritoModel } from "../../models/Favorito.model";
import FavoredCard from "./FavoredCard";
import { bancoService } from "../../../services/banco.service";
import { BancoModel } from "../../models/Banco.model";
import { LinearProgress } from "@material-ui/core";

export default function TabPreviusTransfers() {
  const [loading, isLoading] = useState(true);
  const [anteriores, setAnteriores] = useState<FavoritoModel[]>([]);

  const obterAnteriores = async () => {
    isLoading(true);
    try {
      const response =
        await favoritoService.obterTransferenciasAnterioresAgenciaConta();
      const listaFavoritos = response as FavoritoModel[];
      const listaBancos = (await bancoService.listaBancos()) as BancoModel[];
      const data = listaFavoritos.map((item) => {
        item.nomeBanco = bancoService.filtraPorISPB(listaBancos, item.ispb);
        if (!item.nomeBanco) item.nomeBanco = item.ispb;
        return item;
      });
      setAnteriores(data);
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await obterAnteriores();
    };
    initialize();
  }, []);

  return (
    <div>
      {loading ? <LinearProgress /> : ""}
      {anteriores &&
        anteriores.map((item, index) => (
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
