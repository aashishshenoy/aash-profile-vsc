import { Code, File, Github, Image, Linkedin, User, BookOpen, FileText } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTabContext } from "../context/TabContext";
import { useData } from "./common/dataUtils";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addTab } = useTabContext();
  const { site, loading } = useData();
  const currentPath = location.pathname;
  
  const getIconComponent = (iconName: string | undefined) => {
    if (!iconName) return <User size={24} />;
    
    switch (iconName) {
      case "User":
        return <User size={24} />;
      case "Folder":
        return <File size={24} />;
      case "BookOpen":
        return <BookOpen size={24} />;
      case "Image":
        return <Image size={24} />;
      case "Code":
        return <Code size={24} />;
      case "FileText":
        return <FileText size={24} />;
      default:
        return <User size={24} />;
    }
  };
  
  // If data is still loading, show a loading state
  if (loading || !site) {
    return (
      <div className="w-16 bg-gray-900 h-screen flex flex-col py-4 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
    const sidebarItems = loading || !site ? [] : site.sidebar.map((item: typeof site.sidebar[0]) => ({
    id: item.id as string,
    label: item.label as string,
    path: item.path as string,
    component: item.component as string,
    icon: getIconComponent(item.icon as string)
  }));
  
  const handleItemClick = (item: typeof sidebarItems[0]) => {
    // Add a tab for this section
    addTab({
      id: item.id,
      title: item.label,
      path: item.path,
      component: item.component
    });
    
    // Navigate to the route
    navigate(item.path);
  };
  
  return (
    <div className="w-16 bg-gray-900 h-screen flex flex-col py-4 items-center">
      {sidebarItems.map((item: typeof sidebarItems[0]) => (
        <motion.button
          key={item.id}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleItemClick(item)}
          className={`p-3 mb-2 rounded-lg ${
            (currentPath === item.path) || (currentPath === "/" && item.id === "about")
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
          title={item.label}
        >
          {item.icon}
        </motion.button>
      ))}

      <div className="mt-auto">
        <motion.a
          href={site.links?.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          className="p-3 text-gray-400 hover:text-white block mb-2"
          title="GitHub"
        >
          <Github size={24} />
        </motion.a>
        <motion.a
          href={site.links?.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          className="p-3 text-gray-400 hover:text-white block mb-2"
          title="LinkedIn"
        >
          <Linkedin size={24} />
        </motion.a>
      </div>
    </div>
  );
};

export default Sidebar;
