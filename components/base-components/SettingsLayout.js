import React from 'react'
import AppSidebar from 'components/appSidebarComp/AppSidebar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react';
export const SettingsLayout = () => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
      };
    
  return (
    <div className="app-dashboard-">
   
    {/* <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} /> */}

    <div className={`content- ${isOpen ? "squeeze" : ""}`}>
        <Outlet />
    </div>
  </div>
  )
}
