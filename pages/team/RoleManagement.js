import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import { useState } from "react";
import "../../components/appSidebarComp/appSidebar.css";
import RoleContent from "../../components/team-components/role-management/RoleContent";
import AddRoleGroup from "../../components/team-components/role-management/role-sides/AddRoleGroup";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

import { useSelector } from "react-redux";
import { toastHandler } from "responseHanlder";
import { ERROR_TYPE_ERROR } from "utills/globalVars";
const RoleManagement = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showAddRoleGroup, setShowAddRoleGroup] = useState(false);
  const { data: loginData } = useSelector((state) => state.login);
  // const { allPermissions } = useSelector((state) => state.global);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  function toggleAddRoleGroup() {
    if (
      !loginData?.is_employee ||
      allPermissions?.Role_management?.admin ||
      allPermissions?.Role_management?.write
    ) {
      setShowAddRoleGroup(!showAddRoleGroup);
    } else {
      toastHandler(
        "You dont have permission to view this page",
        ERROR_TYPE_ERROR
      );
    }
  }
  return (
    <div className="app-dashboard">
      {!loginData?.is_employee ||
      allPermissions?.Role_management?.admin ||
      allPermissions?.Role_management?.read ||
      allPermissions?.Role_management?.write ? (
        <div>
          {showAddRoleGroup && (
            <AddRoleGroup toggleAddRoleGroup={toggleAddRoleGroup} />
          )}
          <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

          <div className={`content ${isOpen ? "squeeze" : ""}`}>
            <RoleContent
              toggleAddRoleGroup={toggleAddRoleGroup}
              showAddRoleGroup={showAddRoleGroup}
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-72 flex justify-center items-center font-poppins">
          You dont have permission to access this data
        </div>
      )}
    </div>
  );
};
export default RoleManagement;
