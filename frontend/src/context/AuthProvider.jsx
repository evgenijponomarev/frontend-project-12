import React from 'react';
import { AuthContext } from './context.js';

const AuthProvider = ({ children }) => {
  const savedUserData = JSON.parse(localStorage.getItem('userData'));
  const [loggedIn, setLoggedIn] = React.useState(Boolean(savedUserData));
  const [user, setUser] = React.useState(
    savedUserData ? { username: savedUserData.username } : null,
  );

  const logIn = React.useCallback((userData) => {
    setLoggedIn(true);
    setUser({ username: userData.username });
  }, []);

  const logOut = React.useCallback(() => {
    localStorage.removeItem('userData');
    setUser(null);
    setLoggedIn(false);
  }, []);

  const getAuthHeader = React.useCallback(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.token) return { Authorization: `Bearer ${userData.token}` };

    logOut();

    return {};
  }, [logOut]);

  const providedData = React.useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
    getAuthHeader,
    user,
  }), [loggedIn, logIn, logOut, getAuthHeader, user]);

  return (
    <AuthContext.Provider value={providedData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
