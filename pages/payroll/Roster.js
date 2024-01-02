import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/appSidebarComp/appSidebar.css";
import { useState } from "react";
import { RosterPage } from "../../components/payrol-pages/roster-pages/RosterPage";
import { AddRoster } from "../../components/payrol-pages/roster-pages/AddRoster";
export const Roster = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showAddRoster, setShowAddRoster] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const toggleAddRoster = () => {
    setShowAddRoster(!showAddRoster);
  };

  return (
    <div className="app-dashboard">
      {showAddRoster && <AddRoster toggleAddRoster={toggleAddRoster} />}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <RosterPage toggleAddRoster={toggleAddRoster} />
      </div>
    </div>
  );
};
