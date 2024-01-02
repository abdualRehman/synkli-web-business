import AppSidebar from "../../appSidebarComp/AppSidebar";
import "../../appSidebarComp/appSidebar.css";
import "./css/onboarding.css";
import { useState, useRef, useEffect } from "react";
import AddProfile from "./add-profile/AddProfile";
import AddProfileSide from "./add-profile/AddProfileSide";
import AddBusiness from "./add-business/AddBusiness";
import AddBusinessSide from "./add-business/AddBusinessSide";
import AddService from "./add-service/AddService";
import AddServiceSide from "./add-service/AddServiceSide";
import AddBranchLocation from "./add-branch/AddBranchLocation";
import AddBranchSide from "./add-branch/AddBranchSide";
import StripeSide from "./stripe-side/StripeSide";
import logoutIcon from "../../../files/powerOff.png.png";
import { BlueTick } from "../../../utills/svgs/BlueTick";
import { IncompleteCircle } from "../../../utills/svgs/IncompleteCircle";
import { LightBulb } from "../../../utills/svgs/LightBulb";
import { useDispatch, useSelector } from "react-redux";
import { SmallLoader } from "components/common/SmallLoader";
import { setSideLoader } from "store/global/globalReducer";
import { login, viewOnBoardingDetailsThunk } from "store/auth/slices";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, BUSINESS_ID, REFRESH_TOKEN } from "utills/globalVars";
import logo from "../../../files/whiteBgLogo.png.png";
import Cookies from "js-cookie";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { UserIcon } from "utills/svgs/UserIcon";
import { ProfileModal } from "./modals/ProfileModal";
import { BusinessModal } from "./modals/BusinessModal";
import { ServicesModal } from "./modals/ServicesModal";
import { BranchesModal } from "./modals/BranchesModal";
import ConfirmationModal from "utills/confirmationModal";
import { useLogout } from "Hooks/useLogout";

const OnboardingPage = () => {
  const { data: profileData } = useSelector(
    (state) => state.businessOwnerGetProfile
  );

  const { data: businessData } = useSelector(
    (state) => state.getBusinessprofile
  );
  const [showIndicators, setShowIndicators] = useState(false);
  const { data: services } = useSelector((state) => state.getAllServices);
  const { data: branches } = useSelector((state) => state.getBranchLocations);
  const { data: loginData } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { sideLoader } = useSelector((state) => state.global);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleIndicators = () => {
    setShowIndicators(!showIndicators);
  };
  //profile modal

  const [showProfileModal, setShowProfileModal] = useState(false);
  const handleShowProfileModal = () => {
    setShowProfileModal(true);
  };

  const handleHideProfileModal = () => {
    setShowProfileModal(false);
  };

  //business modal
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const handleShowBusinessModal = () => {
    setShowBusinessModal(true);
  };

  const handleHideBusinessModal = () => {
    setShowBusinessModal(false);
  };

  //services modal
  const [showServicesModal, setShowServicesModal] = useState(false);
  const handleShowServicesModal = () => {
    setShowServicesModal(true);
  };

  const handleHideServicesModal = () => {
    setShowServicesModal(false);
  };

  //branches modal

  //services modal
  const [showBranchesModal, setShowbranchesModal] = useState(false);
  const handleShowBranchesModal = () => {
    setShowbranchesModal(true);
  };

  const handleHideBranchesModal = () => {
    setShowbranchesModal(false);
  };

  const [condition, setCondition] = useState(1);

  const [showAddProfile, setShowAddProfile] = useState(false);
  const [showAddBusinessSide, setShowAddBusinessSide] = useState(false);
  const [showAddServiceSide, setShowAddServiceSide] = useState(false);
  const [showBranchSide, setShowBranchSide] = useState(false);

  const [profileCompleted, setProfileCompleted] = useState(false);
  const [businessCompleted, setBusinessCompleted] = useState(false);
  const [branchCompleted, setBranchCompleted] = useState(false);
  const [serviceCompleted, setServiceCompleted] = useState(false);
  const [stripeCompleted, setStripeCompleted] = useState(true);
  //stripe

  const [isUpdatedBranch, setIsUpdatedBranch] = useState(false);
  const [isServiceUpdated, setIsServiceUpdated] = useState(false);
  const [isBusinessUpdated, setIsBusinessUpdated] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { logout } = useLogout();
  const [showStripeSide, setShowStripeSide] = useState(false);

  const borderRef = useRef(null);

  const handleCondition = (conditon) => {
    setCondition(condition);
  };

  //add profile
  function toggleAddProfile() {
    setCondition(1);
  }

  function toggleAddProfileSide() {
    setShowAddProfile(!showAddProfile);
    showAddProfile && setProfileUpdated(!profileUpdated);
  }

  function showAddBusiness() {
    setCondition(2);

    console.log(condition);
  }

  function showAddService() {
    setCondition(3);
  }

  function showAddBranchLocation() {
    setCondition(4);
  }

  function toggleBusinessSide() {
    setShowAddBusinessSide(!showAddBusinessSide);
    showAddBusinessSide && setIsBusinessUpdated(!isBusinessUpdated);
  }

  function toggleServiceSide() {
    setShowAddServiceSide(!showAddServiceSide);
    showAddServiceSide && setIsServiceUpdated(!isServiceUpdated);
  }

  function toggleBranchSide() {
    setShowBranchSide(!showBranchSide);

    showBranchSide && setIsUpdatedBranch(!isUpdatedBranch);
  }

  function toggleStripeSide() {
    setShowStripeSide(!showStripeSide);
  }

  function myComponent() {
    return (
      <div>
        {condition === 1 && (
          <AddProfile
            handleCondition={handleCondition}
            profileUpdated={profileUpdated}
            toggleAddProfileSide={toggleAddProfileSide}
          />
        )}
        {condition === 2 && (
          <AddBusiness
            toggleBusinessSide={toggleBusinessSide}
            handleCondition={handleCondition}
            isBusinessUpdated={isBusinessUpdated}
          />
        )}
        {condition === 3 && (
          <AddService
            toggleServiceSide={toggleServiceSide}
            isServiceUpdated={isServiceUpdated}
          />
        )}
        {condition === 4 && (
          <AddBranchLocation
            toggleBranchSide={toggleBranchSide}
            isUpdated={isUpdatedBranch}
          />
        )}
      </div>
    );
  }

  useEffect(() => {
    dispatch(setSideLoader(true));
    setTimeout(() => {
      dispatch(viewOnBoardingDetailsThunk())
        .then((response) => {
          console.log(response.payload);
          if (response.payload) {
            const payload = response.payload;
            if (
              payload.user &&
              payload.business &&
              payload.branch &&
              payload.service
            ) {
              localStorage.setItem("onboarding", true);
            } else {
              localStorage.setItem("onboarding", false);
            }
            if (response.payload?.user) {
              setProfileCompleted(true);
            } else {
              setProfileCompleted(false);
            }

            if (response.payload.business) {
              setBusinessCompleted(true);
            } else {
              setBusinessCompleted(false);
            }

            if (response.payload.branch) {
              setBranchCompleted(true);
            } else {
              setBranchCompleted(false);
            }

            if (response.payload.service) {
              setServiceCompleted(true);
            } else {
              setServiceCompleted(false);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          dispatch(setSideLoader(false));
        });
    }, 2000);
  }, [
    dispatch,
    isBusinessUpdated,
    profileUpdated,
    isUpdatedBranch,
    isServiceUpdated,
  ]);

  const handleLogout = () => {
    setIsConfirmationOpen(true);
  };
  useEffect(() => {
    if (!loginData?.second_time_login || showIndicators) {
      const driverObj = driver({
        showProgress: true,
        steps: [
          {
            element: ".add-profile-indcate",

            popover: {
              title: "Complete Profile",
              description:
                "In this section you need to complete your user profile.Please note that all fields are required",
              popoverClass: "my-custom-popover-class text-red-900",
            },
          },
          {
            element: ".add-business-indicate",
            popover: {
              title: "Complete Business Profile",
              description:
                "In this section you need to complete your business profile.Please note that all fields are required",
            },
          },
          {
            element: ".service-indicate ",
            popover: {
              title: "Add Service",
              description:
                "In this section you can add business services. Please Note that atleast one service is required to proceed further",
            },
          },
          {
            element: ".branch-indicate ",
            popover: {
              title: "Add Branches",
              description:
                "In this section you can add business branches. Please Note that atleast one branch is required to proceed further",
            },
          },
        ],
      });

      driverObj.drive();
    }
  }, [showIndicators]); // Empty dependency array to run the effect only once

  return (
    <div className="app-dashboard p-3">
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={() => logout(setIsConfirmationOpen)}
        description="Are you sure you want to logout!"
        confirmbtnTxt="Logout"
        cancelBtnTxt="Cancel"
        title="Logout Confirmation"
      />
      <div className="absolute right-5 top-5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 logout-button p-2 rounded-md"
        >
          <div>Logout</div>
          <div>
            <img src={logoutIcon} className="logout-icon" />{" "}
          </div>
        </button>
      </div>
      <div>
        {showAddProfile === true ? (
          <AddProfileSide toggleAddProfile={toggleAddProfileSide} />
        ) : (
          ""
        )}
        {showAddBusinessSide === true ? (
          <AddBusinessSide toggleBusinessSide={toggleBusinessSide} />
        ) : (
          ""
        )}

        {showAddServiceSide === true ? (
          <AddServiceSide toggleServiceSide={toggleServiceSide} />
        ) : (
          ""
        )}

        {showBranchSide === true ? (
          <AddBranchSide
            toggleBranchSide={toggleBranchSide}
            updateBranch={setIsUpdatedBranch}
          />
        ) : (
          ""
        )}

        {showStripeSide === true ? (
          <StripeSide toggleStripeSide={toggleStripeSide} />
        ) : (
          ""
        )}

        <div>
          {/* <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} /> */}

          <div className={`content ${isOpen ? "squeeze" : ""}`}>
            <div className="onboarding-container">
              <div className="one"></div>
              <div className="two shadow">
                <div className=" px-5 pt-6 onboarding-card-title">
                  <div className="flex items-center gap-2">
                    Welcome to{" "}
                    <div className="logo-div flex items-center mt-2">
                      <img src={logo} alt="logo" className="close-logo" />
                    </div>
                  </div>
                </div>

                <div className="one-text px-5 pt-3">
                  <p>
                    Your account has been successfully created. Here are a few
                    things you can do right now to get started.
                  </p>
                </div>

                <div
                  onClick={toggleIndicators}
                  className="bulb cursor-pointer grid grid-cols-10 py-3 text-white mt-3 col-span-2"
                >
                  <div className="flex justify-center items-center">
                    <div className="svg-wrapper-div ml-5">
                      <LightBulb />
                    </div>
                  </div>
                  <div className="col-span-8 pl-5 pt-1">
                    Quick start guide for SYNKLI
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="icon-wrapper scale-75">
                      <svg
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.433859 2.66497C-0.486076 1.68906 0.154012 0 1.44378 0C1.82265 0 2.18628 0.161092 2.45593 0.448399L7.57503 5.90261C8.14166 6.50634 8.14166 7.49366 7.57503 8.09739L2.45593 13.5516C2.18628 13.8389 1.82265 14 1.44378 14C0.154012 14 -0.486078 12.3109 0.433856 11.335L4.52022 7L0.433859 2.66497Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="add-steps px-2 mt-5">
                  <div
                    onMouseEnter={handleShowProfileModal}
                    onMouseLeave={handleHideProfileModal}
                    onClick={toggleAddProfile}
                    className={`onboard-step shadow-md relative py-2 px-3 add-profile-indcate rounded-md grid grid-cols-12 ${
                      profileCompleted ? "add-blue" : "add-white text-black"
                    }`}
                  >
                    {showProfileModal && (
                      <ProfileModal
                        profileData={profileData}
                        toggleAddProfileSide={toggleAddProfileSide}
                      />
                    )}
                    <div className="col-span-11">
                      <div className="onboarding-strip-title">
                        Add User Profile
                      </div>
                      <div>
                        <p className="light-o">
                          Lorem ipsum dolor sit amet consectetur. Sed ut nisl
                          odio eleifend.
                        </p>
                      </div>
                    </div>

                    <div className="col-span-1 flex justify-center items-center">
                      <div>
                        {" "}
                        {profileCompleted ? (
                          <BlueTick />
                        ) : (
                          <IncompleteCircle />
                        )}{" "}
                      </div>
                    </div>
                  </div>

                  <div
                    onMouseEnter={handleShowBusinessModal}
                    onMouseLeave={handleHideBusinessModal}
                    ref={borderRef}
                    onClick={showAddBusiness}
                    className={`onboard-step mt-4 relative shadow-md py-2 px-3 add-business-indicate rounded-md grid grid-cols-12 ${
                      businessCompleted ? "add-blue" : "add-white text-black"
                    }`}
                  >
                    <div className="col-span-11">
                      {showBusinessModal && (
                        <BusinessModal
                          businessData={businessData}
                          toggleBusinessSide={toggleBusinessSide}
                        />
                      )}
                      <div className="onboarding-strip-title">Add Business</div>
                      <div>
                        <p className="light-o">
                          Lorem ipsum dolor sit amet consectetur. Sed ut nisl
                          odio eleifend.
                        </p>
                      </div>
                    </div>

                    <div className="col-span-1 flex justify-center items-center">
                      <div>
                        {" "}
                        {businessCompleted ? (
                          <BlueTick />
                        ) : (
                          <IncompleteCircle />
                        )}{" "}
                      </div>
                      {/* {sideLoader && !businessCompleted && isBusinessUpdated ? (
                        <span className=" mb-2">
                          <SmallLoader />
                        </span>
                      ) : (
                        <div>
                          {" "}
                          {businessCompleted ? (
                            <BlueTick />
                          ) : (
                            <IncompleteCircle />
                          )}{" "}
                        </div>
                      )} */}
                    </div>
                  </div>

                  <div
                    onMouseEnter={handleShowServicesModal}
                    onMouseLeave={handleHideServicesModal}
                    ref={borderRef}
                    onClick={showAddService}
                    className={`onboard-step  relative mt-4 service-indicate shadow-md py-2 px-3 rounded-md grid grid-cols-12 ${
                      serviceCompleted ? "add-blue" : "add-white text-black"
                    }`}
                  >
                    <div className="col-span-11">
                      {showServicesModal && (
                        <ServicesModal
                          services={services}
                          toggleServiceSide={toggleServiceSide}
                        />
                      )}
                      <div className="onboarding-strip-title">Add Services</div>
                      <div>
                        <p className="light-o">
                          Lorem ipsum dolor sit amet consectetur. Sed ut nisl
                          odio eleifend.
                        </p>
                      </div>
                    </div>

                    <div className="col-span-1 flex justify-center items-center">
                      <div>
                        {" "}
                        {serviceCompleted ? (
                          <BlueTick />
                        ) : (
                          <IncompleteCircle />
                        )}{" "}
                      </div>
                      {/* {sideLoader && !serviceCompleted && isServiceUpdated ? (
                        <span className=" mb-2">
                          <SmallLoader />
                        </span>
                      ) : (
                        <div>
                          {" "}
                          {serviceCompleted ? (
                            <BlueTick />
                          ) : (
                            <IncompleteCircle />
                          )}{" "}
                        </div>
                      )} */}
                    </div>
                  </div>

                  <div
                    onMouseEnter={handleShowBranchesModal}
                    onMouseLeave={handleHideBranchesModal}
                    ref={borderRef}
                    onClick={showAddBranchLocation}
                    className={`onboard-step mt-4 relative branch-indicate shadow-md py-2 px-3 rounded-md grid grid-cols-12 ${
                      branchCompleted ? "add-blue" : "add-white text-black"
                    }`}
                  >
                    <div className="col-span-11">
                      {showBranchesModal && (
                        <BranchesModal
                          branches={branches}
                          toggleBranchSide={toggleBranchSide}
                        />
                      )}
                      <div className="onboarding-strip-title">
                        Add Branch Location
                      </div>
                      <div>
                        <p className="light-o">
                          Lorem ipsum dolor sit amet consectetur. Sed ut nisl
                          odio eleifend.
                        </p>
                      </div>
                    </div>

                    <div className="col-span-1 flex justify-center items-center">
                      <div>
                        {" "}
                        {branchCompleted ? (
                          <BlueTick />
                        ) : (
                          <IncompleteCircle />
                        )}{" "}
                      </div>
                      {/* {sideLoader && !branchCompleted && isUpdatedBranch ? (
                        <span className=" mb-2">
                          <SmallLoader />
                        </span>
                      ) : (
                        <div>
                          {" "}
                          {branchCompleted ? (
                            <BlueTick />
                          ) : (
                            <IncompleteCircle />
                          )}{" "}
                        </div>
                      )} */}
                    </div>
                  </div>

                  {/* <div
                    ref={borderRef}
                    onClick={toggleStripeSide}
                    className={`onboard-step mt-4 shadow-md py-2 px-3 rounded-md grid grid-cols-12 ${
                      stripeCompleted ? "add-blue" : "add-white text-black"
                    }`}
                  >
                    <div className="col-span-11">
                      <div className="onboarding-strip-title">
                        Set Up Stripe For Your Business
                      </div>
                      <div>
                        <p className="light-o">
                          Lorem ipsum dolor sit amet consectetur. Sed ut nisl
                          odio eleifend.
                        </p>
                      </div>
                    </div>

                    <div className="col-span-1 flex justify-center items-center">
                      {stripeCompleted ? <BlueTick /> : <IncompleteCircle />}
                    </div>
                  </div> */}

                  {/* <div
                    ref={borderRef}
                    className={`onboard-step add-blue mt-4 shadow-md py-2 px-3 rounded-md grid grid-cols-12 ${
                      branchCompleted
                        ? "add-blue-later"
                        : "add-white text-black"
                    }`}
                  >
                    <div className="col-span-11">
                      <div className="onboarding-strip-title">
                        Add App Details
                      </div>
                      <div>
                        <p className="light-o">
                          Lorem ipsum dolor sit amet consectetur. Sed ut nisl
                          odio eleifend.
                        </p>
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                      {stripeCompleted ? <BlueTick /> : <IncompleteCircle />}
                    </div>
                    
                  </div> */}
                </div>

                <div className="flex justify-center align-center">
                  <button
                    disabled={
                      profileCompleted &&
                      businessCompleted &&
                      branchCompleted &&
                      serviceCompleted
                        ? false
                        : true
                    }
                    className="ann-btn  p-3 mt-12  rounded  "
                    onClick={() => navigate("/settings")}
                  >
                    Skip & Continue
                  </button>
                </div>
              </div>
              <div className="three shadow">
                {" "}
                <div className="h-full w-full ">{myComponent()} </div>{" "}
              </div>
              <div className="four"></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
