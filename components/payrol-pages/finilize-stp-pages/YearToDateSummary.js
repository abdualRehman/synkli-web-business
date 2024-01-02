import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
export const YearToDateSummary = ({ toggleYearToDateSummary }) => {
  const [summary, setSummary] = useState([
    {
      id: 1,
      item: "Directors Fee",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 2,
      item: "Overtimes",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 3,
      item: "Bonuses/Commission",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 4,
      item: "Travel Allowance",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 5,
      item: "Medical Benefits",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 6,
      item: "Training Expenses",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 7,
      item: "Bonus Incentives",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 8,
      item: "Miscellaneous",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
  ]);
  const [allowances, setAllowances] = useState([
    {
      id: 1,
      item: "Directors Fee",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 2,
      item: "Overtimes",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 3,
      item: "Bonuses/Commission",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 4,
      item: "Travel Allowance",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 5,
      item: "Medical Benefits",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 6,
      item: "Training Expenses",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 7,
      item: "Bonus Incentives",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 8,
      item: "Miscellaneous",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 9,
      item: "Housing Allowance",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 10,
      item: "Transportation Allowance",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 11,
      item: "Meal Allowance",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 12,
      item: "Communication Allowance",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 13,
      item: "Entertainment Allowance",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 14,
      item: "Education Allowance",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 15,
      item: "Uniform Allowance",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 16,
      item: "Vacation Allowance",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
  ]);
  const [deductions, setDeductions] = useState([
    {
      id: 1,
      item: "Tax Deduction",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 2,
      item: "Health Insurance",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 3,
      item: "Retirement Plan",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 4,
      item: "Union Dues",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 5,
      item: "Loan Repayment",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
  ]);
  const [superannuation, setSuperannuation] = useState([
    {
      id: 1,
      item: "Superannuation Plan A",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 2,
      item: "Superannuation Plan B",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 3,
      item: "Superannuation Plan C",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
  ]);
  const [lumpSumPayments, setLumpSumPayments] = useState([
    {
      id: 1,
      item: "Bonus Payment",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 2,
      item: "Severance Payment",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 3,
      item: "Retirement Payment",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 4,
      item: "Incentive Payment",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
  ]);
  const [reportableFringeBenefits, setReportableFringeBenefits] = useState([
    {
      id: 1,
      item: "Company Car",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 2,
      item: "Health Club Membership",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
  ]);
  const [terminationPayment, setTerminationPayment] = useState([
    {
      id: 1,
      item: "Severance Payment",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 2,
      item: "Redundancy Payment",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 3,
      item: "Notice Payment",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 4,
      item: "Gratuity Payment",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
  ]);

  const [childSupport, setChildSupport] = useState([
    {
      id: 1,
      item: "Child Support Payment A",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 2,
      item: "Child Support Payment B",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
  ]);
  const [paidLeave, setPaidLeave] = useState([
    {
      id: 1,
      item: "Annual Leave",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 2,
      item: "Sick Leave",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 3,
      item: "Personal Leave",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 4,
      item: "Parental Leave",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
    {
      id: 5,
      item: "Bereavement Leave",
      YTD: "$0.00",
      Adjustments: 0,
      FinalReports: "$0.00",
    },
  ]);

  return (
    <div className="add-p-side grid grid-cols-6 ">
      <div className="md:col-span-3 hidden md:block left-side"></div>
      <div className="right-side col-span-6 md:col-span-3">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleYearToDateSummary}
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
              <div className="title">Year to Date Summary</div>
            </div>
          </div>
          <div className=" px-5 year-summary-container">
            <div className="add-ann-form flex justify-between my-2">
              <div>
                {" "}
                <label>John Doe</label>{" "}
              </div>
              <div>
                <label>TFN: 9797979797</label>
              </div>
            </div>

            <div className="grid grid-cols-5 mt-1 gap-3 add-ann-form">
              <div className="col-span-2">
                <label>Item</label>
              </div>
              <div>
                <label>YTD</label>
              </div>
              <div>
                <label>Adjustments</label>
              </div>
              <div>
                <label>Final Reports</label>
              </div>
            </div>
            <div className="mt-2">
              {summary.map((sum, index) => (
                <div
                  className="summary-item grid grid-cols-5 gap-3 mt-2"
                  key={index}
                >
                  <div className="col-span-2"> {sum.item} </div>
                  <div> {sum.YTD} </div>
                  <div> {sum.Adjustments} </div>
                  <div> {sum.FinalReports} </div>
                </div>
              ))}
            </div>
            <div className="mt-3 add-ann-form">
              <label>Allowances</label>
            </div>

            <div className="mt-2">
              {allowances.map((allowance, index) => (
                <div
                  className="summary-item grid grid-cols-5 gap-3 mt-2"
                  key={index}
                >
                  <div className="col-span-2"> {allowance.item} </div>
                  <div> {allowance.YTD} </div>
                  <div> {allowance.Adjustments} </div>
                  <div> {allowance.FinalReports} </div>
                </div>
              ))}
            </div>

            <div className="mt-3 add-ann-form">
              <label>Deductions</label>
            </div>

            <div className="mt-2">
              {deductions.map((deduction, index) => (
                <div
                  className="summary-item grid grid-cols-5 gap-3 mt-2"
                  key={index}
                >
                  <div className="col-span-2"> {deduction.item} </div>
                  <div> {deduction.YTD} </div>
                  <div> {deduction.Adjustments} </div>
                  <div> {deduction.FinalReports} </div>
                </div>
              ))}
            </div>

            <div className="mt-3 add-ann-form">
              <label>Superannuation</label>
            </div>

            <div className="mt-2">
              {superannuation.map((supera, index) => (
                <div
                  className="summary-item grid grid-cols-5 gap-3 mt-2"
                  key={index}
                >
                  <div className="col-span-2"> {supera.item} </div>
                  <div> {supera.YTD} </div>
                  <div> {supera.Adjustments} </div>
                  <div> {supera.FinalReports} </div>
                </div>
              ))}
            </div>

            <div className="mt-3 add-ann-form">
              <label>Lump Sum Payments</label>
            </div>

            <div className="mt-2">
              {lumpSumPayments.map((supera, index) => (
                <div
                  className="summary-item grid grid-cols-5 gap-3 mt-2"
                  key={index}
                >
                  <div className="col-span-2"> {supera.item} </div>
                  <div> {supera.YTD} </div>
                  <div> {supera.Adjustments} </div>
                  <div> {supera.FinalReports} </div>
                </div>
              ))}
            </div>

            <div className="mt-3 add-ann-form">
              <label>Reportable Fringe Benefits</label>
            </div>

            <div className="mt-2">
              {reportableFringeBenefits.map((supera, index) => (
                <div
                  className="summary-item grid grid-cols-5 gap-3 mt-2"
                  key={index}
                >
                  <div className="col-span-2"> {supera.item} </div>
                  <div> {supera.YTD} </div>
                  <div> {supera.Adjustments} </div>
                  <div> {supera.FinalReports} </div>
                </div>
              ))}
            </div>

            <div className="mt-3 add-ann-form">
              <label>Termination Payment</label>
            </div>

            <div className="mt-2">
              {terminationPayment.map((supera, index) => (
                <div
                  className="summary-item grid grid-cols-5 gap-3 mt-2"
                  key={index}
                >
                  <div className="col-span-2"> {supera.item} </div>
                  <div> {supera.YTD} </div>
                  <div> {supera.Adjustments} </div>
                  <div> {supera.FinalReports} </div>
                </div>
              ))}
            </div>

            <div className="mt-3 add-ann-form">
              <label>Child Support</label>
            </div>

            <div className="mt-2">
              {childSupport.map((supera, index) => (
                <div
                  className="summary-item grid grid-cols-5 gap-3 mt-2"
                  key={index}
                >
                  <div className="col-span-2"> {supera.item} </div>
                  <div> {supera.YTD} </div>
                  <div> {supera.Adjustments} </div>
                  <div> {supera.FinalReports} </div>
                </div>
              ))}
            </div>

            <div className="mt-3 add-ann-form">
              <label>Paid Leave</label>
            </div>

            <div className="mt-2">
              {paidLeave.map((supera, index) => (
                <div
                  className="summary-item grid grid-cols-5 gap-3 mt-2"
                  key={index}
                >
                  <div className="col-span-2"> {supera.item} </div>
                  <div> {supera.YTD} </div>
                  <div> {supera.Adjustments} </div>
                  <div> {supera.FinalReports} </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center my-5 gap-5">
              <button className="emp-details-save-btn">Done</button>
              <button className="emp-details-close-btn">Close</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
