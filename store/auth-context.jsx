import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  isLoading: true,
  login: (token) => {},
  logout: () => {},
});

export function AuthContextProvider(props) {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = Cookies.get("auth");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  function loginHandler(token) {
    setToken(token);
    setIsLoggedIn(true);
  }

  function logoutHandler() {
    // remove the httpOnly cookie
    Cookies.remove("auth");
    setToken(null);
    setIsLoggedIn(false);
  }

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    isLoading: isLoading,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider key={isLoggedIn} value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;