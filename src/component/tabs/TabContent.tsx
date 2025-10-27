import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTabContext } from '../../context/TabContext';
import contentMap from '../content/contentMap';
import UnderConstructionContent from '../common/UnderConstructionContent';

const TabContent: React.FC = () => {
  const { tabs, activeTabId } = useTabContext();
  const location = useLocation();
  
  if (!activeTabId) {
    // Get the current route and render the corresponding component
    const currentPath = location.pathname;
    const activeSection = currentPath === '/' ? 'main' : currentPath.substring(1);
    
    return (
      <div className="flex-1 overflow-auto bg-gray-900">
        {renderSectionComponent(activeSection)}
      </div>
    );
  }
  
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  if (!activeTab) return null;
  return (
    <div className="flex-1 overflow-auto bg-gray-900">
      {renderComponent(activeTab.component, activeTab.params)}
    </div>
  );
};

// Render the main section component based on the current route
const renderSectionComponent = (section: string) => {
  // Convert section name to component name format
  const componentName = section === 'main' ? 'MainContent' : `${section.charAt(0).toUpperCase() + section.slice(1)}Content`;
  
  // Get the component from the content map
  const Component = contentMap[componentName] || contentMap['MainContent'];
  return <Component />;
};

const renderComponent = (componentName: string, params?: Record<string, string>) => {
  // Check if the component exists in our content map
  if (contentMap[componentName]) {
    const Component = contentMap[componentName];
    return <Component {...(params || {})} />;
  }
  
  // Use UnderConstructionContent for components that don't exist
  const title = params?.fileName || componentName.replace('Content', '');
  return <UnderConstructionContent currentPageTitle={title} />;
}

export default TabContent;
