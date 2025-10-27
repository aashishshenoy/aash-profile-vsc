import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, FileCode, FileImage, FileText, FileType, Folder, FolderOpen, Map, Maximize, Minimize } from "lucide-react";
import { motion } from "framer-motion";
import { ExplorerProps, FileItem, ExplorerItem } from "../types";
import { useTabContext } from "../context/TabContext";
import { useData } from "./common/dataUtils";
import siteData from "../data/json/site-data.json";

const Explorer: React.FC<ExplorerProps> = ({ activeTab }) => {
  const { addTab } = useTabContext();
  const { site, loading } = useData();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const explorerData = siteData?.explorer as ExplorerItem[];

  const convertExplorerData = (explorerData: ExplorerItem[]): FileItem[] => {
    return explorerData.map(item => ({
      name: item.name,
      type: item.type as "file" | "folder",
      isOpen: item.isOpen || false,
      children: item.children ? convertExplorerData(item.children) : undefined
    }));
  };

  const getFileStructure = (activeTab: string): FileItem[] => {
    if (["main", "projects", "blogs", "gallery", "code"].includes(activeTab)) {
      return convertExplorerData(explorerData).filter((item: ExplorerItem) => 
        item.name.toLowerCase() === activeTab);
    }
    else {
      return convertExplorerData(explorerData).filter((item: ExplorerItem) => 
        item.name.toLowerCase() === "main");
    }
  };

  const [files, setFiles] = useState<FileItem[]>(getFileStructure(activeTab));
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  useEffect(() => {
    setFiles(getFileStructure(activeTab));
    setSelectedFile(null);
  }, [activeTab]);

  // Function to get the appropriate icon based on file extension
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'md':
        return <FileType size={16} className="text-blue-300" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
        return <FileImage size={16} className="text-green-400" />;
      case 'tsx':
      case 'jsx':
      case 'ts':
      case 'js':
        return <FileCode size={16} className="text-blue-400" />;
      default:
        return <FileText size={16} className="text-blue-400" />;
    }
  };

  // Toggle folder open/closed
  const toggleFolder = (targetItem: FileItem) => {
    const updateFiles = (items: FileItem[]): FileItem[] => {
      return items.map((item) => {
        if (item === targetItem) {
          return { ...item, isOpen: !item.isOpen };
        }
        if (item.children) {
          return {
            ...item,
            children: updateFiles(item.children),
          };
        }
        return item;
      });
    };
    setFiles(updateFiles(files));
  };

  // Handle file selection and tab creation
  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
    
    // Only add tabs for files, not folders
    if (file.type === 'file' && !loading && site) {
      // Create a unique ID for this file
      const fileId = `${activeTab}-${file.name}`;
      
      // Get file extension
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      
      // Find the section data and parent folder path from site.explorer
      const findItemPathInExplorer = () => {
        // Find the section in the explorer data
        const sectionData = site.explorer?.find((s) => 
          s.name.toLowerCase() === activeTab.toLowerCase() || 
          (s.name.toLowerCase() === 'main' && activeTab.toLowerCase() === 'about')
        );
        if (!sectionData) return { parentFolder: '', componentName: null };
        
        // Find the file and its parent folder in the section's children
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const findInChildren = (children: any[], currentPath = ''): { parentFolder: string, componentName: string | null } => {
          for (const child of children) {
            if (child.type === 'file' && child.name === file.name) {
              // Found the file - return its parent folder path and content if available
              return { 
                parentFolder: currentPath, 
                componentName: child.content || null 
              };
            } else if (child.type === 'folder' && child.children) {
              // Search in this folder's children
              const newPath = currentPath ? `${currentPath}/${child.name}` : child.name;
              const result = findInChildren(child.children, newPath);
              if (result.parentFolder || result.componentName) {
                return result;
              }
            }
          }
          return { parentFolder: '', componentName: null };
        };
        
        return sectionData.children ? 
          findInChildren(sectionData.children) : 
          { parentFolder: '', componentName: null };
      };
      
      // Get the file's path and component name from site data
      const { parentFolder, componentName: contentFromSiteData } = findItemPathInExplorer();
      
      // Variables for component determination
      let componentName;
      let params = {};
      
      // Determine the component name based on the file extension and site data
      if (extension === 'md') {
        // For markdown files, use UnifiedMarkdown component
        componentName = 'UnifiedMarkdown';
        
        // Determine source type based on section
        const sourceType = activeTab === 'code' ? 'dsa' : 
                         activeTab === 'blogs' ? 'blog' : 
                         activeTab === 'projects' ? 'project' : 
                         activeTab === 'gallery' ? 'gallery' : 'general';
        
        // Get category from parent folder
        const category = parentFolder || 'General';
        
        // Set params for UnifiedMarkdown
        params = {
          sourceType,
          category,
          fileName: file.name
        };
      } 
      else if (['tsx', 'jsx', 'ts', 'js'].includes(extension)) {
        // For code files, first check if there's a component name in site data
        if (contentFromSiteData) {
          componentName = contentFromSiteData;
        } else {
          // Otherwise use the filename + Content convention
          const baseName = file.name.split('.')[0];
          componentName = `${baseName}Content`;
        }
      }
      else if (extension === 'html') {
        // For HTML files, just use the file path
        componentName = file.name;
      }
      else {
        // For other files, use the component name from site data if available
        if (contentFromSiteData) {
          componentName = contentFromSiteData;
        } else {
          // Otherwise use the filename + Content convention
          const baseName = file.name.split('.')[0];
          componentName = `${baseName}Content`;
        }
      }
      
      // Add the tab with the determined component and params
      addTab({
        id: fileId,
        title: file.name,
        path: `/${activeTab}/${parentFolder ? parentFolder + '/' : ''}${file.name}`,
        component: componentName,
        params
      });
    }
  };

  const toggleExpandAll = () => {
    const newExpandState = !expandAll;
    setExpandAll(newExpandState);
    
    // Apply expand/collapse to all folders
    const updateAllFolders = (items: FileItem[]): FileItem[] => {
      return items.map((item) => {
        if (item.type === "folder") {
          return {
            ...item,
            isOpen: newExpandState,
            children: item.children ? updateAllFolders(item.children) : []
          };
        }
        return item;
      });
    };
    
    setFiles(updateAllFolders(files));
  };

  // Recursive component to render file tree
  const renderFileTree = (item: FileItem, level: number) => {
    const isSelected = selectedFile?.name === item.name;

    return (
      <div key={item.name}>
        <motion.div
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
          style={{ paddingLeft: `${level * 1.5}rem` }}
          onClick={() =>
            item.type === "folder" ? toggleFolder(item) : handleFileSelect(item)
          }
          className={`flex items-center py-1 px-2 cursor-pointer hover:bg-gray-700 ${
            isSelected ? "bg-gray-700" : ""
          }`}
        >
          {item.type === "folder" && (
            <span className="mr-1">
              {item.isOpen ? (
                <ChevronDown size={16} className="text-gray-400" />
              ) : (
                <ChevronRight size={16} className="text-gray-400" />
              )}
            </span>
          )}
          {item.type === "folder" ? (
            item.isOpen ? <FolderOpen size={16} className="text-yellow-400" /> : <Folder size={16} className="text-yellow-400" />
          ) : (
            getFileIcon(item.name)
          )}
          <span className="ml-2 text-sm text-gray-300">{item.name}</span>
        </motion.div>

        {item.type === "folder" && item.isOpen && item.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.children.map((child) => renderFileTree(child, level + 1))}
          </motion.div>
        )}
      </div>
    );
  };
  
  return (
    <motion.div 
      className={`bg-gray-800 h-screen ${isCollapsed ? 'w-10' : 'w-64'} transition-all duration-300 flex flex-col`}
      animate={{ width: isCollapsed ? 40 : 256 }}
    >
      <div className="flex items-center justify-between p-2 border-b border-gray-700">
        <div className="flex items-center">
          <Map size={18} className="text-gray-400 mr-2" />
          {!isCollapsed && <span className="text-sm uppercase tracking-wide text-gray-400">Explorer</span>}
        </div>
        <div className="flex items-center">
          {!isCollapsed && (
            <>
              <motion.button
                className="p-1 text-gray-400 hover:text-white focus:outline-none"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleExpandAll}
                title={expandAll ? "Collapse All" : "Expand All"}
              >
                {expandAll ? <Minimize size={16} /> : <Maximize size={16} />}
              </motion.button>
            </>
          )}
          <motion.button
            className="p-1 text-gray-400 hover:text-white focus:outline-none"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand Explorer" : "Collapse Explorer"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </motion.button>
        </div>
      </div>
      {!isCollapsed && (
        <div className="overflow-y-auto flex-1 p-2">
          <div className="space-y-1">
            {files.map((file) => renderFileTree(file, 0))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Explorer;
