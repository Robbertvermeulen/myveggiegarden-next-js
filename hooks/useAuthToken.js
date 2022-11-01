import { useEffect, useState } from "react";
import { getAuthTokenFromLocalStorage } from "../utils/auth";

export default useAuthToken = () => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = getAuthTokenFromLocalStorage();
    if (token) setAuthToken(token);
  }, []);

  return authToken;
};
