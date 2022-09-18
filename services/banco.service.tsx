import { BancoModel } from "../src/models/Banco.model";
import api from "./api";
import { handlingService } from "./handling.service";

const base_path = "Bancos";

export function obterBancos() {
  return api.get(base_path);
}

export function getByIspb(bancos: Array<BancoModel>, ispb: string) {
  return bancos.find((banco) => banco.ispbBanco === ispb);
}

export function getNameByIspb(bancos: Array<BancoModel>, ispb: string): string {
  const banco = getByIspb(bancos, ispb);
  return banco ? banco.nomeBanco : ispb;
}

export const bancoService = {
  listaBancos,
  filtraPorISPB
};

async function listaBancos() {
  try {
    
    let response = await api.get(base_path);
    let treated = handlingService.handleResponse(
      response,
      "bancoService.obterBanco"
    );
    if (treated) {
      return treated;
    }
    return null;
  } catch (error) {
    handlingService.cathError(error, "bancoService.obterBanco");
    return null;
  }
}

function filtraPorISPB(bancos: Array<BancoModel>, ispb: string): string {
  const banco = getByIspb(bancos, ispb);
  return banco ? banco.nomeBanco : ispb;
}
