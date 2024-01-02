import { motion } from "framer-motion";
import "./css/teamDetails.css";
import { TimesIcon } from "../../../utills/svgs/TimesIcon";
const InviteSuccess = ({ toggleInviteSuccess }) => {
  return (
    <div className="add-p-side deactivate-acc flex justify-center items-center ">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
        className="de-warning relative px-16 py-7"
      >
        <div
          onClick={toggleInviteSuccess}
          className="warning-toggle absolute cursor-pointer right-2 top-2"
        >
          <TimesIcon />
        </div>
        <div className=" flex justify-center items-center">
          <svg
            width="60"
            height="70"
            viewBox="0 0 54 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.7143 41.0181V65H7.93831e-07C-0.000952493 61.2204 0.856687 57.4907 2.5072 54.0967C4.15772 50.7027 6.55731 47.7346 9.5221 45.4196C12.4869 43.1047 15.9382 41.5045 19.6115 40.7415C23.2849 39.9786 27.0828 40.0732 30.7143 41.0181ZM24.5714 37.1429C14.3896 37.1429 6.14286 28.8321 6.14286 18.5714C6.14286 8.31071 14.3896 0 24.5714 0C34.7532 0 43 8.31071 43 18.5714C43 28.8321 34.7532 37.1429 24.5714 37.1429Z"
              fill="url(#paint0_linear_1882_6591)"
            />
            <rect x="42" y="43" width="4" height="20" rx="2" fill="#B695F8" />
            <rect
              x="54"
              y="51"
              width="4"
              height="20"
              rx="2"
              transform="rotate(90 54 51)"
              fill="#B695F8"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1882_6591"
                x1="23.6098"
                y1="0.807235"
                x2="23.5362"
                y2="65.0001"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#101828" />
                <stop offset="0.998509" stop-color="#0D1B37" />
                <stop offset="1" stop-color="#0A1E46" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="invite-text mt-2">
          <p className="invite-center-text">Your Invitation Has Been Sent</p>
          <p className="invite-center-text">Successfully!!!</p>
        </div>

        <div className="invite-btn flex justify-center mt-5">
          <button
            onClick={toggleInviteSuccess}
            className="add-btn px-14 py-2 rounded-lg text-white"
          >
            Ok
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default InviteSuccess;
