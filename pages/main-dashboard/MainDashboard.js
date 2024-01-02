import AppSidebar from 'components/appSidebarComp/AppSidebar';
import { MainDashboardPage } from 'components/mainDashboard/MainDashboardPage';
import React from 'react'
import { useState } from 'react';

export const MainDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-dashboard">
    <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

    <div className={`content ${isOpen ? "squeeze" : ""}`}>
       <MainDashboardPage />
    </div>
  </div>
  )
}
