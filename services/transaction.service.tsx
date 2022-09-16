import api from "./api";

export const transactionService = {
  get,
};

async function get(id) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    transacaoId: Number(id),
  };
  var response = await api.get("Transferencia/comprovante", {
    headers: headers,
  });
  if (response) {
    if (response.data) {
      if (response.data.httpStatus !== "OK" && response.data.error) {
        return response.data.error;
      }

      if (response.data.result) {
        return response.data.result;
      }
    }
  }
  return null;
}