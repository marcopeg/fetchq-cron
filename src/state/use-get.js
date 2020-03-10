import { useState, useEffect } from 'react';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

const INITIAL_STATE = {
  isLoading: true,
  isFirstLoading: true,
  data: null,
  errors: null,
  response: null,
};

export const useGet = (
  url,
  options = {
    lazy: false,
    poll: null, // interval in ms, must be above 0 to work
  },
) => {
  const [state, setState] = useState(INITIAL_STATE);
  const { lazy, poll, ...fetchOptions } = options;

  const fetch = async (url, options) => {
    console.log('fetch', url, options);
    setState(state => ({ ...state, isLoading: true }));
    try {
      const response = await axios.get(SERVER_URL + url, {
        ...options,
        withCredentials: true,
      });
      setState(state => ({
        ...state,
        isLoading: false,
        isFirstLoading: false,
        data: response.data,
        errors: null,
        response,
      }));
    } catch (error) {
      setState(state => ({
        ...state,
        isLoading: false,
        isFirstLoading: false,
        data: null,
        errors: [error],
        response: error.response,
      }));
    }
  };

  // First fetch, only if not lazy
  useEffect(() => {
    if (!lazy) {
      fetch(url, fetchOptions);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    let t = null;
    if (poll) {
      t = setInterval(() => fetch(url, fetchOptions), poll);
    }

    return () => {
      clearInterval(t);
    };
  }, []); // eslint-disable-line

  return [state, { fetch }];
};
