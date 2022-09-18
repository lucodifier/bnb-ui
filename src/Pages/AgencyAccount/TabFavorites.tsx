import React, { useEffect, useState } from "react";
import { favoritoService } from "../../../services/favorito.service";
import { FavoritoModel } from "../../models/Favorito.model";
import FavoredCard from "./FavoredCard";
import { bancoService } from "../../../services/banco.service";

export default function TabFavorites() {
  const [favoritos, setaFavoritos] = useState<FavoritoModel[]>([]);

  const obterFavoritos = async () => {
    const response = await favoritoService.obterFavoritos();
    let listaFavoritos = response as FavoritoModel[];
    let data = await Promise.all(
      listaFavoritos.map(async (item) => {
        item.nomeBanco = await bancoService.obterBanco(item.ispb);
        return item;
      })
    );
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
            bank={item.nomeBanco}
            account={`${item.codAgencia}|${item.codConta}-${item.digitoValidadorConta}`}
            accountType={item.tipoConta}
          />
        ))}
    </div>
  );
}
