import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/appSidebarComp/appSidebar.css";
import { useState } from "react";
import { LeavePage } from "../../components/payrol-pages/leave-pages/LeavePage";
import { AnnualLeave } from "../../components/payrol-pages/leave-pages/AnnualLeave";
export const Leave = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showAnnualLeave, setShowAnnualLeave] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleAnnualLeave = () => {
    setShowAnnualLeave(!showAnnualLeave);
  };

  return (
    <div className="app-dashboard">
      {showAnnualLeave && <AnnualLeave toggleAnnualLeave={toggleAnnualLeave} />}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <LeavePage toggleAnnualLeave={toggleAnnualLeave} />
      </div>
    </div>
  );
};
