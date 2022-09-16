export class InfoChavePix {
    nomeRecebedor: string;
	apelidoRecebedor?: string;
	bancoRecebedor: string;
	chaveRecebedor: string;

    constructor(nomeRecebedor: string, bancoRecebedor: string, chaveRecebedor: string, apelidoRecebedor?: string) {
        this.nomeRecebedor = nomeRecebedor;
        this.apelidoRecebedor = apelidoRecebedor;
        this.bancoRecebedor = bancoRecebedor;
        this.chaveRecebedor = chaveRecebedor;
    }

}