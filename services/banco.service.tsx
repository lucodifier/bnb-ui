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
  obterBanco,
};

async function obterBanco(ispb: string) {
  try {
    let response = await api.get(`${base_path}/Bancos`);
    let treated = handlingService.handleResponse(
      response,
      "bancoService.obterBanco"
    );
    if (treated) {
      return treated.find((banco) => banco.ispbBanco === ispb);
    }
    return null;
  } catch (error) {
    handlingService.cathError(error, "bancoService.obterBanco");
    return null;
  }
}
