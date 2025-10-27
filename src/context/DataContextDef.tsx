import { createContext } from 'react';
import { DataContextType } from '../types';

// Create the context with default values
export const DataContext = createContext<DataContextType>({
  site: null,
  loading: true,
  error: null,
});
