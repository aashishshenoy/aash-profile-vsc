import { Search, X, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTabContext } from '../../context/TabContext';
import { TabItemProps } from '../../types';

const TabBar: React.FC = () => {
  const { tabs, activeTabId, setActiveTab, closeTab, closeAllTabs } = useTabContext();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  if (tabs.length === 0) {
    return null;
  }
  
  const handleCloseAll = () => {
    closeAllTabs();
    // Navigate to the current route to ensure we're showing the default content
    const currentPath = window.location.hash.substring(1) || '/';
    navigate(currentPath);
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    // For now, just log the search query
    // In a real implementation, you would search through content and navigate to results
  };

  return (
    <div className="flex items-center bg-gray-800 border-b border-gray-700">
      <div className="flex-1 overflow-x-auto flex">
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            tab={tab}
            isActive={tab.id === activeTabId}
            onActivate={() => setActiveTab(tab.id)}
            onClose={() => closeTab(tab.id)}
          />
        ))}
      </div>
      <div className="flex items-center">
        {isSearchOpen && (
          <motion.form 
            initial={{ width: 0, opacity: 0 }} 
            animate={{ width: 200, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mr-2"
            onSubmit={handleSearch}
          >
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-gray-700 text-white px-3 py-1 rounded text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </motion.form>
        )}
        <motion.button
          className="p-2 text-gray-400 hover:text-white focus:outline-none flex-shrink-0"
          onClick={toggleSearch}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={isSearchOpen ? "Close Search" : "Search"}
        >
          <Search size={16} />
        </motion.button>
        {tabs.length > 0 && (
          <motion.button
            className="p-2 text-gray-400 hover:text-white focus:outline-none flex-shrink-0"
            onClick={handleCloseAll}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Close All Tabs"
          >
            <XCircle size={16} />
          </motion.button>
        )}
      </div>
    </div>
  );
};

const TabItem: React.FC<TabItemProps> = ({ tab, isActive, onActivate, onClose }) => {
  return (
    <motion.div
      className={`flex items-center px-4 py-2 cursor-pointer border-r border-gray-700 min-w-[120px] max-w-[200px] ${
        isActive ? 'bg-gray-900' : 'bg-gray-800 hover:bg-gray-700'
      }`}
      onClick={onActivate}
      whileHover={{ backgroundColor: isActive ? undefined : 'rgba(75, 85, 99, 1)' }}
    >
      <div className="flex-1 truncate text-sm text-gray-300">{tab.title}</div>
      <motion.button
        className="ml-2 text-gray-500 hover:text-gray-300 focus:outline-none"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <X size={14} />
      </motion.button>
    </motion.div>
  );
};

export default TabBar;
