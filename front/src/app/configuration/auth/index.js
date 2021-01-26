const authTokenStorageKey = "auth-token";

const saveAuthToken = (token) => {
  localStorage.setItem(authTokenStorageKey, token);
};

const getAuthToken = () => localStorage.getItem(authTokenStorageKey);

export { getAuthToken, saveAuthToken };
