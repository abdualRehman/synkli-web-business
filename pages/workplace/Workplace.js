import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/appSidebarComp/appSidebar.css";
import { useState } from "react";
import WorkplaceContent from "../../components/workplace-content/WorkplaceContent";
import AddApp from "../../components/workplace-content/workplace-apps/workspace-side/AddApp";
import { useSelector } from "react-redux";
import { toastHandler } from "responseHanlder";
import { ImageViewer } from "global-components/ImageViewer";
import ModalImage from "react-modal-image";
import { ERROR_TYPE_ERROR, PERMISSIONS_MESSAGE } from "utills/globalVars";

const Workplace = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddApp, setShowAddApp] = useState(false);
  const [appsUpdated, setAppsUpdated] = useState(false);
  // const { data: loginData } = useSelector((state) => state.login);
  // const { allPermissions } = useSelector((state) => state.global);
  const [showPreviewImage, setShowPreviewImage] = useState(false);

  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const togglePreviewAddImg = () => {
    setShowPreviewImage(!showPreviewImage);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  function toggleShowAddApp() {
    if (
      !loginData?.is_employee ||
      allPermissions?.Apps?.admin ||
      allPermissions?.Apps?.write
    ) {
      setShowAddApp(!showAddApp);
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }

    // if (allPermissions?.Apps?.write || !loginData.is_employee) {

    // } else {
    //   toastHandler("You dont have permission to perform this action");
    // }
  }

  const toggleAppsUpdated = () => {
    setAppsUpdated(!appsUpdated);
  };
  return (
    <div className="app-dashboard">
      {/* {showPreviewImage && (
        <ImageViewer togglePreviewAddImg={togglePreviewAddImg} />
      )} */}
      {showAddApp && (
        <AddApp
          togglePreviewAddImg={togglePreviewAddImg}
          toggleShowAddApp={toggleShowAddApp}
          toggleAppsUpdated={toggleAppsUpdated}
        />
      )}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        {allPermissions?.Apps?.read || !loginData.is_employee ? (
          <WorkplaceContent
            toggleShowAddApp={toggleShowAddApp}
            appsUpdated={appsUpdated}
          />
        ) : (
          <div className="w-full h-72 flex justify-center items-center font-poppins">
            You dont have permission to access this data
          </div>
        )}
      </div>
    </div>
  );
};

export default Workplace;
