// context/UserContext.js
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState(null); // Initial state
  const [token, setToken] = useState(null);

  return (
    <UserContext.Provider value={{ userID, setUserID, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
