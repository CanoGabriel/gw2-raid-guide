import React, {
  createContext,
} from "react";

const AuthContext = createContext({});

const AuthProvider = () => (
  <AuthContext.Provider value={{
    // user,
  }}
  >
    {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    {/* {!authLoading && children} */}
  </AuthContext.Provider>
);
export { AuthContext, AuthProvider };
