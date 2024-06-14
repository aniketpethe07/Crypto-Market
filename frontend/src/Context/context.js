// src/Context/loginContext.js
import { createContext, useState } from "react";

export const loginContext = createContext({
  email: null,
  loggedIn: false,
  setEmail: () => {},
  setLoggedIn: () => {},
});

export const LoginProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <loginContext.Provider value={{ email, setEmail, loggedIn, setLoggedIn }}>
      {children}
    </loginContext.Provider>
  );
};
