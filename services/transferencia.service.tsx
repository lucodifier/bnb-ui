import api from "./api";
import { handlingService } from "./handling.service";

const base_path = "Transferencia";

export const transferenciaService = {
  obterTransferenciasAnterioresAgenciaConta,
};

export function obterTransacoesAnterioresPorChave(
  agencia: string,
  numeroConta: string,
  digitoConta: string,
  tipoConta: string
) {
  return api.get(`${base_path}/dados-transferenciaspix-anteriores`, {
    params: {
      CodigoAgencia: agencia,
      CodigoConta: numeroConta,
      DigitoConta: digitoConta,
      TipoConta: tipoConta,
      TipoIniPagamento: "DICT",
    },
  });
}

async function obterTransferenciasAnterioresAgenciaConta() {
  try {
    let response = await api.get(
      `${base_path}/dados-transferenciaspix-anteriores`,
      {
        params: {
          TipoIniPagamento: "DICT",
        },
      }
    );

    let treated = handlingService.handleResponse(
      response,
      "favoritesService.getFavorites"
    );
    if (treated) {
      return treated;
    }
    return null;
  } catch (error) {
    handlingService.cathError(error, "favoritesService.getFavorites");
    return null;
  }
}
