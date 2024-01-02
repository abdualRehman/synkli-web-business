import "./css/stpSettings.css";
import { motion } from "framer-motion";
export const STPSettings = ({ toggleStpSettings }) => {
  return (
    <div className="add-p-side grid grid-cols-4 ">
      <div className="md:col-span-2 hidden md:block left-side"></div>
      <div className="right-side col-span-4 md:col-span-2">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleStpSettings}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="13" cy="13" r="13" fill="#666666" />
                <path
                  d="M19 8L8 19"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M19 19L8 8"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div className="add-detail pt-10 px-5">
              <div className="title">STP Settings</div>

              <div className="jumbo-dir mt-2">
                Payroll{" "}
                <span className="special-jumbo-text"> &gt; Settings</span>
              </div>
            </div>
          </div>

          <div className="mt-8 px-5">
            <div className="linked-agent-title "> STP Details </div>
            <div className="mt-3 grid grid-cols-2 gap-1">
              <div>
                <div className="leave-settings-weak-text ">
                  {" "}
                  Software Provider Name{" "}
                </div>

                <div className="linked-agent-title mt-2">Payroller</div>

                <div className="leave-settings-weak-text mt-2">
                  {" "}
                  Software ID{" "}
                </div>

                <div className="linked-agent-title mt-2">00012443433</div>
              </div>
              <div>
                <div className="leave-settings-weak-text">
                  {" "}
                  Software Provider ABN{" "}
                </div>

                <div className="linked-agent-title mt-2">00012443433</div>
                <div className="leave-settings-weak-text mt-2">
                  {" "}
                  Business Management Software(BMS) ID{" "}
                </div>
                <div className="linked-agent-title mt-2">
                  9d9d9d99f9-s4s4-11hc-00012443433
                </div>
              </div>
            </div>

            <div className="stp-settings-card">
              Before you are able to submit any STP reports you will need to
              register Payroller as your software provider with the AT0. The
              Software IQ will help you on this. Either call the AT0 1300 85 22
              32 or follow{" "}
              <span className="text-blue-900 cursor-pointer">
                these instructions
              </span>{" "}
              to register
            </div>
          </div>

          <div className="emp-details-b-buttons absolute bottom-5 w-full flex items-center justify-center gap-3">
            <button className="emp-details-save-btn">Disable STP</button>
            <button className="emp-details-close-btn">Close</button>
          </div>

          <div className="leave-settings-weak-text mt-5">
            {" "}
            Do you want to disable STP lodgement?{" "}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
