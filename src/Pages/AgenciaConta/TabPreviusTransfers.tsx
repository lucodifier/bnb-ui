import React, { useEffect, useState } from "react";
import FavoredCard from "../../layouts/components/FavoredCard";
import { LinearProgress } from "@material-ui/core";
import { transferenciaService } from "../../../services/transferencia.service";
import { TransferenciaAnteriorModel } from "../../models/TransferenciaAnterior.model";

export default function TabPreviusTransfers() {
  const [loading, isLoading] = useState(true);
  const [anteriores, setAnteriores] = useState<TransferenciaAnteriorModel[]>(
    []
  );

  const obterAnteriores = async () => {
    isLoading(true);
    try {
      const response =
        await transferenciaService.obterTransferenciasAnterioresAgenciaConta();
      return response;
    } finally {
      isLoading(false);
    }
    return [];
  };

  useEffect(() => {
    let foiCancelado = false;
    (async () => {
      const response = await obterAnteriores();
      if (!foiCancelado) {
        setAnteriores(response as TransferenciaAnteriorModel[]);
      }
    })();

    return () => {
      foiCancelado = true;
    };
  }, []);

  return (
    <div>
      {loading ? <LinearProgress /> : ""}
      {anteriores &&
        anteriores.map((item, index) => (
          <FavoredCard
            name={item.nomeDestinatario}
            apelido={""}
            document={item.numeroCpfDestinatario}
            to={"/pagamento-agencia-conta"}
            bank={item.nomeBanco}
            account={`${item.codigoAgencia} | ${item.codigoConta}-${item.digitoConta}`}
            accountType={item.tipoConta}
            key={index}
          />
        ))}
    </div>
  );
}
