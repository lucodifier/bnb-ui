function handleResponse(response: any, area: string) {
  
  if (response.response){
    if (response.response.status == 400) {
        cathError(response.response.data.error[0], area, true);
        return response.response.data.error[0];
      }
  }

  if (response?.status === 204) {
    cathError(response, area, true);
    return null;
  }
  if (response?.status !== 200 && response.status !== 201) {
    cathError(response, area, true);
    return null;
  }

  if (response.data) {
    if (response.data.result.data) {
      return response.data.result.data;
    } else {
      return response.data.result;
    }
  }

  return response.result;
}

function cathError(error: any, area: string, warning: boolean = true) {
  try {
    if (!sessionStorage.getItem("ofv2-has-api-error")) {
      console.groupCollapsed("Erros de apis:");
      sessionStorage.setItem("ofv2-has-api-error", "true");
    }

    let message = "Error: " + (error?.status ? error?.status : error?.code);
    message += " | Local: " + area;
    message +=
      " | Status: " +
      (error?.statusText ? error?.statusText : error?.response?.status);
    if (error?.response?.data) {
      if (error?.response?.data.error) {
        message += " | Messages: " + error.response.data.error;
      }
    }
    if (!warning) {
      console.error(message);
    } else {
      console.warn(message);
    }

    if (error.response && error.response.status === 401) {
      if (import.meta.env.VITE_ENVIRONMENT !== "local")
        window.location.href = "/#/noAccess";
    }
  } catch (ex) {
    console.log(ex);
  }
}

export const handlingService = {
  handleResponse,
  cathError,
};
