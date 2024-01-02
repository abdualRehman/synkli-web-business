import { useState } from "react";
import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/appSidebarComp/appSidebar.css";
import MyThreads from "../../components/workplace-content/workplace-threads/MyThreads";
import MyNewThread from "../../components/workplace-content/workplace-threads/my-threads/MyNewThread";
import { useSelector } from "react-redux";
import { toastHandler } from "responseHanlder";
import { ERROR_TYPE_ERROR, PERMISSIONS_MESSAGE } from "utills/globalVars";

const Threads = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMyNewThread, setShowMyNewThread] = useState(false);

  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMyNewThread = () => {
    // if (allPermissions?.Threads?.write || !loginData.is_employee) {
    //   setShowMyNewThread(!showMyNewThread);
    // } else {
    //   return toastHandler(
    //     "You dont have permission to perform this action",
    //     ERROR_TYPE_ERROR
    //   );
    // }

    if (
      !loginData?.is_employee ||
      allPermissions?.Threads?.admin ||
      allPermissions?.Threads?.write
    ) {
      setShowMyNewThread(!showMyNewThread);
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  };

  return (
    <div className="app-dashboard">
      {showMyNewThread && <MyNewThread toggleMyNewThread={toggleMyNewThread} />}

      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        {allPermissions?.Threads?.read ||
        loginData.is_employee ||
        allPermissions?.Threads?.admin ? (
          <MyThreads toggleMyNewThread={toggleMyNewThread} />
        ) : (
          <div className="w-full h-72 flex justify-center items-center font-poppins">
            {PERMISSIONS_MESSAGE}
          </div>
        )}
      </div>
    </div>
  );
};

export default Threads;
