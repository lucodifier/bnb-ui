import api from "./api";

export const authService = {
  login,
  refreshToken,
};

async function login(
  login: string,
  pass: string,
  tipoAutenticacao: string,
  dispositivo: string
) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    login: login,
    senha: pass,
    tipoAutenticacao: tipoAutenticacao,
    dispositivo: dispositivo,
  };
  try {
    var response: any = await api.get("Autenticacao", {
      headers: headers,
    });

    if (response) {
      if (response.response) {
        // Geralmente erro
        if (response.response.status !== 200) {
          throw { message: response.response.data.error };
        }
      }

      if (response.data) {
        if (response.data.httpStatus !== "OK" && response.data.error) {
          return response.data.error;
        }

        if (response.data.result) {
          return response.data.result;
        }
      }
    }
  } catch (error) {
    throw error;
  }

  return null;
}

async function refreshToken(
  agencia: string,
  conta: string,
  digito: string,
  tipoConta: string,
  tokenDispositivo: string
) {
  try {

    const payload = {
      agencia: agencia,
      conta: conta,
      digito: digito,
      tipoConta: tipoConta,
      tokenDispositivo: tokenDispositivo,
    };

    var response: any = await api.post("Autenticacao/RefreshTokenSSO", payload);

    if (response) {
      if (response.response) {
        // Geralmente erro
        if (response.response.status !== 200) {
          throw { message: response.response.data.error };
        }
      }

      if (response.data) {
        if (response.data.httpStatus !== "OK" && response.data.error) {
          return response.data.error;
        }

        if (response.data.result) {
          return response.data.result;
        }
      }
    }
  } catch (error) {
    throw error;
  }

  return null;
}
