import React, { createContext, useEffect, useReducer, useState } from 'react';
import appReducer from './ProductReducer';

const initialState = {
  products: {},
};

export const GlobalContext = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addProduct = (product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  const loadProducts = (products) => {
    dispatch({ type: 'LOAD_PRODUCTS', payload: products });
  };

  const updateProduct = (product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
  };

  const deleteProduct = (product) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: product });
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        addProduct,
        loadProducts,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
