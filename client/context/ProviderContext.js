import React, { createContext, useEffect, useReducer, useState } from 'react';
import appReducer from './ProviderReducer';

const initialState = {
  providers: {},
};

export const GlobalContext = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addProvider = (provider) => {
    dispatch({ type: 'ADD_PROVIDER', payload: provider });
  };

  const loadProviders = (providers) => {
    dispatch({ type: 'LOAD_PROVIDERS', payload: providers });
  };

  const updateProvider = (provider) => {
    dispatch({ type: 'UPDATE_PROVIDER', payload: provider });
  };

  const deleteProvider = (provider) => {
    dispatch({ type: 'DELETE_PROVIDER', payload: provider });
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        addProvider,
        loadProviders,
        deleteProvider,
        updateProvider,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
