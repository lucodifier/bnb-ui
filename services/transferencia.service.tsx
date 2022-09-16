import api from './api';

const path = 'Transferencia';

export function obterTransacoesAnterioresPorChave(
	agencia: string, 
	numeroConta: string,
	digitoConta: string,
	tipoConta: string
	) {
	return api.get(`${path}/dados-transferenciaspix-anteriores`, {
		params: {
			CodigoAgencia: agencia,
			CodigoConta: numeroConta,
			DigitoConta: digitoConta,
			TipoConta: tipoConta,
			TipoIniPagamento: 'DICT'
		}
	});

}