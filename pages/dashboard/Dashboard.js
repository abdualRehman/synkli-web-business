import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/dashboard-css/dashboard.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { DashboardWelcomeCard } from "./dashboard-cards/DashboardWelcomeCard";
import { BlueGreaterSign } from "../../utills/svgs/BlueGreaterSign";
import { ThinTickIcon } from "../../utills/svgs/ThinTickIcon";
import { TwoStepsFirstActiveIcon } from "../../utills/svgs/TwoStepsFirstActiveIcon";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, BUSINESS_ID, REFRESH_TOKEN } from "utills/globalVars";
import { fetchUserDataThunk, login } from "store/auth/slices";
import { BulbIcon } from "utills/svgs/BulbIcon";
import { WhiteGreaterSign } from "utills/svgs/WhiteGreaterSign";
import { IncompleteCircle } from "utills/svgs/IncompleteCircle";
import { BlueTick } from "utills/svgs/BlueTick";
import { SmallLoader } from "components/common/SmallLoader";
import { setLoader } from "store/global/globalReducer";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import logo from "../../files/whiteBgLogo.png.png";
import logoutIcon from "../../files/powerOff.png.png";
import ConfirmationModal from "utills/confirmationModal";
import { useLogout } from "Hooks/useLogout";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.login);
  const [userData, setUserData] = useState(null);
  const [complete_two_fa, setComplete_two_fa] = useState(false);
  const isLoading = useSelector((state) => state.global.isLoading);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  console.log(data);
  const { logout } = useLogout();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsConfirmationOpen(true);
  };
  useEffect(() => {
    const dataConfig = { user_id: data?.user_id, user_type: "employee" };
    dispatch(setLoader(true));
    setTimeout(() => {
      dispatch(fetchUserDataThunk(dataConfig))
        .then((response) => {
          if (response.payload) {
            setUserData(response.payload);

            if (
              response.payload.email_2fa &&
              response.payload.google_authenticator_2fa
            ) {
              setComplete_two_fa(true);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          dispatch(setLoader(false));
        });
    }, 1000);
  }, []);

  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".subs",

          popover: {
            title: "start subscription",
            description: "In this section you can start a subscription",
            popoverClass: "my-custom-popover-class text-red-900",
          },
        },
        {
          element: ".two-fa",
          popover: {
            title: "Two Factor Authentication",
            description:
              "By clicking this section you can enable Two factor authentication. Email authentication is required to continue",
          },
        },
      ],
    });

    driverObj.drive();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="dashboard-page dashboard">
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
          className="flex items-center gap-2 justify-between  logout-button p-2 rounded-md w-full"
        >
          <div>Logout</div>
          <div>
            <img src={logoutIcon} className="logout-icon" />{" "}
          </div>
        </button>
      </div>
      {/* <div>
        <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div> */}
      <div className="main-grid-container">
        <div className="two shadow-md">
          <div>
            <div className="one-head px-5 pt-6">
              <h1 className="flex items-center gap-2">
                Welcome to{" "}
                <div className="logo-div flex items-center mt-2">
                  <img src={logo} alt="logo" className="close-logo" />
                </div>
              </h1>
            </div>

            <div></div>
            <div className="one-text px-5 pt-3">
              <p>
                Please complete these steps. These steps will help you secure
                your account and payment options.
              </p>
            </div>
            <div className="bulb grid grid-cols-10 py-3 text-white mt-3 col-span-2">
              <div className="flex justify-center items-center">
                <div className="svg-wrapper-div ml-5">
                  <BulbIcon />
                </div>
              </div>
              <div className="col-span-8 pl-5 pt-1">
                Quick start guide for SYNKLI
              </div>
              <div className="flex justify-center items-center">
                <div className="icon-wrapper scale-75">
                  <WhiteGreaterSign />
                </div>
              </div>
            </div>
            <div
              onClick={() => navigate(`/dashboard`)}
              className="cursor-pointer  shadow-md start-subs complete_fa subs"
            >
              <div className="flex justify-between items-center">
                <div>Start Subscription </div>
                <div className=" flex justify-center items-center">
                  <div className="circle-wrapper scale-75">
                    <BlueTick />
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => navigate(`/two/factor/auth`)}
              className={`cursor-pointer shadow-md start-subs two-fa ${
                complete_two_fa ? "complete_fa" : ""
              } `}
            >
              <div className="flex justify-between items-center">
                <div>Two Factor Authentication</div>
                <div className=" flex justify-center items-center">
                  <div className="circle-wrapper scale-75">
                    {isLoading ? (
                      <span className="two-fa-spiner">
                        {" "}
                        <SmallLoader />{" "}
                      </span>
                    ) : (
                      <span>
                        {userData?.email_2fa &&
                        userData?.google_authenticator_2fa ? (
                          <BlueTick />
                        ) : (
                          <IncompleteCircle />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="three shadow-md">
          <div className="one-head px-5 pt-6">
            <h1>Start Subscription</h1>
          </div>

          <div className="email-text one-head flex items-center gap-1 mx-5  mt-3 ">
            <div>
              <div className="top-1 scale-75 ">
                <BlueGreaterSign />
              </div>
            </div>
            <div>
              <span>Start 14 days free trial</span>
            </div>
          </div>

          <div className="shadow-md w-72 rounded-md pb-3 ml-5">
            <div className=" selected-plan mt-3">Selected Plan</div>

            <div className="plan-container mt-10">
              <div className="px-10">
                <h1>Basic</h1>
                <motion.p
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
                  className="doller"
                >
                  $16.00
                </motion.p>
              </div>
            </div>

            <div className="plan-options mt-3 px-5">
              <div className="flex gap-2">
                <div className="flex justify-center items-center">
                  <ThinTickIcon />
                </div>
                <div>
                  <p> Web & Mobile</p>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <div className="flex justify-center items-center">
                  <ThinTickIcon />
                </div>
                <div>
                  <p> Free Custom Domain</p>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <div className="flex justify-center items-center">
                  <ThinTickIcon />
                </div>
                <div>
                  <p> Best Hosting Ever</p>
                </div>
              </div>
            </div>
          </div>

          <div className="free-trial mx-5 shadow-md p-3 rounded-md mt-5">
            <div className="free-text">
              <p>Free Trial</p>
            </div>
            <div className="trial-content mt-3">
              <div className="time-period">Time Period</div>
              <div className="progress-bar-container mt-1">
                <div className="progress-bar" style={{ width: "10%" }}></div>
              </div>
            </div>
            <div className="free-end mt-1">
              Free trial will end on Jun 30 2020
            </div>
          </div>
          <div className="flex justify-center items-center mt-5">
            <div className="my-next-btn">
              <button
                onClick={() => navigate("/start/subs")}
                className="px-12 py-2 rounded-md"
              >
                Next
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center mt-2">
            <div className="bottom-svg-wrapper">
              <TwoStepsFirstActiveIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
