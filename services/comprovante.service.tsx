import api from './api';

const path = "Transferencia";

export function obterComprovantesTransacao(
    dataInicial: string,
    dataFinal: string,
    agencia: number,
    conta: number,
    digito: number,
    tipoConta: String,
    ){

        return api.post(`${path}/obter-comprovantes-transacao`, {
            codigoModulo: 1,
            indicadorOrigem: "N",
            codigoAgenciaOrigem: agencia,
            codigoContaOrigem: conta,
            digitoContaOrigem: digito,
            tipoContaOrigem: tipoConta,
            funcionalidade: 1109,
            dataLimiteInferiorTransacao: dataInicial,
            dataLimiteSuperiorTransacao: dataFinal
        })

}