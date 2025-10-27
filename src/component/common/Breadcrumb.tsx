import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTabContext } from '../../context/TabContext';
import { BreadcrumbProps } from '../../types';

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPageTitle, customSegments, fileName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addTab } = useTabContext();
  
  // Determine the segments to display
  let segments: string[] = [];
  
  if (customSegments) {
    // Use custom segments if provided
    segments = customSegments;
  } else {
    // Otherwise use the URL path
    segments = location.pathname.split('/').filter(segment => segment);
    
    // Special case for code section with DSA problems
    if (segments[0] === 'code' && fileName && fileName.includes('/')) {
      // For DSA problems, add the category as a segment
      const parts = fileName.split('/');
      if (parts.length > 1) {
        segments = ['code', parts[0], parts[1]];
      }
    }
    
    // Special case for main section components
    if (segments.length === 0 && currentPageTitle && 
        ['About', 'Chronology', 'Skills'].includes(currentPageTitle)) {
      segments = ['main', currentPageTitle.toLowerCase()];
    }
  }
  
  // Map path segments to more readable names
  const pathNames: Record<string, string> = {
    'about': 'About',
    'projects': 'Projects',
    'blogs': 'Blogs',
    'gallery': 'Gallery',
    'skills': 'Skills',
    'contact': 'Contact',
    'code': 'Code',
    'chronology': 'Chronology',
    'general': 'Projects',
     'main': 'Main'
  };
  
  // Function to handle navigation
  const handleNavigation = (path: string, segment: string) => {
    // Navigate to the path
    navigate(path);
    
    // Add a tab for the path
    const componentName = `${segment.charAt(0).toUpperCase() + segment.slice(1)}Content`;
    addTab({
      id: `tab-${componentName}`,
      title: pathNames[segment] || segment,
      path: path,
      component: componentName
    });
  };

  return (
    <div className="flex items-center text-sm text-gray-400 mb-4 px-1">
      <button 
        onClick={() => handleNavigation('/', 'main')}
        className="flex items-center hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-0"
      >
        <Home size={14} className="mr-1" />
        <span>Home</span>
      </button>
      
      {segments.map((segment, index) => {
        // Build the path for this segment
        const path = index === 0 ? `/${segment}` : 
                    (segment === 'main' ? '/' : 
                    `/${segments.slice(0, index + 1).join('/')}`);
        
        const isLast = index === segments.length - 1;
        const displayName = pathNames[segment] || segment;
        
        return (
          <React.Fragment key={`${path}-${index}`}>
            <ChevronRight size={14} className="mx-1" />
            {isLast ? (
              <span className="text-blue-400 font-medium">
                {currentPageTitle || displayName}
              </span>
            ) : (
              <button 
                onClick={() => handleNavigation(path, segment)}
                className="hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-0"
              >
                {displayName}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
