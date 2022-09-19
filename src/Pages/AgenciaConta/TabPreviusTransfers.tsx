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
      setAnteriores(response);
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await obterAnteriores();
      return () => {
        setAnteriores([]);
      };
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
            apelido={""}
            bank={item.nomeBanco}
            account={`${item.codigoAgencia} | ${item.codigoConta}-${item.digitoConta}`}
            accountType={item.tipoConta}
            key={index}
          />
        ))}
    </div>
  );
}
