import React from "react";
import FavoredCard from "./FavoredCard";

export default function TabFavorites() {
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
      <FavoredCard
        name='Daniel de Castro e Silva (Castro)'
        bank='Caixa Econômica Federal'
        account='0016 | 0000003874-1'
        accountType='{Conta corrente}'
      />
      <FavoredCard
        name='Francisco Emanuel Maia de Carvalho (Emanuel)'
        bank='Caixa Econômica Federal'
        account='0016 | 0000003874-1'
        accountType='{Conta corrente}'
      />
    </div>
  );
}
