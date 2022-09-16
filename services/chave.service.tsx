import api from './api';

const path = "Cadastro";

// substituir pelo date-fns
function generateDate() {
    const dataAtual = new Date();
    const dd = dataAtual.getDay().toString().padStart(2, '0');
    const mm = Number(dataAtual.getDate() + 1).toString().padStart(2, '0');
    const yyyy = dataAtual.getFullYear();
    const hora = dataAtual.getHours().toString().padStart(2, '0');
    const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
    const segundos = dataAtual.getSeconds().toString().padStart(2, '0');

    return (`${mm}/${dd}/${yyyy} ${hora}:${minutos}:${segundos}`);
}

function converterChaveTelefone(chave: string) {
    return chave.charAt(0) === '+' ? `%2B${chave.slice(1)}` : chave;
}

export function consultarChave(agencia: string, numeroConta: string, tipoConta: string, chaveEnderecamento: string, cpfCnpj: string, codigoCliente: string){
    
    return api.get(`${path}/consulta-chave-cliente-manual-pix`, {
        params: {
            TipoOperacao: 'ConsultarChaveClientePIX',
            SubTipo: 5,
            Agencia: agencia,
            NumeroConta: numeroConta,
            TipoConta: tipoConta,
            ChaveEnderecamento: converterChaveTelefone(chaveEnderecamento),
            Data: generateDate(),
            CpfCnpj: cpfCnpj,
            CodigoCliente: codigoCliente
        }
    });
}