import React from 'react'
import { Outlet } from 'react-router-dom'
import AppSidebar from '../../appSidebarComp/AppSidebar';
import { useState } from 'react';
export const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(true);
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
  return (
    <div>
         <div>
            <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div>
               <div className='content'> 
                  
               </div>
            </div>
         </div>
        <Outlet />
    </div>
  )
}
