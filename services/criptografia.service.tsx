import CryptoJS from 'crypto-js';


export const criptografiaService = {
    criptografar,
    descriptografar
  };

function criptografar(data) {
  const cypherText = CryptoJS.AES.encrypt(data, import.meta.env.VITE_CRYPTO_KEY).toString();
  return cypherText;
}

function descriptografar(data) {
  const bytes = CryptoJS.AES.decrypt(data, import.meta.env.VITE_CRYPTO_KEY);
  const decryptText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptText;
}
