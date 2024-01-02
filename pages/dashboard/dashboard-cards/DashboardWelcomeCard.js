import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WhiteGreaterSign } from "../../../utills/svgs/WhiteGreaterSign";
import { BulbIcon } from "../../../utills/svgs/BulbIcon";
import { IncompleteCircle } from "../../../utills/svgs/IncompleteCircle";

import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../store/global/globalReducer";
import { fetchUserDataThunk } from "../../../store/auth/slices";
import { Loader } from "../../../components/common/Loader";
import { BlueTick } from "../../../utills/svgs/BlueTick";
import { SmallLoader } from "components/common/SmallLoader";
import logo from "../../../files/whiteBgLogo.png.png";
export const DashboardWelcomeCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(null);
  const data = useSelector((state) => state.login.data);
  const isLoading = useSelector((state) => state.global.isLoading);
  const [complete_two_fa, setComplete_two_fa] = useState(false);

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
  }, [dispatch]);
  return (
    <div>
      <div className="one-head px-5 pt-6">
        <h1 className="flex items-center gap-2">
          Welcome to{" "}
          <div className="logo-div flex items-center mt-2">
            <img src={logo} alt="logo" className="close-logo" />
          </div>
        </h1>
      </div>
      <div className="one-text px-5 pt-3">
        <p>
          Please complete these steps. These steps will help you secure your
          account and payment options.
        </p>
      </div>
      <div className="bulb grid grid-cols-10 py-3 text-white mt-3 col-span-2">
        <div className="flex justify-center items-center">
          <div className="svg-wrapper-div ml-5">
            <BulbIcon />
          </div>
        </div>
        <div className="col-span-8 pl-5 pt-1">Quick start guide for SYNKLI</div>
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
                  {userData?.email_2fa && userData?.google_authenticator_2fa ? (
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
  );
};
