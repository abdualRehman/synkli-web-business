import React from 'react'


import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/dashboard-css/dashboard.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { BlueGreaterSign } from "../../utills/svgs/BlueGreaterSign";
import { ThinTickIcon } from "../../utills/svgs/ThinTickIcon";
import { TwoStepsFirstActiveIcon } from "../../utills/svgs/TwoStepsFirstActiveIcon";

const Dashboard = () => {


  const navigate = useNavigate();
  return (
    <div className="dashboard-page dashboard">
      <div>
        <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className="main-grid-container">
        <div className="two shadow-md">
        
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
