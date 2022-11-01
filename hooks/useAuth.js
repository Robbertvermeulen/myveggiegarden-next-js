import { useEffect, useState } from "react";
import {
  storeAuthTokenInStorage,
  getAuthTokenFromLocalStorage,
  removeAuthTokenFromStorage,
} from "../utils/auth";

const useAuth = () => {
  const [authToken, setAuthToken] = useState(false);

  useEffect(() => {
    const token = getAuthTokenFromLocalStorage();
    if (token) setAuthToken(token);
  }, []);

  useEffect(() => {
    if (authToken) storeAuthTokenInStorage(authToken);
    else removeAuthTokenFromStorage();
  }, [authToken]);

  return [authToken, setAuthToken];
};

export default useAuth;
