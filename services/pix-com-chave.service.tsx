import { obterFavoritosPorCpfCnpj } from "./favorito.service";
import { BancoModel } from "../src/models/Banco.model";
import { TipoChaveEnum } from "../src/enums/tipo-chave.enum";
import { FavoritoModel } from "../src/models/Favorito.model";
import { MaskUtil } from "./util.service";

export function retornaPlaceHolder(tipoChavePix: TipoChaveEnum) {
	switch (tipoChavePix) {
		case TipoChaveEnum.CPF_CNPJ: return 'Número do CPF/CNPJ';
		case TipoChaveEnum.PHONE: return 'Número do telefone';
		case TipoChaveEnum.EMAIL: return 'E-mail do destinatário';
		case TipoChaveEnum.EVP: return 'Chave aleatória do destinatário';
	}
}

export function aplicarMascara(chave: string) {
	const regex = /^\d+$/;

	if(regex.test(chave)) {
		return chave.length === 11 ? 
			MaskUtil.formatAndHideMaskCpf(chave) : MaskUtil.formatarMaskCNPJ(chave);
	} else if(chave.charAt(0) === '+') {
		return MaskUtil.maskFone(chave);
	} else{
		return chave;
	}
}

export function obtemFavoritos(bancosResgatados: Array<BancoModel>, dadosSessao: any){
	let favoritos: Array<FavoritoModel>;
	obterFavoritosPorCpfCnpj(dadosSessao.documento).then((response: any) => {
		console.log('carregou favoritos');

		favoritos = response.data.result.data;

		return favoritos;

		/*
		setChavePixList(favoritos.map((item: FavoritoModel) => {
			return new InfoChavePix(
				item.nomeDestinatario,
				getNameByIspb(bancosResgatados, item.ispb),
				item.chaveDestinatario,
				item.apelidoDestinatario
			);
		}));
		*/
	}).catch((error: any) => {
		console.log('erro: ' + error);
		return favoritos;
	});
	
}

export function validarChave(inputChave: string, tipoChavePix: TipoChaveEnum) {
	let chave: string = inputChave.trim();
    let invalid: boolean = false;
    let message: string;

    console.log('valida: ' + chave)

    if(TipoChaveEnum.CPF_CNPJ === tipoChavePix || TipoChaveEnum.PHONE === tipoChavePix){
      chave = MaskUtil.removeMask(chave);
    }
    console.log('sem mask: ' + chave);

    if(chave.length === 0 || (chave.length === 1 && TipoChaveEnum.PHONE)){
      invalid = true;
      message = 'Por favor, informe todos os dados obrigatórios';
    } else {

      message = 'Chave do recebedor inválida!';

      switch(tipoChavePix) {
        case TipoChaveEnum.PHONE: {
          invalid = (chave.charAt(0) !== '+' || chave.length !== 14);
        } break;

        case TipoChaveEnum.EMAIL: {
          invalid = (!chave.includes('@') || chave.length > 77);
        } break;

        case TipoChaveEnum.CPF_CNPJ: {
          invalid = (chave.length !== 11 && chave.length !== 14);
        } break;

        case TipoChaveEnum.EVP: {
          invalid = (chave.length !== 36);
        } break;
      }

    }

	return { invalid, message };
}