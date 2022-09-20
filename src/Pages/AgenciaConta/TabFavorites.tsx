import React, { useEffect, useState, useContext } from "react";
import { favoritoService } from "../../../services/favorito.service";
import { FavoritoModel } from "../../models/Favorito.model";
import FavoredCard from "../../layouts/components/FavoredCard";
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
      return data;
    } catch {
      return [];
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    let foiCancelado = false;
    (async () => {
      const response = await obterFavoritos();
      if (!foiCancelado) {
        console.log("setou");
        setaFavoritos(response as FavoritoModel[]);
      }
    })();

    return () => {
      foiCancelado = true;
    };
  }, []);

  return (
    <div>
      {loading ? <LinearProgress /> : ""}

      {favoritos &&
        favoritos.map((item, index) => (
          <FavoredCard
            name={item.nomeDestinatario}
            apelido={item.apelidoDestinatario}
            document={item.cpfCnpjDestinatario}
            to={"/pagamento-agencia-conta"}
            bank={item.nomeBanco}
            account={`${item.codAgencia} | ${item.codConta}-${item.digitoValidadorConta}`}
            accountType={item.tipoConta}
            key={index}
          />
        ))}
    </div>
  );
}
