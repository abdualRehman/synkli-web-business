import "./appSidebar.css";

import { useState, useEffect } from "react";
import ClientsSide from "./ClientsSide";
import WorkplaceSide from "./WorkplaceSide";
import SettingsSide from "./SettingsSide";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../../files/powerOff.png.png";
import logo from "../../files/transparentLogo.png.png";
//icons
import { DashboardIcon } from "../../utills/svgs/DashboardIcon";
import { ClientsIcon } from "../../utills/svgs/ClientsIcon";
import { WorkspaceIcon } from "../../utills/svgs/WorkspaceIcon";
import { ReportsIcon } from "../../utills/svgs/ReportsIcon";
import { SettingsIcon } from "../../utills/svgs/SettingsIcon";
import { SearchIcon } from "../../utills/svgs/SearchIcon";
import { ArrowRight } from "../../utills/svgs/ArrowRight";

import { CrossIcon } from "../../utills/svgs/CrossIcon";
import { useDispatch, useSelector } from "react-redux";
import { SidebarOpen } from "utills/svgs/SidebarOpen";
import { SidebarClose } from "utills/svgs/SidebarClose";
import { SidebarSearch } from "utills/svgs/SidebarSearch";
import { useOwnerProfile } from "Hooks/useOwnerProfile";
import { login } from "store/auth/slices";

import { ACCESS_TOKEN, BUSINESS_ID, REFRESH_TOKEN } from "utills/globalVars";
import { DefaultUserIcon } from "utills/svgs/DefaultUserIcon";
import { setIsConfirmationOpen } from "store/global/globalReducer";

const AppSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showClient, setShowClient] = useState(false);
  const [showWrokplace, setShowWorkplace] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { data } = useSelector((state) => state.login);
  const { getOwnerProfile } = useOwnerProfile();
  const { data: ownerProfile } = useSelector(
    (state) => state.businessOwnerGetProfile
  );

  console.log(data, "sidebarlogin");
  const { profileImg } = useSelector((state) => state.global);
  const toggleClient = () => {
    setShowSettings(false);
    setShowWorkplace(false);
    setShowClient(!showClient);
  };

  const toggleWorkspace = () => {
    setShowSettings(false);
    setShowClient(false);
    setShowWorkplace(!showWrokplace);
  };

  const toggleSettings = () => {
    setShowClient(false);
    setShowWorkplace(false);
    setShowSettings(!showSettings);
    console.log("show setting");
  };

  const showSettingsPage = () => {
    navigate("/settings");
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    getOwnerProfile();
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY >= 16); // 1 rem is equivalent to 16 pixels
    };

    window?.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logout = () => {
    dispatch(login.actions.handleUpdate(null));
    localStorage.setItem(ACCESS_TOKEN, "");
    localStorage.setItem(REFRESH_TOKEN, "");
    localStorage.setItem(BUSINESS_ID, "");
    navigate("/");
  };

  const handleShowClientsSide = () => {
    setShowSettings(false);
    setShowWorkplace(false);
    setShowClient(true);
  };

  const handleHideClientSide = () => {
    setShowClient(false);
  };

  const handleShowWorkspace = () => {
    setShowClient(false);

    setShowSettings(false);

    setShowWorkplace(true);
  };

  const handleHideWorkspace = () => {
    setShowWorkplace(false);
  };

  const showSettingsSide = () => {
    setShowClient(false);
    setShowWorkplace(false);
    setShowSettings(true);
  };

  const hideSettings = () => {
    setShowSettings(false);
  };

  const handleLogout = () => {
    dispatch(setIsConfirmationOpen(true));
  };
  return (
    <div>
      <div className={`activate-tab-sidebar blue-bg`}>
        {" "}
        <span onClick={toggleSidebar} className="cursor-pointer">
          <CrossIcon />
        </span>{" "}
      </div>
      <div
        className={`app-sidebar min-h-screen flex text-white ${
          isOpen ? "sidebar-open" : "sidebar-close"
        }`}
      >
        {showClient ? (
          <div>
            <ClientsSide handleHideClientSide={handleHideClientSide} />
          </div>
        ) : (
          ""
        )}

        {showWrokplace ? (
          <div>
            {" "}
            <WorkplaceSide handleHideWorkspace={handleHideWorkspace} />{" "}
          </div>
        ) : (
          ""
        )}

        {showSettings ? (
          <div>
            {" "}
            <SettingsSide hideSettings={hideSettings} />{" "}
          </div>
        ) : (
          ""
        )}

        <div className="inner-app-side">
          {!isOpen ? (
            <div onClick={toggleSidebar} className="toggle-open">
              <SidebarOpen />
            </div>
          ) : (
            <div onClick={toggleSidebar} className="toggle-open">
              <SidebarClose />
            </div>
          )}
          <div className="logo-div mx-4 flex items-center my-4">
            <img
              src={logo}
              alt="logo"
              className={` ${isOpen ? "open-logo" : "close-logo"}`}
            />
          </div>
          {/* <div className={`title-div ${!isOpen ? "main-title" : "open-title"}`}>
            <p> SYNKLI</p>
          </div> */}

          <div className="sidebar-items mt-2">
            <div>
              {!isOpen ? (
                <div className="flex justify-center">
                  <div className="only-icon ">
                    <DashboardIcon />
                  </div>{" "}
                </div>
              ) : (
                <div className="">
                  <div className="flex gap-2 open-item items-center">
                    <div>
                      {" "}
                      <DashboardIcon />{" "}
                    </div>
                    <div> Dashboard </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3">
              {!isOpen ? (
                <div className="flex justify-center">
                  <div className="relations"> Relations</div>
                </div>
              ) : (
                <div className="open-string hover:bg-none">
                  <div>
                    {" "}
                    <div className="relations"> Relations</div>{" "}
                  </div>
                </div>
              )}
            </div>

            <div
              onClick={() => navigate("/app/users")}
              onMouseEnter={handleShowClientsSide}
              className="mt-5"
            >
              {!isOpen ? (
                <div className="flex justify-center">
                  <div className="only-icon ">
                    <ClientsIcon />
                  </div>{" "}
                </div>
              ) : (
                <div className="">
                  <div className="flex gap-2 open-item items-center">
                    <div>
                      <ClientsIcon />
                    </div>
                    <div className="flex-1">Clients</div>
                    <div className="mr-3">
                      <ArrowRight />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div onMouseEnter={handleShowWorkspace} className="mt-3">
              {!isOpen ? (
                <div className="flex justify-center">
                  <div className="only-icon ">
                    <WorkspaceIcon />
                  </div>{" "}
                </div>
              ) : (
                <div className="">
                  <div className="flex gap-2 open-item items-center">
                    <div>
                      <WorkspaceIcon />
                    </div>
                    <div className="flex-1">Workspace</div>
                    <div className="mr-3">
                      <ArrowRight />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* <div className="mt-3">
              {!isOpen ? (
                <div className="flex justify-center">
                  <div className="only-icon ">
                    <MarketingIcon />
                  </div>{" "}
                </div>
              ) : (
                <div className="">
                  <div className="flex gap-2 open-item items-center">
                    <div>
                      <MarketingIcon />
                    </div>
                    <div className="flex-1">Marketing</div>
                  </div>
                </div>
              )}
            </div> */}

            {/* <div className="mt-3">
              {!isOpen ? (
                <div className="flex justify-center">
                  <div className="only-icon ">
                    <PayrollIcon />
                  </div>{" "}
                </div>
              ) : (
                <div className="">
                  <div className="flex gap-2 open-item items-center">
                    <div>
                      <PayrollIcon />
                    </div>
                    <div className="flex-1">Payroll</div>
                  </div>
                </div>
              )}
            </div> */}
            <div className="mt-3">
              {!isOpen ? (
                <div className="flex justify-center">
                  <div className="only-icon ">
                    <ReportsIcon />
                  </div>{" "}
                </div>
              ) : (
                <div className="">
                  <div className="flex gap-2 open-item items-center">
                    <div>
                      <ReportsIcon />
                    </div>
                    <div className="flex-1">Reports</div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-5">
              {!isOpen ? (
                <div className="flex justify-center">
                  <div className="relations"> Support</div>
                </div>
              ) : (
                <div className="open-string hover:bg-none">
                  <div>
                    {" "}
                    <div className="relations"> Support</div>{" "}
                  </div>
                </div>
              )}
            </div>

            <div
              onMouseEnter={showSettingsSide}
              onClick={showSettingsPage}
              className="mt-5"
            >
              {!isOpen ? (
                <div className="flex justify-center">
                  <div className="only-icon ">
                    <SettingsIcon />
                  </div>{" "}
                </div>
              ) : (
                <div className="">
                  <div className="flex gap-2 open-item items-center">
                    <div>
                      <SettingsIcon />
                    </div>
                    <div className="flex-1">Settings</div>
                    <div onClick={toggleSettings} className="mr-3">
                      <ArrowRight />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3">
              {!isOpen ? (
                <div className="flex justify-center">
                  <div className="only-icon ">
                    <SearchIcon />
                  </div>{" "}
                </div>
              ) : (
                <div className="">
                  <div className="flex gap-2 open-item items-center">
                    <div>
                      <SidebarSearch />
                    </div>
                    <div className="flex-1">Search</div>
                  </div>
                </div>
              )}
            </div>

            <div onClick={() => navigate("/profile")} className="mt-3">
              {!isOpen ? (
                <div className="flex justify-center">
                  <div className="only-icon ">
                    {profileImg || ownerProfile?.image ? (
                      <img
                        src={profileImg ?? ownerProfile.image}
                        alt="profile"
                        className="detail-image"
                      />
                    ) : (
                      <span>
                        {" "}
                        <DefaultUserIcon />{" "}
                      </span>
                    )}
                  </div>{" "}
                </div>
              ) : (
                <div data-tooltip-target="tooltip-default" className="">
                  <div className="flex gap-2 open-item items-center">
                    <div>
                      {profileImg || ownerProfile?.image ? (
                        <img
                          src={profileImg ?? ownerProfile.image}
                          alt="profile"
                          className="profile-sidebar-img"
                        />
                      ) : (
                        <span className="scale-75">
                          {" "}
                          <DefaultUserIcon />{" "}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">Profile</div>
                    <div className="mr-3">
                      <ArrowRight />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              id="tooltip-default"
              role="tooltip"
              class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Tooltip content
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div className="absolute bottom-5 w-full">
              <div className="add-ann-form cursor-pointer mx-4  flex items-center">
                {isOpen ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 justify-between  logout-button p-2 rounded-md w-full"
                  >
                    <div>Logout</div>
                    <div>
                      <img src={logoutIcon} className="logout-icon" />{" "}
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center logout-button p-2 rounded-md w-full"
                  >
                    <div>
                      <img src={logoutIcon} className="logout-icon" />{" "}
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
