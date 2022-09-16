export enum TipoChaveEnum {
	CPF = "CPF",
	CNPJ = "CNPJ",
	CPF_CNPJ = "CPF_CNPJ",
	PHONE = "PHONE",
	EMAIL = "EMAIL",
	EVP = "EVP"
}

export function getTipoChaveFavoritoByNumber(tipoChave: number) {
	switch (tipoChave){
		case 1: return TipoChaveEnum.PHONE;
		case 2: return TipoChaveEnum.CPF_CNPJ;
		case 3: return TipoChaveEnum.EMAIL;
		case 4: return TipoChaveEnum.EVP;
		default: return undefined;
	}
}
