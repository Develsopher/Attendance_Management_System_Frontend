import { useState } from 'react';
import { Outlet } from 'react-router-dom';

// project-import
import Header from './Header.jsx';
import Drawer from './Drawer.jsx';

function MainLayout() {
  const [isDrawOpen, setIsDrawOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawOpen((prev) => !prev);
  };
  return (
    <div>
      <Header onMenuClick={toggleDrawer} username="John Doe" />
      <Drawer isOpen={isDrawOpen} onClose={toggleDrawer} />
      <div className="p-2 sm:p-3">
        <div className="h-12"></div>
        <Outlet />
      </div>
    </div>

    
    

  );
}

export default MainLayout;
