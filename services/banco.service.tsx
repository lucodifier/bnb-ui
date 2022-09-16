import { BancoModel } from '../src/models/Banco.model';
import api from './api';

const path = "Bancos";

export function obterBancos(){
    return api.get(path);
}

export function getByIspb(bancos: Array<BancoModel>, ispb: string){
    return bancos.find((banco) => banco.ispbBanco === ispb);
}

export function getNameByIspb(bancos: Array<BancoModel>, ispb: string): string{
    const banco = getByIspb(bancos, ispb);
    return banco ? banco.nomeBanco : ispb;
}