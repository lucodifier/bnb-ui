import api from './api';

const base_path = 'Contatos';

export const favoritesService = {
    getFavorites
  };

export function getFavorites(document: string){
    return api.get(`${base_path}/obter-favoritos-chave-pix?CodigoCliente=${document}`);
}