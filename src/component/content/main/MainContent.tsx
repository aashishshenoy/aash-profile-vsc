import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../common/dataUtils';
import { MainSection } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { useTabContext } from '../../../context/TabContext';
import Breadcrumb from '../../common/Breadcrumb';

const MainContent: React.FC = () => {
  const { site, loading } = useData();
  const navigate = useNavigate();
  const { addTab } = useTabContext();
  
  // Function to handle internal navigation
  const handleInternalLink = (link: string) => {
    // Map content component names to routes
    const routeMap: Record<string, string> = {
      'AboutContent': '/about',
      'ProjectsContent': '/projects',
      'BlogContent': '/blogs',
      'GalleryContent': '/gallery',
      'SkillsContent': '/skills',
      'ContactContent': '/contact',
      'CodeContent': '/code',
      'ChronologyContent': '/chronology'
    };
    
    // Get the route from the map
    const route = routeMap[link];
    if (route) {
      // Navigate to the route
      navigate(route);
      
      // Add a tab for the route
      const tabId = `tab-${link}`;
      addTab({
        id: tabId,
        title: link.replace('Content', ''),
        path: route,
        component: link
      });
    } else {
      // If it's an external link, open it in a new tab
      if (link.startsWith('http')) {
        window.open(link, '_blank', 'noopener,noreferrer');
      }
    }
  };
  
  if (loading || !site || !site.main) {
    return (
      <div className="p-6 w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  const mainSections = site.main as MainSection[];
  const align = (section: MainSection) =>{
    return `text-2xl font-bold mb-4 text-${(section.align || 'left')}`;
  };
  
  return (
    <div className="p-6 w-full">
      <Breadcrumb currentPageTitle="Home" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg p-6 w-full"
      >
        {mainSections.map((section, sectionIndex) => {
          return (
            <div key={sectionIndex} className="mb-8 last:mb-0">

            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
              className= {align(section)}
            >
              {section.title}
            </motion.h2>
            
            <div className="space-y-4">
              {section.content.map((contentItem, contentIndex) => (
                <motion.div
                  key={contentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (sectionIndex * 0.1) + (contentIndex * 0.05) }}
                  className="text-gray-300"
                >
                  <p>
                    {contentItem.highlight && (
                      <>
                        {contentItem.link ? (
                          <button 
                            onClick={() => handleInternalLink(contentItem.link || '')}
                            className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer border border-blue-300 rounded px-1 py-0 hover:bg-blue-300 hover:text-gray-800"
                          >
                            {contentItem.highlight}
                          </button>
                        ) : (
                          <span className="text-lg font-semibold text-blue-400">
                            {contentItem.highlight}
                          </span>
                        )}
                        <span className="text-gray-400 mx-1">:</span>
                      </>
                    )}
                    <span>{contentItem.text}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )})}
      </motion.div>
    </div>
  );
};

export default MainContent;
