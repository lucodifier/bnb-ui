export interface FavoritoModel {
  idFavorito: number;
  idFavoritoChave: number;
  codCliente: number;
  nomeDestinatario: string;
  cpfCnpjDestinatario: string;
  tipoChave: number;
  chaveDestinatario: string;
  tipoConta: string;
  codAgencia: number;
  codConta: number;
  ispb: string;
  isChaveExcluido: boolean;
  isDestinatarioExcluido: boolean;
  isLimiteEspecifico: boolean;
  apelidoDestinatario: string;
  nomeBanco: string;
  digitoValidadorConta: string;
}
