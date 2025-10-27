import React, { useState, useEffect } from 'react';
import siteData from '../data/json/site-data.json';
import { SiteData, DataContextType } from '../types';
// import { createContext } from 'react';
import { DataContext } from './DataContextDef';

// Provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DataContextType>({
    site: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Use the imported data directly
        const site: SiteData = siteData;
        
        setData({
          site,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error loading data:', error);
        setData((prevData: DataContextType) => ({
          ...prevData,
          loading: false,
          error: 'Failed to load data',
        }));
      }
    };
    
    loadData();
  }, []);
  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
