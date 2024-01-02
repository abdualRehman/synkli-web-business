import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import ProfileContent from "../../components/profile-content/ProfileContent";
import { useEffect, useState } from "react";
import ChangePasswordSide from "../../components/profile-content/profile-sides/ChangePasswordSide";
import DeactivateAccount from "../../components/profile-content/profile-sides/DeactivateAccount";
import AddBusinessSide from "../../components/profile-content/profile-sides/AddBusinessSide";
import AddBio from "../../components/profile-content/step-components/AddBio";
import AddServiceSide from "../../components/profile-content/profile-sides/AddServiceSide";
import AddBranchLocation from "../../components/profile-content/profile-sides/AddBranchLocation";

import { UpdateBusiness } from "components/profile-content/profile-sides/UpdateBusiness";

import { useDispatch, useSelector } from "react-redux";
import { editService } from "store/global/globalReducer";
import { updateBranch } from "components/profile-content/profile-sides/updateBranch";
import { EditBranch } from "components/profile-content/profile-sides/EditBranch";
import { PERMISSIONS_MESSAGE } from "utills/globalVars";

const Profile = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [showPassSide, setShowPassSide] = useState(false);
  const [showDeactivateAcc, setShowDeactivateAcc] = useState(false);
  const [showBusinessSide, setShowBusinessSide] = useState(false);
  const [showAddBio, setShowAddBio] = useState(false);
  const [serviceSide, setServiceSide] = useState(false);
  const [branchLocation, setBranchLocation] = useState(false);
  const [serviceUpdated, setServiceUpdated] = useState(false);

  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const [branchesUpdated, setBranchesUpdated] = useState(false);
  const [showEditBranch, setShowEditBranch] = useState(false);
  const [showUpdateBusiness, setShowUpdateBusiness] = useState(false);

  const toggleEditBranch = () => {
    setShowEditBranch(!showEditBranch);
  };
  const toggleUpdateBusiness = () => {
    setShowUpdateBusiness(!showUpdateBusiness);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const togglePassSide = () => {
    setShowPassSide(!showPassSide);
  };
  function toggleDeactivateAcc() {
    console.log("toggle ac");
    setShowDeactivateAcc(!showDeactivateAcc);
  }

  function toggleBusinessSide() {
    setShowBusinessSide(!showBusinessSide);
  }

  function toggleBio() {
    setShowAddBio(!showAddBio);
  }

  function toggleServiceSide() {
    setServiceSide(!serviceSide);
  }

  function toggleBranchLocation() {
    setBranchLocation(!branchLocation);
  }

  const toggleServiceUpdated = () => {
    setServiceUpdated(!serviceUpdated);
  };

  const togglebranchesUpdated = () => {
    console.log("updated", "1212");
    setBranchesUpdated(!branchesUpdated);
  };
  useEffect(() => {
    dispatch(editService(""));
  }, []);

  return (
    <div className="dashboard">
      {showEditBranch && <EditBranch toggleEditBranch={toggleEditBranch} />}
      {showUpdateBusiness && (
        <UpdateBusiness toggleUpdateBusiness={toggleUpdateBusiness} />
      )}
      {showPassSide ? (
        <ChangePasswordSide togglePassSide={togglePassSide} />
      ) : (
        ""
      )}

      {showDeactivateAcc ? (
        <DeactivateAccount toggleDeactivateAcc={toggleDeactivateAcc} />
      ) : (
        ""
      )}

      {showBusinessSide ? (
        <AddBusinessSide toggleBusinessSide={toggleBusinessSide} />
      ) : (
        ""
      )}

      {showAddBio ? <AddBio toggleBio={toggleBio} /> : ""}

      {serviceSide ? (
        <AddServiceSide
          toggleServiceSide={toggleServiceSide}
          toggleServiceUpdated={toggleServiceUpdated}
        />
      ) : (
        ""
      )}

      {branchLocation ? (
        <AddBranchLocation
          togglebranchesUpdated={togglebranchesUpdated}
          toggleBranchLocation={toggleBranchLocation}
          toggleServiceUpdated={toggleServiceUpdated}
        />
      ) : (
        ""
      )}

      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        {allPermissions?.Profile?.read ||
        allPermissions?.Profile?.write ||
        allPermissions?.Profile?.admin ||
        !loginData?.is_employee ? (
          <div>
            <ProfileContent
              toggleEditBranch={toggleEditBranch}
              toggleUpdateBusiness={toggleUpdateBusiness}
              toggleBio={toggleBio}
              togglePassSide={togglePassSide}
              toggleDeactivateAcc={toggleDeactivateAcc}
              toggleBusinessSide={toggleBusinessSide}
              toggleServiceSide={toggleServiceSide}
              toggleBranchLocation={toggleBranchLocation}
              serviceUpdated={serviceUpdated}
              branchesUpdated={branchesUpdated}
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

export default Profile;
//loyibes370@watrf.com
