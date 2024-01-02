import { useState } from "react";
import { motion } from "framer-motion";
import { OrganizationDetails } from "./organization-settings-components/OrganizationDetails";
import { ScheduleDetails } from "./organization-settings-components/ScheduleDetails";
import { LeaveSettings } from "./organization-settings-components/LeaveSettings";
import { LinkedAgent } from "./organization-settings-components/LinkedAgent";
export const OrganizationSettings = ({ toggleOrganizationSettings }) => {
  const [condition, setCondition] = useState(1);

  const handleCondition = (condition) => {
    setCondition(condition);
  };

  const componentProvider = () => {
    return (
      <div>
        {condition === 1 && <OrganizationDetails />}
        {condition === 2 && <ScheduleDetails />}
        {condition === 3 && <LeaveSettings />}
        {condition === 4 && <LinkedAgent />}
      </div>
    );
  };

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
              onClick={toggleOrganizationSettings}
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
              <div className="title">Organization Settings</div>

              <div className="jumbo-dir mt-2">
                Payroll{" "}
                <span className="special-jumbo-text"> &gt; Settings</span>
              </div>
            </div>
          </div>

          <div className="mx-3 mt-3 grid grid-cols-4 gap-2 emp-details-togglers">
            <button
              onClick={() => handleCondition(1)}
              className={`emp-details-toggler ${
                condition === 1 && "active-emp-detail"
              }`}
            >
              Organization Details
            </button>
            <button
              onClick={() => handleCondition(2)}
              className={`emp-details-toggler ${
                condition === 2 && "active-emp-detail"
              }`}
            >
              Schedule Details
            </button>
            <button
              onClick={() => handleCondition(3)}
              className={`emp-details-toggler ${
                condition === 3 && "active-emp-detail"
              }`}
            >
              Leave Settings
            </button>
            <button
              onClick={() => handleCondition(4)}
              className={`emp-details-toggler ${
                condition === 4 && "active-emp-detail"
              }`}
            >
              Linked Agent
            </button>
          </div>
          <div className="mx-5 mt-2">{componentProvider()}</div>
        </motion.div>
      </div>
    </div>
  );
};
