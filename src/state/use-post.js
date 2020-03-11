import { useState } from 'react';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

const INITIAL_STATE = {
  isLoading: false,
  isFirstLoading: true,
  data: null,
  errors: null,
  response: null,
};

export const usePost = (url, options = {}) => {
  const [state, setState] = useState(INITIAL_STATE);
  const { ...fetchOptions } = options;
  const endpointUrl = SERVER_URL + url;

  const send = async (url, data, options) => {
    setState(state => ({
      ...state,
      isLoading: true,
      errors: null,
      data: null,
      response: null,
    }));

    try {
      const response = await axios.post(url, data, {
        ...fetchOptions,
        withCredentials: true,
      });
      setState(state => ({
        ...state,
        isLoading: false,
        isFirstLoading: false,
        data: response.data.success ? response.data.data : null,
        errors: response.data.success ? null : response.data.errors,
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

  return [
    state,
    {
      // Provide a lazy and fully customizable interface to Post
      send: (data, _options = fetchOptions, _url = endpointUrl) =>
        send(_url, data, _options),
    },
  ];
};
