import React, { useEffect } from 'react';
import globalHook from 'use-global-hook';
import { useGet } from './use-get';

const initialState = {
  isLoading: false,
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
  const [sessionDetails, sessionActions] = useGet('/api/v1/session', {
    lazy: true,
  });

  // First check once the app starts
  // using the hooks in other components should be safe
  useEffect(() => {
    if (!state.isLoading && !state.hasChecked) {
      sessionActions.fetch();
    }
  }, [state.isLoading, state.hasChecked, sessionActions]);

  // Persist new details in the global store
  useEffect(() => {
    console.log('>>>', sessionDetails);
    updateLoginDetails(sessionDetails);
  }, [sessionDetails, updateLoginDetails]);

  return {
    ...state,
  };
};
