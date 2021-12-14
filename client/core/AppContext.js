import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [valuesContext, setValuesContext] = useState({
    product: '',
    provider: '',
    content: '',
    selectedDate: '',
    email: '',
  });
  return (
    <AppContext.Provider value={{ valuesContext, setValuesContext }}>
      {children}
    </AppContext.Provider>
  );
}
