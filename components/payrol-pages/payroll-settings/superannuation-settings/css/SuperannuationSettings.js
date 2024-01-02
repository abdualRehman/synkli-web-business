import "./superannuationSettings.css";
import { motion } from "framer-motion";
export const SuperannuationSettings = ({ toggleShowSuperSettings }) => {
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
              onClick={toggleShowSuperSettings}
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
              <div className="title">Superannuation Settings</div>

              <div className="jumbo-dir mt-2">
                Payroll{" "}
                <span className="special-jumbo-text"> &gt; Settings</span>
              </div>
            </div>
          </div>

          <div className="add-ann-form mt-5 px-5">
            <div className="linked-agent-title">Edit Details In Beam</div>
            <div className="leave-settings-weak-text mt-1">
              EG. Direct debit and superannuation details
            </div>
            <div className="linked-agent-title mt-2">Refund Bank Account</div>
            <div className="grid grid-cols-2 mt-3 gap-5">
              <div>
                <div>
                  {" "}
                  <label>BSB *</label>{" "}
                </div>
                <div>
                  {" "}
                  <input type="text" placeholder="BSB" />{" "}
                </div>
                <div>
                  {" "}
                  <label>Account Name *</label>{" "}
                </div>
                <div>
                  {" "}
                  <input type="text" placeholder="Account Name" />{" "}
                </div>
              </div>
              <div>
                <div className="mt-1">
                  {" "}
                  <label>Account Number 6-9 </label>{" "}
                </div>
                <div>
                  {" "}
                  <input
                    type="Number"
                    placeholder="Account Number"
                    className="mised-input-style"
                  />{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="emp-details-b-buttons absolute bottom-5 w-full flex items-center justify-center gap-3">
            <button className="emp-details-save-btn">Save </button>
            <button className="emp-details-close-btn">Close</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
