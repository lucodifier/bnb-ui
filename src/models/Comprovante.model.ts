export interface ComprovanteModel {
    // codigoIdentificadorHistorico: number,
    // codigoTransacao: number,
    // codigoModulo: number,
    // codigoUsuario: number,
    // dataCadastro: string,
    // dataEfetivacao: string,
    // dataTransacao: string,
    // valorTransacao: number,
    // codigoItemMenu: number,
    // statusTransacao: number,
    // codigoAgenciaOrigem: number,
    // nomeAgenciaOrigem: string,
    // codigoContaOrigem: number,
    // digitoContaOrigem: number,
    // tipoContaOrigem: string,
    // nomePrimeiroTitularOrigem: string,
    // numeroCpfPrimeiroTitularOrigem: string,
    // codigoAgenciaDestino: number,
    // nomeAgenciaDestino: string,
    // codigoContaDestino: number,
    // digitoContaDestino: number,
    // tipoContaDestino: string,
    // codigoBancoDestino: number,
    // nomeBancoDestino: string,
    // nomePrimeiroTitularDestino: string,
    // numeroCpfPrimeiroTitularDestino: string,
    // codigoFinalidade: number,
    // comprovanteTransacao: string,
    // codigoAutenticacao: string,
    // codigoMotivo: number,
    // numeroIpTransacao: string,
    // indicadorOrigem: string
    codigoTransacao: number;
    valorTransacao: number;
    dataTransacao: string;
    nomeRecebedor: string;
    tipoIniPagamento: number;
    statusTransacao: number;
}