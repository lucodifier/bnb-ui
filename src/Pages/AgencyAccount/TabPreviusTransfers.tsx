import React from "react";
import FavoredCard from "./FavoredCard";

export default function TabPreviusTransfers() {
  return (
    <div>
      <FavoredCard
        name='Antônio Juliano Cavalcante (Juliano)'
        bank='Caixa Econômica Federal'
        account='0016 | 0000003874-1'
        accountType='{Conta corrente}'
      />
      <FavoredCard
        name='Bartolomeu Pereira da Silva (Pereira)'
        bank='Caixa Econômica Federal'
        account='0016 | 0000003874-1'
        accountType='{Conta corrente}'
      />
    </div>
  );
}
