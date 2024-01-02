import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/appSidebarComp/appSidebar.css";
import { useState } from "react";
import TelephonicDirectoriesPage from "../../components/workplace-content/telephonic-directories/TelephonicDirectoriesPage";
import AddDirectory from "../../components/workplace-content/telephonic-directories/AddDirectory";
import { useSelector } from "react-redux";
import { toastHandler } from "responseHanlder";
import { TOAST_TYPE_ERROR } from "utills/globalVars";
const TelephonicDirectories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddDirectory, setShowAddDirectory] = useState(false);
  const [directoryUpdated, setDirectoryUpdated] = useState(false);
  const { allPermissions } = useSelector((state) => state.global);
  const { data: loginData } = useSelector((state) => state.login);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  function toggleAddDirectory() {
    if (
      allPermissions.Telephonic_directoreis?.write ||
      !loginData?.is_employee
    ) {
      setShowAddDirectory(!showAddDirectory);
    } else {
      toastHandler(
        "You dont have permission to access this page",
        TOAST_TYPE_ERROR
      );
    }
  }
  const toggleDirectory = () => {
    setDirectoryUpdated(!directoryUpdated);
  };

  return (
    <div className="app-dashboard">
      {showAddDirectory && (
        <AddDirectory
          toggleAddDirectory={toggleAddDirectory}
          toggleDirectory={toggleDirectory}
        />
      )}

      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      {allPermissions?.Telephonic_directoreis?.read ||
      !loginData.is_employee ? (
        <div className={`content ${isOpen ? "squeeze" : ""}`}>
          <TelephonicDirectoriesPage
            showAddDirectory={showAddDirectory}
            toggleAddDirectory={toggleAddDirectory}
            directoryUpdated={directoryUpdated}
          />
        </div>
      ) : (
        <div className="w-full h-72 flex justify-center items-center font-poppins">
          You dont have permission to access this data
        </div>
      )}
    </div>
  );
};

export default TelephonicDirectories;
