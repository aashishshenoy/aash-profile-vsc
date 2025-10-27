import { useContext } from 'react';
import { DataContextType } from '../../types/index';
import { DataContext } from '../../context/DataContextDef';

// Custom hook to use the data context
export const useData = (): DataContextType => useContext(DataContext);