import AppSidebar from "../../appSidebarComp/AppSidebar";
import { useNavigate } from "react-router-dom";
import "../../dashboard-css/auth-css/googleAuth.css";
import { useEffect, useState, memo } from "react";
import { DashboardWelcomeCard } from "../../../pages/dashboard/dashboard-cards/DashboardWelcomeCard";
import { BackArrow } from "../../../utills/svgs/BackArrow";
import { BlueGreaterSign } from "../../../utills/svgs/BlueGreaterSign";
import Ripples from "react-ripples";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../store/global/globalReducer";
import { googleAuthThunk } from "../../../store/auth/slices";

import { SmallLoader } from "../../common/SmallLoader";

const GoogleAuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.global.isLoading);
  const [code, setCode] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const data = useSelector((state) => state.login.data);

  const googleAuthData = {
    user_id: data?.user_id,
    user_type: "employee",
  };
  const fetchData = async () => {
    dispatch(googleAuthThunk(googleAuthData))
      .then((response) => {
        console.log(response.payload);
        if ((response.payload, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")) {
          setCode(response.payload.code);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(googleAuthThunk(googleAuthData))
        .then((response) => {
          console.log(response.payload);
          if ((response.payload, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")) {
            setCode(response.payload.code);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          dispatch(setLoader(false));
        });
    }, 3000);
  }, [dispatch]);

  return (
    <div className="dashboard-page">
      {/* <div>
        <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div> */}
      <div className="main-grid-container">
        <div className="one "></div>
        <div className="two shadow-md">
          <DashboardWelcomeCard />
        </div>
        <div className="three shadow-md">
          <div className="one-head  pt-4 flex   ">
            <div className="one-head px-3 pt-2 flex  items-center ">
              <div
                onClick={() => navigate("/dashboard")}
                className="arrow-wrapper mt-1 cursor-pointer"
              >
                <BackArrow />
              </div>
              <div>
                {" "}
                <h1>Instructions For Google Authenticator</h1>
              </div>
            </div>
          </div>

          <div className="google-text flex items-center gap-1 mx-5 mt-3">
            <div>
              <div className=" scale-75">
                <BlueGreaterSign />
              </div>
            </div>
            <div>
              <span>Download an authentication app</span>
            </div>
          </div>

          <div className="google-inner-text px-5 mt-1">
            <p>
              We recommended downloading Duo Mobile or Google Authenticator if
              you don’t have one installed.
            </p>
          </div>

          <div className="google-text mt-3 items-center flex gap-1 mx-5">
            <div>
              <div className="scale-75">
                <BlueGreaterSign />
              </div>
            </div>
            <div>
              <span>Scan this barcode/QR code or Copy the Key</span>
            </div>
          </div>

          <div className="google-inner-text px-5 mt-1">
            <p>
              Scan this barcode/QR code in the authentication app or copy the
              key and paste it in the authentication app.
            </p>
          </div>

          <div className="code px-7 mt-10">
            <div>
              <div>
                {code ? (
                  <span> {code} </span>
                ) : (
                  <div className="flex items-center justify-center">
                    {" "}
                    <SmallLoader />{" "}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="google-text flex gap-1 items-center mx-5 mt-10">
            <div>
              <div className="scale-75">
                <BlueGreaterSign />
              </div>
            </div>
            <div>
              <span>Copy and enter 6-digit code</span>
            </div>
          </div>

          <div className="google-inner-text px-5 mt-1">
            <p>
              After the barcode/QR code has been scanned or the key has been
              entered, your authentication app will generate a 6-digit code.
              Copy the code and then come back to enter it.
            </p>
          </div>

          <div className="flex btn-wrapper justify-center items-end">
            <Ripples during={2000} color="#979797">
              {" "}
              <button
                onClick={() => navigate("/google/qr")}
                disabled={!code}
                className="px-12 py-2 rounded-md"
              >
                Send
              </button>
            </Ripples>
          </div>
        </div>
        <div className="four"></div>
      </div>
    </div>
  );
};

export default memo(GoogleAuthPage);
