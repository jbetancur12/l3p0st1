import React, { createContext, useEffect, useReducer, useState } from 'react';
import appReducer from './RoleReducer';

const initialState = {
  roles: { role: '' },
};

export const GlobalContext = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addRole = (category) => {
    dispatch({ type: 'ADD_ROLE', payload: category });
  };

  const loadRoles = (categories) => {
    dispatch({ type: 'LOAD_ROLES', payload: categories });
  };

  const updateRole = (category) => {
    dispatch({ type: 'UPDATE_ROLE', payload: category });
  };

  const deleteRole = (category) => {
    dispatch({ type: 'DELETE_ROLE', payload: category });
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        addRole,
        loadRoles,
        deleteRole,
        updateRole,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
