export const storageService = {
  store,
  recover,
  remove,
  removeAll,
  removeTransactions,
};

function store(key: string, value: any) {
  if (typeof value === "string") localStorage.setItem(key, value);
  else localStorage.setItem(key, JSON.stringify(value));
}

function recover(key: string) {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      var parsed = JSON.parse(value);
      return parsed;
    } catch (error) {
      if (typeof value === "string") return value;
    }
  }

  return null;
}

function remove(key: string) {
  localStorage.removeItem(key);
}

function removeAll() {
  localStorage.removeItem("transaction");
  localStorage.removeItem("contato");
  localStorage.removeItem("limits");
  localStorage.removeItem("balance");
  localStorage.removeItem("recipient");
  localStorage.removeItem("bank");
  localStorage.removeItem("dataTransaction");
  localStorage.removeItem("x_access_token");
  localStorage.removeItem("user_session");
}

function removeTransactions() {
  localStorage.removeItem("bank");
  localStorage.removeItem("recipient");
}
