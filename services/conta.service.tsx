import api from "./api";
import { handlingService } from "./handling.service";

const base_path = "Contas";

export const contaService = {
  obterSaldo,
};

async function obterSaldo(agencia, conta, digito) {
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      agencia,
      conta,
      digito,
    };

    let response = await api.get(
      `${base_path}/dados-transferenciaspix-anteriores`,
      {
        headers: headers,
      }
    );

    let treated = handlingService.handleResponse(
      response,
      "contaService.obterSaldo"
    );
    if (treated) {
      return treated;
    }
    return null;
  } catch (error) {
    handlingService.cathError(error, "contaService.obterSaldo");
    return null;
  }
}
