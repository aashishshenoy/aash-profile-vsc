import React, { createContext, useContext, useState } from 'react';
import { Tab, TabContextType, TabProviderProps } from '../types';

const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
};

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const addTab = (tab: Tab) => {
    // Check if tab already exists
    const existingTabIndex = tabs.findIndex(t => t.id === tab.id);
    
    if (existingTabIndex >= 0) {
      // Tab exists, just set it as active
      setActiveTabId(tab.id);
    } else {
      // Add new tab
      setTabs(prevTabs => [...prevTabs, tab]);
      setActiveTabId(tab.id);
    }
  };

  const closeTab = (tabId: string) => {
    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    
    if (tabIndex === -1) return;
    
    // If closing the active tab, set a new active tab
    if (tabId === activeTabId) {
      if (tabs.length === 1) {
        // This is the only tab, set active to null
        setActiveTabId(null);
      } else if (tabIndex === tabs.length - 1) {
        // This is the last tab, set the previous one as active
        setActiveTabId(tabs[tabIndex - 1].id);
      } else {
        // Set the next tab as active
        setActiveTabId(tabs[tabIndex + 1].id);
      }
    }
    
    // Remove the tab
    setTabs(prevTabs => prevTabs.filter(tab => tab.id !== tabId));
  };

  const setActiveTab = (tabId: string) => {
    setActiveTabId(tabId);
  };

  const closeAllTabs = () => {
    setTabs([]);
    setActiveTabId(null);
  };

  return (
    <TabContext.Provider
      value={{
        tabs,
        activeTabId,
        addTab,
        closeTab,
        setActiveTab,
        closeAllTabs
      }}
    >
      {children}
    </TabContext.Provider>
  );
};
