import React, { useContext, useState, useEffect } from 'react';
import { useGet } from './use-get';
import { usePost } from './use-post';

const initialState = {
  // Properties
  isLoading: false,
  errorMsg: null,
  hasChecked: false,
  hasAuth: false,

  // Methods
  login: () => {},
};

export const AuthContext = React.createContext(initialState);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [sessionInfo] = useGet('/api/v1/session', { poll: 5000 });
  const [loginInfo, loginActions] = usePost('/api/v1/session');
  const [auth, setAuth] = useState(null);

  const login = (uname = 'console', passw = '') =>
    loginActions.send({
      uname,
      passw,
    });

  // Persist auth info after login or session check
  useEffect(() => {
    const data = sessionInfo.data || loginInfo.data;
    if (data) {
      setAuth(data);
    }
  }, [sessionInfo.data, loginInfo.data]);

  // Remove auth info in case of session or login errors
  useEffect(() => {
    const errors = sessionInfo.errors || loginInfo.errors;
    if (errors) {
      setAuth(null);
    }
  }, [sessionInfo.errors, loginInfo.errors]);

  const currentState = {
    ...initialState,
    // Properties
    isLoading: loginInfo.isLoading,
    errorMsg: loginInfo.errors ? loginInfo.errors[0].message : null,
    hasChecked: !sessionInfo.isFirstLoading,
    hasAuth: auth !== null,
    // Methods
    login,
  };

  return (
    <AuthContext.Provider value={currentState}>{children}</AuthContext.Provider>
  );
};
