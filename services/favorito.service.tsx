import api from "./api";
import { handlingService } from "./handling.service";

const base_path = "Contatos";

export function obterFavoritosPorCpfCnpj(codigoCliente: string) {
  return api.get(
    `${base_path}/obter-favoritos-chave-pix?CodigoCliente=${codigoCliente}`
  );
}

export const favoritoService = {
  obterFavoritos,
  obterTransferenciasAnterioresAgenciaConta
};

async function obterFavoritos() {
  try {
    
    let response = await api.get(`${base_path}/obter-favoritos-conta`);
   
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

async function obterTransferenciasAnterioresAgenciaConta() {
  try {
    
    let response = await api.get(`${base_path}/transferencias-anteriores-agencia-conta`);
   
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
