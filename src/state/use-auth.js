import React, { useEffect } from 'react';
import globalHook from 'use-global-hook';
import { useGet } from './use-get';

const initialState = {
  isLoading: true,
  hasChecked: false,
  hasAuth: false,
};

const updateLoginDetails = (store, details) => {
  store.setState({
    hasAuth: details.data !== null,
    hasChecked: !details.isFirstLoading,
    isLoading: details.isLoading,
  });
};

const useGlobalAuth = globalHook(React, initialState, { updateLoginDetails });

export const useAuth = () => {
  const [state, { updateLoginDetails }] = useGlobalAuth();
  const [sessionDetails] = useGet('/api/v1/session', {
    // poll: 1000,
  });

  // Persist new details in the global store
  useEffect(() => {
    updateLoginDetails(sessionDetails);
  }, [sessionDetails, updateLoginDetails]);

  return {
    ...state,
  };
};
