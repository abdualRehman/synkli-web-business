import { useState, useEffect } from "react";
import AppSidebar from "../../../components/appSidebarComp/AppSidebar";
import "../../../components/dashboard-css/auth-css/twoFactor.css";
import { useNavigate } from "react-router-dom";
import { DashboardWelcomeCard } from "../dashboard-cards/DashboardWelcomeCard";
import { LaptopMobile } from "../../../utills/svgs/LaptopMobile";
import { BlueGreaterSign } from "../../../utills/svgs/BlueGreaterSign";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import { fetchUserDataThunk, login } from "store/auth/slices";
import { SmallLoader } from "components/common/SmallLoader";
import { BlueTick } from "utills/svgs/BlueTick";
import Cookies from "js-cookie";
import logoutIcon from "../../../files/powerOff.png.png";
import { ACCESS_TOKEN, BUSINESS_ID, REFRESH_TOKEN } from "utills/globalVars";
import ConfirmationModal from "utills/confirmationModal";
import { useLogout } from "Hooks/useLogout";

const TwoFactor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.login);
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { logout } = useLogout();

  const isLoading = useSelector((state) => state.global.isLoading);
  const [complete_two_fa, setComplete_two_fa] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
    }, 2000);
  }, []);

  const handleLogout = () => {
    setIsConfirmationOpen(true);
  };

  const navigateTo = () => {
    console.log(data, "loginDataLog");
    if (data) {
      if (data.is_password_change_required && data?.is_employee) {
        navigate(`/update-ot-password/${data.user_id}`);
      } else if (data?.is_employee && !data.is_password_change_required) {
        navigate("/settings");
      } else {
        navigate("/onboarding");
      }
    }
  };
  return (
    <div className="dashboard-page">
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
        <div className="one "></div>
        <div className="two shadow-md">
          <DashboardWelcomeCard />
        </div>
        <div className="three shadow-md">
          <div className="one-head px-5 pt-6">
            <h1>Two Factor Authentication</h1>
          </div>

          <div className="flex justify-center items-center py-10">
            <div>
              <LaptopMobile />
            </div>
          </div>

          <div className="text-center extra-security">
            Add extra security to your account
          </div>

          <div className="two-factor-text px-8 mt-3">
            <p>
              Two-factor authentication protects your account by recurring a
              login code when you login on a device we don’t recognize.
            </p>
          </div>

          <div className="authentication mt-3  py-3">
            <div className="auth-one flex px-3 items-center gap-1">
              <div className="flex justify-center items-center">
                <div className="esvg-wrapper scale-75">
                  <BlueGreaterSign />
                </div>
              </div>
              <div>Email Verification</div>
            </div>
            <div className="auth-two">
              {isLoading ? (
                <div className="scale-75 mr-2">
                  <SmallLoader />{" "}
                </div>
              ) : (
                <div>
                  {" "}
                  {userData?.email_2fa ? (
                    <BlueTick />
                  ) : (
                    <button
                      onClick={() => navigate(`/email/auth`)}
                      className="px-2 py-1 rounded-lg"
                    >
                      Set Up
                    </button>
                  )}{" "}
                </div>
              )}
            </div>
          </div>

          <div className="authentication  py-3">
            <div className="auth-one flex px-3 items-center gap-1">
              <div className="flex justify-center items-center">
                <div className="esvg-wrapper scale-75">
                  <BlueGreaterSign />
                </div>
              </div>
              <div>Google Authenticator</div>
            </div>
            <div className="auth-two">
              {isLoading ? (
                <div className="scale-75 mr-2">
                  <SmallLoader />{" "}
                </div>
              ) : (
                <div>
                  {" "}
                  {userData && userData.google_authenticator_2fa ? (
                    <BlueTick />
                  ) : (
                    <button
                      onClick={() => navigate(`/google/auth`)}
                      className="px-2 py-1 rounded-lg"
                    >
                      Set Up
                    </button>
                  )}{" "}
                </div>
              )}
            </div>
          </div>
          {userData?.email_2fa ? (
            <div className="">
              {" "}
              <div className="flex justify-center mx-8 ro mt-20">
                <button
                  onClick={() => navigateTo()}
                  className="proceed-btns px-10 rounded-md py-2"
                >
                  Skip
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="four"></div>
      </div>
    </div>
  );
};

export default TwoFactor;
