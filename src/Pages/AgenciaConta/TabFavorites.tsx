import React, { useEffect, useState } from "react";
import { favoritoService } from "../../../services/favorito.service";
import { FavoritoModel } from "../../models/Favorito.model";
import FavoredCard from "./FavoredCard";
import { bancoService } from "../../../services/banco.service";
import { BancoModel } from "../../models/Banco.model";

export default function TabFavorites() {
  const [favoritos, setaFavoritos] = useState<FavoritoModel[]>([]);

  const obterFavoritos = async () => {
    const response = await favoritoService.obterFavoritos();
    const listaFavoritos = response as FavoritoModel[];
    const listaBancos = (await bancoService.listaBancos()) as BancoModel[];
    const data = listaFavoritos.map((item) => {
        item.nomeBanco = bancoService.filtraPorISPB(listaBancos, item.ispb);
        if (!item.nomeBanco)
          item.nomeBanco = item.ispb;
        return item;
      });
      setaFavoritos(data);
  };

  useEffect(() => {
    const initialize = async () => {
      await obterFavoritos();
    };
    initialize();
  }, []);

  return (
    <div>
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
