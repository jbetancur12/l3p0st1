import React from 'react';
import { GlobalContext } from './GlobalContext';
import { GlobalContext as ProviderContext } from './ProviderContext';

import { combineComponents } from './combineComponents';
const providers = [GlobalContext, ProviderContext];
export const AppContextProvider = combineComponents(...providers);
