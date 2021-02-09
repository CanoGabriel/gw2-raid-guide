import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  loginWithEmailAndPassword, loginAnonymously, getCurrentUser, signupEmail,
} from "../../user.service";
import { getAuthToken, saveAuthToken } from "../../../../configuration";

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const { children } = props;
  const history = useHistory();
  const [user, setUser] = useState(false);
  const [isAuthLoading, setAuthLoading] = useState(true);

  const isSignedIn = !!user;
  const isAnonymous = user?.provider_id === "anonymous";

  const getUser = async () => {
    const userResponse = await getCurrentUser();
    setUser(userResponse?.data);
  };

  const handleLoginWithEmail = async (email, password) => {
    const loginResponse = await loginWithEmailAndPassword(email, password);
    const { token } = loginResponse?.data || {};
    saveAuthToken(token);
    await getUser();
    history.push("/");
  };

  const handleAnonymously = async () => {
    const loginResponse = await loginAnonymously();
    const { token } = loginResponse?.data || {};
    saveAuthToken(token);
    await getUser();
    history.push("/");
  };

  const handleSignupEmail = async (email, password) => {
    const signupResponse = await signupEmail(email, password);
    const { token } = signupResponse?.data || {};
    saveAuthToken(token);
    await getUser();
    history.push("/");
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(false);
  };

  useEffect(() => {
    const token = getAuthToken();
    if (token && !user) {
      setAuthLoading(true);
      getUser()
        .catch((error) => {
          if (error?.response?.status === 401) {
            handleLogout();
          }
        })
        .finally(() => setAuthLoading(false));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user, handleAnonymously, handleLoginWithEmail, handleLogout, isSignedIn, isAnonymous, isAuthLoading, handleSignupEmail,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType(
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ),
};

export { AuthContext, AuthProvider };
