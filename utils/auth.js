export const storeAuthTokenInStorage = (token) => {
  localStorage.setItem("_authToken", token);
};

export const getAuthTokenFromLocalStorage = () => {
  return localStorage.getItem("_authToken");
};

export const removeAuthTokenFromStorage = () => {
  return localStorage.removeItem("_authToken");
};
