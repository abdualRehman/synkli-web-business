import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/appSidebarComp/appSidebar.css";
import { useState } from "react";
import AnnouncementContent from "../../components/workplace-content/announcement-content/AnnouncementContent";
import AnnouncementDetails from "../../components/workplace-content/announcement-content/AnnouncementDetails";
import AddAnnouncement from "../../components/workplace-content/announcement-content/AddAnnouncement";
import { useSelector } from "react-redux";
import { toastHandler } from "responseHanlder";
import { ERROR_TYPE_ERROR, PERMISSIONS_MESSAGE } from "utills/globalVars";
import { ImageViewer } from "global-components/ImageViewer";

const Announcement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnnDetails, setShowAnnDetails] = useState(false);
  const [showAddAnn, setShowAddAnn] = useState(false);
  const [ann, setAnn] = useState(null);
  const [annUpdated, setAnnUpdated] = useState(false);
  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const [showImageViewer, setShowImgViewer] = useState(false);
  const toggleImgViwer = () => {
    setShowImgViewer(!showImageViewer);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleAnnDetails = () => {
    setShowAnnDetails(!showAnnDetails);
  };

  const handleAnn = (ann) => {
    setAnn(ann);
  };

  function toggleAddAnn() {
    if (
      allPermissions?.Announcements?.write ||
      !loginData?.is_employee ||
      allPermissions?.Announcements?.admin
    ) {
      setShowAddAnn(!showAddAnn);
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  }
  const toggleAnnUpdate = () => {
    if (
      allPermissions?.Announcements?.write ||
      !loginData?.is_employee ||
      allPermissions?.Announcements?.admin
    ) {
      setAnnUpdated(!annUpdated);
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  };
  return (
    <div className="app-dashboard">
      {/* {showImageViewer && <ImageViewer />} */}
      {showAnnDetails && (
        <AnnouncementDetails toggleAnnDetails={toggleAnnDetails} ann={ann} />
      )}
      {showAddAnn && (
        <AddAnnouncement
          toggleAddAnn={toggleAddAnn}
          toggleAnnUpdate={toggleAnnUpdate}
        />
      )}

      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        {allPermissions?.Announcements?.read ||
        !loginData.is_employee ||
        allPermissions?.Announcements?.admin ||
        allPermissions?.Announcements?.write ? (
          <div>
            <AnnouncementContent
              toggleAnnDetails={toggleAnnDetails}
              handleAnn={handleAnn}
              toggleAddAnn={toggleAddAnn}
              annUpdated={annUpdated}
            />
          </div>
        ) : (
          <div className="w-full h-72 flex justify-center items-center font-poppins">
            {PERMISSIONS_MESSAGE}
          </div>
        )}
      </div>
    </div>
  );
};
export default Announcement;
