import { motion } from "framer-motion";
import ClientPays from "./payment-summary-cards/ClientPays";
import AgentPays from "./payment-summary-cards/AgentPays";
import { useState } from "react";
const PaymentSummary = ({ togglePaymentSummary }) => {
  const [condition, setCondition] = useState(1);
  const handleCondition = (condition) => {
    setCondition(parseInt(condition));
  };

  const componentProvider = () => {
    return (
      <div>
        <div>
          {" "}
          {condition === 1 && (
            <div>
              {" "}
              <ClientPays />{" "}
            </div>
          )}{" "}
        </div>
        <div>
          {" "}
          {condition === 2 && (
            <div>
              {" "}
              <AgentPays />{" "}
            </div>
          )}{" "}
        </div>
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
              onClick={togglePaymentSummary}
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
              <div className="title">Payment Summary</div>
            </div>
          </div>

          <div className="payment-togglers px-5 mt-5">
            <div className="flex ">
              <button
                onClick={() => handleCondition(1)}
                className={`px-5 py-1 ${
                  condition === 1 && "active-payment-btn"
                }`}
              >
                Client Pays
              </button>
              <button
                onClick={() => handleCondition(2)}
                className={`px-5 py-1  ${
                  condition === 2 && "active-payment-btn"
                } `}
              >
                Agent Pays
              </button>
            </div>
          </div>

          <hr className="w-60 mx-5" />

          <div className="px-5 mt-5">{componentProvider()}</div>

          <div className="pay-details-wrapper">
            <div className="pay-details-btns ">
              <div className="flex gap-2">
                <button className="job-maker-btn px-5 py-1">Close</button>
                <button className="new-pay-run px-5 py-1">View Payslip</button>
                <button className="job-maker-btn px-5 py-1">Send</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSummary;
