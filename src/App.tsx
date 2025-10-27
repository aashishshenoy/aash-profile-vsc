import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Explorer from "./component/Explorer";
import Sidebar from "./component/Sidebar";
import { TabProvider } from "./context/TabContext";
import DataProvider from "./context/DataContext";
import TabBar from "./component/tabs/TabBar";
import TabContent from "./component/tabs/TabContent";
import MobileMenu from "./component/mobile/MobileMenu";
import { useEffect, useState } from "react";

const AppContent = () => {
  const location = useLocation();
  const activeTab = location.pathname === "/" ? "about" : location.pathname.substring(1);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint in Tailwind
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  return (
    <div className="flex bg-gray-900 h-screen text-white">
      {/* Mobile Menu */}
      {isMobile && <MobileMenu />}
      
      {/* Desktop Sidebar and Explorer */}
      <div className={`${isMobile ? 'hidden' : 'flex'} md:flex`}>
        <Sidebar />
      </div>
      <div className={`${isMobile ? 'hidden' : 'flex'} md:flex`}>
        <Explorer activeTab={activeTab} />
      </div>
      
      {/* Content Area - Always visible */}
      <div className={`flex flex-col flex-1 overflow-hidden ${isMobile ? 'pt-12' : ''}`}>
        <TabBar />
        <TabContent />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <DataProvider>
          <TabProvider>
            <Routes>
              <Route path="/projects" element={<AppContent />} />
              <Route path="/skills" element={<AppContent />} />
              <Route path="/blogs" element={<AppContent />} />
              <Route path="/gallery" element={<AppContent />} />
              <Route path="/contact" element={<AppContent />} />
              <Route path="/code" element={<AppContent />} />
              <Route path="/" element={<AppContent />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </TabProvider>
      </DataProvider>
    </Router>
  );
}

export default App;
