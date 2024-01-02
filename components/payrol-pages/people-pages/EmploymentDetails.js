import { motion } from "framer-motion";
import { useState } from "react";
import "./emp-details-sides/css/empDetails.css";
import Personal from "./emp-details-sides/Personal";
import { BankAndSuper } from "./emp-details-sides/BankAndSuper";
import { Employment } from "./emp-details-sides/Employment";
import { Tax } from "./emp-details-sides/Tax";
import { OpeningBalance } from "./emp-details-sides/OpeningBalance";
import { Template } from "./emp-details-sides/Template";

const EmploymentDetails = ({ toggleEmploymentDetails }) => {
  const [condition, setCondition] = useState(1);

  const handleCondition = (condition) => {
    setCondition(condition);
  };
  const componentProvider = () => {
    return (
      <div>
        {condition === 1 && <Personal />}
        {condition === 2 && <BankAndSuper />}
        {condition === 3 && <Employment />}
        {condition === 4 && <Tax />}
        {condition === 5 && <OpeningBalance />}
        {condition === 6 && <Template />}
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
              onClick={toggleEmploymentDetails}
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
              <div className="title">Employment Details</div>

              <div className="jumbo-dir mt-2">
                Payroll <span className="special-jumbo-text"> &gt; People</span>
              </div>
            </div>
          </div>

          <div className="mx-3 mt-3 grid grid-cols-6 gap-2 emp-details-togglers">
            <button
              onClick={() => handleCondition(1)}
              className={`emp-details-toggler ${
                condition === 1 && "active-emp-detail"
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => handleCondition(2)}
              className={`emp-details-toggler ${
                condition === 2 && "active-emp-detail"
              }`}
            >
              Bank & Super
            </button>
            <button
              onClick={() => handleCondition(3)}
              className={`emp-details-toggler ${
                condition === 3 && "active-emp-detail"
              }`}
            >
              Employment
            </button>
            <button
              onClick={() => handleCondition(4)}
              className={`emp-details-toggler ${
                condition === 4 && "active-emp-detail"
              }`}
            >
              Tax
            </button>
            <button
              onClick={() => handleCondition(5)}
              className={`emp-details-toggler ${
                condition === 5 && "active-emp-detail"
              }`}
            >
              Opening Balance
            </button>
            <button
              onClick={() => handleCondition(6)}
              className={`emp-details-toggler ${
                condition === 6 && "active-emp-detail"
              }`}
            >
              Template
            </button>
          </div>
          <div className="mx-5 mt-2">{componentProvider()}</div>
        </motion.div>
      </div>
    </div>
  );
};
export default EmploymentDetails;
