import api from './api';

const path = 'Contatos';

export function obterFavoritosPorCpfCnpj(codigoCliente: string){
    return api.get(`${path}/obter-favoritos-chave-pix?CodigoCliente=${codigoCliente}`);
}