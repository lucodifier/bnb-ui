import CryptoJS from 'crypto-js';


export const favoritoService = {
    criptografar,
    descriptografar
  };

function criptografar(data) {
  const cypherText = CryptoJS.AES.encrypt(data, process.env.REACT_APP_CRYPTO_KEY).toString();
  return cypherText;
}

function descriptografar(data) {
  const bytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_CRYPTO_KEY);
  const decryptText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptText;
}
