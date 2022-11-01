import { useEffect, useState } from "react";
import { validateAuthToken } from "../utils/api";
import {
  storeAuthTokenInStorage,
  getAuthTokenFromLocalStorage,
  removeAuthTokenFromStorage,
} from "../utils/auth";

const useAuth = () => {
  const [authToken, setAuthToken] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = getAuthTokenFromLocalStorage();
    if (token) setAuthToken(token);
  }, []);

  useEffect(() => {
    (async () => {
      if (authToken) {
        const valid = await validateAuthToken(authToken);
        if (valid) {
          storeAuthTokenInStorage(authToken);
          setLoggedIn(true);
        } else {
          removeAuthTokenFromStorage();
          setLoggedIn(false);
        }
      } else {
        removeAuthTokenFromStorage();
      }
    })();
  }, [authToken]);

  return { loggedIn, authToken, setAuthToken };
};

export default useAuth;
