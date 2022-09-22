import { TipoChaveEnum } from "../src/enums/tipo-chave.enum";

export function formatDocument(cpf: string) {
  //retira os caracteres indesejados...
  cpf = cpf.replace(/[^\d]/g, "");

  //realizar a formatação...
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export const toCurrency = (value) => {
  if (value) {
    
    value = value.replace(/\D/g, "");
    try {
      return Number(value).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  return "";
};

export const toCurrencyNumber = (value) => {
  if (value) {
    try {
      value =
        value.toString().substring(0, value.toString().length - 2) +
        "." +
        value.toString().substring(value.toString().length - 2);

      if (
        value.split(".")[0] === "00" ||
        value.split(".")[0] === "000" ||
        value.split(".")[0] === "0000" ||
        value.split(".")[0] === "00000"
      )
        return value;

      return Number(value);
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  return "";
};

export const toCurrencyDecimal = (value) => {
  if (value && value !== "0") {
    try {
      value =
        value.toString().substring(0, value.toString().length - 2) +
        "," +
        value.toString().substring(value.toString().length - 2);

      return value;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  return "";
};

export const toDate = (value) => {
  
  try {
    return new Date(value).toLocaleDateString("pt-BR");
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const toTime = (value) => {
  try {
    return new Date(value).toLocaleTimeString("pt-BR");
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const toDecimal = (value) => {
  if (value) {
    var decimals = value.toString().replace(",", ".");

    return Number(decimals);
    // if (decimals.length > 1) {
    //   var initial = decimals[0];
    //   var end = decimals[1];
    //   if (decimals[1].length === 1) {
    //     end = decimals[1] + "0";
    //   }

    //   return `${initial}${end}`;
    // } else {
    //   return value + "00";
    // }
  }

  return 0;
};

export const toDecimalInt = (value) => {
  if (value) {
    var decimals = value.toString().split(".");

    if (decimals.length > 1) {
      var initial = decimals[0];
      var end = decimals[1];
      if (decimals[1].length === 1) {
        end = decimals[1] + "0";
      }

      return `${initial}${end}`;
    } else {
      return value + "00";
    }
  }

  return 0;
};

export function validateCNPJ(value) {
  if (!value) return false;

  value = value.replace(/[^\d]+/g, "");
  if (
    !value ||
    value.length !== 14 ||
    value === "11111111111111" ||
    value === "22222222222222" ||
    value === "33333333333333" ||
    value === "44444444444444" ||
    value === "55555555555555" ||
    value === "66666666666666" ||
    value === "77777777777777" ||
    value === "88888888888888" ||
    value === "99999999999999"
  ) {
    return false;
  }

  // Aceita receber o valor como string, nÃºmero ou array com todos os dÃ­gitos
  const isString = typeof value === "string";
  const validTypes =
    isString || Number.isInteger(value) || Array.isArray(value);

  // Elimina valor em formato invÃ¡lido
  if (!validTypes) return false;
  /*
  // Filtro inicial para entradas do tipo string
  if (isString) {
    // Limita ao mÃ¡ximo de 18 caracteres, para CNPJ formatado
    if (value.length > 18) return false;

    // Teste Regex para verificar se Ã© uma string apenas dÃ­gitos vÃ¡lida
    const digitsOnly = /^\d{14}$/.test(value);
    // Teste Regex para verificar se Ã© uma string formatada vÃ¡lida
    const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value);

    // Se o formato Ã© vÃ¡lido, usa um truque para seguir o fluxo da validaÃ§Ã£o
    if (digitsOnly || validFormat) return true;
    // Se nÃ£o, retorna invÃ¡lido
    else return false;
  }
*/
  // Guarda um array com todos os dÃ­gitos do valor
  const match = value.toString().match(/\d/g);
  const numbers = Array.isArray(match) ? match.map(Number) : [];

  // Valida a quantidade de dÃ­gitos
  if (numbers.length !== 14) return false;

  // Elimina invÃ¡lidos com todos os dÃ­gitos iguais
  const items = [...new Set(numbers)];
  if (items.length === 1) return false;

  // CÃ¡lculo validador
  const calc = (x) => {
    const slice = numbers.slice(0, x);
    let factor = x - 7;
    let sum = 0;

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i];
      sum += n * factor--;
      if (factor < 2) factor = 9;
    }

    const result = 11 - (sum % 11);

    return result > 9 ? 0 : result;
  };

  // Separa os 2 Ãºltimos dÃ­gitos de verificadores
  const digits = numbers.slice(12);

  // Valida 1o. dÃ­gito verificador
  const digit0 = calc(12);
  if (digit0 !== digits[0]) return false;

  // Valida 2o. dÃ­gito verificador
  const digit1 = calc(13);
  return digit1 === digits[1];
}

export function validateCPF(cpf) {
  if (typeof cpf !== "string") return false;
  cpf = cpf.replace(/[\s.-]*/gim, "");
  if (
    !cpf ||
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  ) {
    return false;
  }
  var soma = 0;
  var resto;
  for (var i = 1; i <= 9; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (i = 1; i <= 10; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

export function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export class MaskUtil {
	static maskByTipoChave(value: string, tipoChave: any) {

        if (TipoChaveEnum.CPF_CNPJ === tipoChave) {
            if( value.length === 11 ){
                return this.formatarMaskCpf(value);
            } else if (value.length > 11){
                return this.formatarMaskCNPJ(value);
            }
        }
		if (TipoChaveEnum.CPF === tipoChave) {
			return this.formatarMaskCpf(value);
		} else if (TipoChaveEnum.CNPJ === tipoChave) {
			return this.formatarMaskCNPJ(value);
		} else if (TipoChaveEnum.PHONE === tipoChave) {
			return this.maskFone(value);
		} 
		return value;
	}

	static formatarMaskCpf(value: string): string {
		value = value.replace(/\D/g, "");
		value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
		return value;
	}

	static formatAndHideMaskCpf(value: string): string {
		value = value.replace(/\D/g, "");
		value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "•••.$2.$3-••");
		return value;
	}

	static formatarMaskCNPJ(value: string): string {
		value = value.replace(/\D/g, "");
		value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
		return value;
	}

	static maskFone(value: string): string {
		let r = value.replace(/\D/g, "");
		r = r.replace(/^0/, "");
		if (r.length > 12) {
			r = r.replace(/^(\d\d)(\d\d)(\d{5})(\d{4}).*/, "+$1 ($2) $3-$4");
		} else if (r.length > 9) {
			r = r.replace(/^(\d\d)(\d\d)(\d{4})(\d{0,4}).*/, "+$1 ($2) $3-$4");
		} else if (r.length > 5) {
			r = r.replace(/^(\d\d)(\d\d)(\d{0,5})/, "+$1 ($2) $3");
		} else if (r.length > 4) {
			r = r.replace(/^(\d\d)(\d*)/, "+$1 ($2");
		} else if (r.length >= 1) {
            r = r.replace(/^(\d*)/, "+$1");
        } else if (r.length === 0) {
            r = "+";
        }
		return r;
	}
	static removeMask(value: string): string {
        let regex = /[^0-9]+/g;
        return value.charAt(0) === '+' ? `+${value.replace(regex, "")}` : value.replace(regex, "");
        //return value.replace(regex, "");

	}
}

