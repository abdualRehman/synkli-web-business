import "./css/profile.css";
import ProfileJumbotron from "./ProfileJumbotron";
import ProfileModals from "./ProfileModals";
import ProfileInfo from "./ProfileInfo";
import Business from "./Business";
import BusinessBar from "./BusinessBar";
import Bio from "./step-components/Bio";
import BusinessHours from "./step-components/BusinessHours";
import BusinessServices from "./step-components/BusinessServices";
import WorkSpacePhotos from "./step-components/WorkspacePhotos";
import BranchLocationStep from "./step-components/BranchLocationStep";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import {
  businessOwnerGetProfileThunk,
  getAllServicesThunk,
  getBranchLocationsThunk,
  getBusinessprofileThunk,
  login,
} from "store/auth/slices";

import "driver.js/dist/driver.css";
import ConfirmationModal from "utills/confirmationModal";
import {
  ACCESS_TOKEN,
  BUSINESS_ID,
  ERROR_TYPE_ERROR,
  PERMISSIONS_MESSAGE,
  REFRESH_TOKEN,
} from "utills/globalVars";
import { useNavigate } from "react-router-dom";
import { useLogout } from "Hooks/useLogout";
import { toastHandler } from "responseHanlder";
const ProfileContent = ({
  togglePassSide,
  toggleDeactivateAcc,
  toggleServiceSide,
  toggleBranchLocation,
  toggleBio,
  serviceUpdated,
  branchesUpdated,
  toggleUpdateBusiness,
  toggleEditBranch,
}) => {
  const { profileUpdating } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.global);
  const { data } = useSelector((state) => state.login);
  const business_id = localStorage.getItem("business_id");
  const [ownerData, setOwnerData] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [servicesData, setServicesData] = useState(null);
  const [branchLocations, setBranchLocations] = useState(null);

  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { logout } = useLogout();

  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const [condition, setCondition] = useState(1);

  function toggleModal() {
    if (
      !loginData?.is_employee ||
      allPermissions?.Profile?.admin ||
      allPermissions?.Profile?.write
    ) {
      setShowModal(!showModal);
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  }

  function handleCondition(condition) {
    setCondition(condition);
  }

  const fetchBusinessDef = () => {
    dispatch(getBusinessprofileThunk())
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setBusinessData(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        fetchServices();
      });
  };

  const fetchServices = () => {
    console.log(business_id);
    dispatch(getAllServicesThunk({ business_id }))
      .then((response) => {
        console.log(response.payload);
        if (response.data) {
          setServicesData(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        dispatch(setLoader(false));
        // fetchBranches()
      });
  };

  const fetchBranches = () => {
    dispatch(getBranchLocationsThunk({ user_id: data?.user_id }))
      .then((response) => {
        if (response.payload) {
          setBranchLocations(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  const handleGetOwnerProfile = () => {
    dispatch(businessOwnerGetProfileThunk())
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setOwnerData(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        fetchBusinessDef();
      });
  };
  useEffect(() => {
    dispatch(setLoader(true));
    setTimeout(() => {
      handleGetOwnerProfile();
    }, 500);
  }, [dispatch, profileUpdating, serviceUpdated]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    document?.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  function myComponent() {
    return (
      <div>
        <div>
          {" "}
          {condition === 1 && (
            <Bio
              businessData={businessData?.description}
              toggleBio={toggleBio}
            />
          )}{" "}
        </div>
        <div> {condition === 2 && <BusinessHours />} </div>
        <div>
          {" "}
          {condition === 3 ? (
            <BusinessServices
              toggleServiceSide={toggleServiceSide}
              servicesData={servicesData}
            />
          ) : (
            ""
          )}{" "}
        </div>
        <div> {condition === 4 && <WorkSpacePhotos />} </div>
        <div>
          {" "}
          {condition === 5 && (
            <BranchLocationStep
              toggleEditBranch={toggleEditBranch}
              toggleBranchLocation={toggleBranchLocation}
              branchesUpdated={branchesUpdated}
            />
          )}{" "}
        </div>
      </div>
    );
  }
  // const logout = () => {
  //   setIsConfirmationOpen(false);
  //   dispatch(setLoader(true));
  //   dispatch(login.actions.handleUpdate(null));
  //   localStorage.setItem(ACCESS_TOKEN, "");
  //   localStorage.setItem(REFRESH_TOKEN, "");
  //   localStorage.setItem(BUSINESS_ID, "");
  //   setTimeout(() => {
  //     dispatch(setLoader(false));
  //     navigate("/");
  //   }, 2000);
  // };
  const handleLogout = () => {
    setIsConfirmationOpen(true);
  };
  return (
    <div>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={() => logout(setIsConfirmationOpen)}
        description="Are you sure you want to logout!"
        confirmbtnTxt="Logout"
        cancelBtnTxt="Cancel"
        title="Logout Confirmation"
      />
      <ProfileJumbotron toggleModal={toggleModal} />
      <div>
        {showModal ? (
          <div ref={modalRef}>
            {" "}
            <ProfileModals
              logout={handleLogout}
              togglePassSide={togglePassSide}
              toggleDeactivateAcc={toggleDeactivateAcc}
            />{" "}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="manage-user-profile">
        {" "}
        <ProfileInfo
          ownerData={ownerData}
          handleGetOwnerProfile={handleGetOwnerProfile}
        />
      </div>

      <div className="manage-business-profile">
        <Business
          toggleUpdateBusiness={toggleUpdateBusiness}
          businessData={businessData}
        />
      </div>

      <div className="manage-business-info">
        <BusinessBar condition={condition} handleCondition={handleCondition} />
      </div>

      <div>{myComponent()}</div>
    </div>
  );
};

export default ProfileContent;
