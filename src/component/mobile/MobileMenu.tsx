import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Briefcase, BookOpen, Image, Code, Mail, FileText, FolderOpen, ChevronRight, ChevronDown, ChevronsDown, ChevronsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTabContext } from '../../context/TabContext';
import { useData } from '../common/dataUtils';
import { MobileMenuItem, ExplorerItem } from '../../types';

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<{[key: string]: boolean}>({});
  const navigate = useNavigate();
  const { addTab } = useTabContext();
  const { site } = useData();
  
  // Map to associate sidebar items with their corresponding explorer items
  const [sidebarToExplorerMap, setSidebarToExplorerMap] = useState<{[key: string]: ExplorerItem | null}>({}); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path: string, title: string, component: string) => {
    navigate(path);
    addTab({
      id: `tab-${component}`,
      title: title,
      path: path,
      component: component
    });
    setIsOpen(false);
  };

  // Set up the sidebar to explorer mapping when site data is available
  useEffect(() => {
    if (site?.sidebar && site?.explorer) {
      const mapping: {[key: string]: ExplorerItem | null} = {};
      
      site.sidebar.forEach(sidebarItem => {
        // Find matching explorer item by name (case insensitive)
        const matchingExplorer = site.explorer.find(
          explorerItem => explorerItem.name.toLowerCase() === sidebarItem.label.toLowerCase()
        );
        
        mapping[sidebarItem.label] = matchingExplorer || null;
      });
      
      setSidebarToExplorerMap(mapping);
    }
  }, [site]);

  // Expand or collapse all folders for a specific section
  const handleExpandCollapseAll = (sectionName: string, shouldExpand: boolean) => {
    if (!sidebarToExplorerMap[sectionName]?.children) return;
    
    const newExpandedFolders = { ...expandedFolders };
    const explorerItem = sidebarToExplorerMap[sectionName];
    
    // Function to recursively process folders
    const processFolder = (items: ExplorerItem[] | undefined, basePath: string) => {
      if (!items) return;
      
      items.forEach(item => {
        if (item.type === 'folder') {
          const folderPath = basePath ? `${basePath}/${item.name}` : `${sectionName}/${item.name}`;
          newExpandedFolders[folderPath] = shouldExpand;
          
          // Process children recursively
          if (item.children) {
            processFolder(item.children, folderPath);
          }
        }
      });
    };
    
    // Start processing from the top level
    if (explorerItem?.children) {
      processFolder(explorerItem.children, sectionName);
    }
    
    setExpandedFolders(newExpandedFolders);
  };

  const handleFileClick = (file: MobileMenuItem | ExplorerItem, section: string, parentPath: string = '') => {
    // If it's a folder, toggle its expanded state
    if (file.type === 'folder') {
      const folderPath = parentPath ? `${parentPath}/${file.name}` : `${section}/${file.name}`;
      setExpandedFolders(prev => ({
        ...prev,
        [folderPath]: !prev[folderPath]
      }));
      return;
    }
    
    // Create a unique ID for this file
    const fileId = parentPath ? `${parentPath}-${file.name}` : `${section}-${file.name}`;
    
    // Determine the component name based on the file type
    let componentName;
    
    if (file.name.toLowerCase().endsWith('.md')) {
      // For markdown files in blog categories
      if (section.toLowerCase() === 'blogs') {
        componentName = 'BlogMarkdownContent';
      } else if (section.toLowerCase() === 'code') {
        componentName = 'CodeMarkdownContent';
      } else if (section.toLowerCase() === 'gallery') {
        componentName = 'GalleryMarkdownContent';
      } else if (section.toLowerCase() === 'projects') {
        componentName = 'ProjectMarkdownContent';
      } else {
        componentName = 'MarkdownContent';
      }
    } else if (file.content) {
      // If the file has a content property, use that
      componentName = file.content;
    } else {
      // Default to a generic component name based on the file name
      componentName = file.name.split('.')[0] + 'Content';
    }
    
    // Construct the path
    const path = parentPath ? `/${section}/${parentPath}/${file.name}` : `/${section}/${file.name}`;
    
    // Add tab and navigate
    addTab({
      id: fileId,
      title: file.name,
      path: path,
      component: componentName,
      params: file.name.toLowerCase().endsWith('.md') ? { fileName: file.name, category: parentPath } : undefined
    });
    
    setIsOpen(false);
  };

  const toggleSectionExpand = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(name => name !== sectionName) 
        : [...prev, sectionName]
    );
  };

  // Only use sidebar items as the main navigation
  const sidebarItems = site?.sidebar || [];
  
  // Helper function to get icon for navigation items
  const getNavIcon = (path: string) => {
    switch(path.toLowerCase()) {
      case '/': return <Home size={18} />;
      case '/main': return <Home size={18} />;
      case '/projects': return <Briefcase size={18} />;
      case '/blogs': return <BookOpen size={18} />;
      case '/gallery': return <Image size={18} />;
      case '/code': return <Code size={18} />;
      case '/contact': return <Mail size={18} />;
      default: return <FileText size={18} />;
    }
  };
  
  // Helper function to get icon for explorer items
  const getFileIcon = (name: string, type: string) => {
    if (type === 'folder') return <FolderOpen size={18} className="text-yellow-400" />;
    
    if (name.endsWith('.md')) return <FileText size={18} className="text-blue-400" />;
    if (name.endsWith('.html')) return <Code size={18} className="text-green-400" />;
    if (name.endsWith('.txt')) return <FileText size={18} className="text-gray-400" />;
    
    return <FileText size={18} />;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 p-2 flex justify-center items-center border-b border-gray-700">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-gray-800 z-50 md:hidden overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Menu</h2>
              <button
                onClick={toggleMenu}
                className="p-1 rounded-md text-gray-400 hover:text-white focus:outline-none"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Items with Expandable Sections */}
            <div className="p-4">
              <ul className="space-y-3">
                {/* Main Navigation Items - Expandable */}
                {sidebarItems.map((item) => {
                  const explorerItem = sidebarToExplorerMap[item.label];
                  
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => toggleSectionExpand(item.label)}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 text-gray-300 hover:text-white transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          {getNavIcon(item.path)}
                          <span className="ml-3">{item.label}</span>
                        </div>
                        {expandedSections.includes(item.label) ? 
                          <ChevronDown size={16} /> : 
                          <ChevronRight size={16} />}
                      </button>
                      
                      {/* Expanded Section Content */}
                      {expandedSections.includes(item.label) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-1 ml-6"
                        >
                          {/* Overview link */}
                          <button
                            onClick={() => handleNavigation(item.path, item.label, item.component)}
                            className="w-full text-left px-3 py-1.5 rounded hover:bg-gray-700 text-gray-300 hover:text-white transition-colors flex items-center"
                          >
                            <span className="truncate">Overview</span>
                          </button>
                          
                          {/* Expand/Collapse All buttons (only show if there are explorer items) */}
                          {explorerItem && explorerItem.children && explorerItem.children.some(item => item.type === 'folder') && (
                            <div className="flex mt-2 mb-2 space-x-2">
                              <button
                                onClick={() => handleExpandCollapseAll(item.label, true)}
                                className="flex items-center px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded transition-colors"
                              >
                                <ChevronsDown size={12} className="mr-1" />
                                <span>Expand All</span>
                              </button>
                              <button
                                onClick={() => handleExpandCollapseAll(item.label, false)}
                                className="flex items-center px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded transition-colors"
                              >
                                <ChevronsUp size={12} className="mr-1" />
                                <span>Collapse All</span>
                              </button>
                            </div>
                          )}
                          
                          {/* Explorer files for this section */}
                          {explorerItem && explorerItem.children && (
                            <div className="mt-2">
                              {explorerItem.children.map((file) => {
                                const folderPath = `${explorerItem.name}/${file.name}`;
                                const isExpanded = expandedFolders[folderPath] || false;
                                
                                return (
                                  <div key={`${explorerItem.name}-${file.name}`}>
                                    <button
                                      onClick={() => handleFileClick(file, explorerItem.name, '')
                                      }
                                      className="w-full text-left px-3 py-1.5 rounded hover:bg-gray-700 text-gray-300 hover:text-white transition-colors flex items-center justify-between"
                                    >
                                      <div className="flex items-center">
                                        {getFileIcon(file.name, file.type)}
                                        <span className="ml-2 truncate">{file.name}</span>
                                      </div>
                                      {file.type === 'folder' && (
                                        isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                                      )}
                                    </button>
                                    
                                    {/* Nested files within folders */}
                                    {file.type === 'folder' && isExpanded && file.children && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="ml-4 mt-1"
                                      >
                                        {file.children.map((childFile) => {
                                          const nestedFolderPath = `${folderPath}/${childFile.name}`;
                                          const isNestedExpanded = expandedFolders[nestedFolderPath] || false;
                                          
                                          return (
                                            <div key={`${folderPath}-${childFile.name}`}>
                                              <button
                                                onClick={() => handleFileClick(childFile, explorerItem.name, file.name)
                                                }
                                                className="w-full text-left px-3 py-1.5 rounded hover:bg-gray-700 text-gray-300 hover:text-white transition-colors flex items-center justify-between"
                                              >
                                                <div className="flex items-center">
                                                  {getFileIcon(childFile.name, childFile.type)}
                                                  <span className="ml-2 truncate">{childFile.name}</span>
                                                </div>
                                                {childFile.type === 'folder' && (
                                                  isNestedExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                                                )}
                                              </button>
                                              
                                              {/* Third level nesting (if needed) */}
                                              {childFile.type === 'folder' && isNestedExpanded && childFile.children && (
                                                <motion.div
                                                  initial={{ opacity: 0, height: 0 }}
                                                  animate={{ opacity: 1, height: 'auto' }}
                                                  exit={{ opacity: 0, height: 0 }}
                                                  transition={{ duration: 0.2 }}
                                                  className="ml-4 mt-1"
                                                >
                                                  {childFile.children.map((grandchildFile) => (
                                                    <button
                                                      key={`${nestedFolderPath}-${grandchildFile.name}`}
                                                      onClick={() => handleFileClick(
                                                        grandchildFile, 
                                                        explorerItem.name, 
                                                        `${file.name}/${childFile.name}`
                                                      )}
                                                      className="w-full text-left px-3 py-1.5 rounded hover:bg-gray-700 text-gray-300 hover:text-white transition-colors flex items-center"
                                                    >
                                                      <div className="flex items-center">
                                                        {getFileIcon(grandchildFile.name, grandchildFile.type)}
                                                        <span className="ml-2 truncate">{grandchildFile.name}</span>
                                                      </div>
                                                    </button>
                                                  ))}
                                                </motion.div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </motion.div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
