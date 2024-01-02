import React, { useState } from "react";
import AppSidebar from "components/appSidebarComp/AppSidebar";
import { AnnDetails } from "components/workplace-content/announcement-content/AnnDetails";
import { EditAnnoncement } from "components/workplace-content/announcement-content/EditAnnoncement";
export const AnnouncementDetails = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showEditAnn, setShowEditAnn] = useState(false);
  const [annUpdated, setAnnUpdated] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleEditAnn = () => {
    setShowEditAnn(!showEditAnn);
  };

  const toggleAnnUpdate = () => {
    setAnnUpdated(!annUpdated);
  };
  return (
    <div className="app-dashboard">
      {showEditAnn && (
        <EditAnnoncement
          toggleEditAnn={toggleEditAnn}
          toggleAnnUpdate={toggleAnnUpdate}
        />
      )}

      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <AnnDetails toggleEditAnn={toggleEditAnn} annUpdated={annUpdated} />
      </div>
    </div>
  );
};
