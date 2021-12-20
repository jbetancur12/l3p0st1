import React, { createContext, useEffect, useReducer, useState } from 'react';
import appReducer from './AppReducer';

const initialState = {
  categories: { name: '', forma: '', products: [], providers: [] },
};

export const GlobalContext = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addCategory = (category) => {
    dispatch({ type: 'ADD_CATEGORY', payload: category });
  };

  const loadCategories = (categories) => {
    dispatch({ type: 'LOAD_CATEGORIES', payload: categories });
  };

  const updateCategory = (category) => {
    dispatch({ type: 'UPDATE_CATEGORY', payload: category });
  };

  const deleteCategory = (category) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: category });
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        addCategory,
        loadCategories,
        deleteCategory,
        updateCategory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
