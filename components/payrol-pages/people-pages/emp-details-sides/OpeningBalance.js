import { useState } from "react";
export const OpeningBalance = () => {
  const [paidLeave, setPaidLeave] = useState(true);
  const [deduction, setDeduction] = useState(true);
  const [fringeBenefits, setFringeBenefits] = useState(true);
  const togglePaidLeave = () => {
    setPaidLeave(!paidLeave);
  };
  const toggleDeduction = () => {
    setDeduction(!deduction);
  };
  const toggleFringeBenefits = () => {
    setFringeBenefits(!fringeBenefits);
  };
  return (
    <div className="mt-3 opening-balance">
      <div className="b-s-title">Leave Balances</div>
      <div className="add-ann-form mt-2">
        <div className="grid grid-cols-2 gap-5 ">
          <div>
            <div className="mt-1">
              <label>Annual Leave Balance</label>
            </div>

            <div className="leave-loading-container">
              <input
                type="number"
                placeholder="Hours"
                className="leave-loading-input"
              />
              <button className="leave-loading-btn">hr</button>
            </div>
          </div>
          <div>
            <div className="mt-1">
              <label>Sick Leave Balance</label>
            </div>

            <div className="leave-loading-container">
              <input
                type="number"
                placeholder="Hours"
                className="leave-loading-input"
              />
              <button className="leave-loading-btn">hr</button>
            </div>
          </div>
        </div>

        <div className="b-s-title mt-2">Opening Balances</div>
        <div className="grid grid-cols-2 gap-5 mt-2">
          <div>
            <div>
              <label>As At *</label>{" "}
            </div>
            <div>
              <input type="text" placeholder="Date" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-3">
          <div>
            <div className="mt-1">
              <label>Overtime</label>
            </div>
            <div className="pay-rate-container">
              <input
                type="number"
                name=""
                id=""
                placeholder="Earnings"
                className="ob-input"
              />
              <button className="ob-btn">$</button>
            </div>
          </div>
          <div>
            <div className="mt-1">
              <label>Ordinary Earnings</label>
            </div>
            <div className="pay-rate-container">
              <input
                type="number"
                name=""
                id=""
                placeholder="Earnings"
                className="ob-input"
              />
              <button className="ob-btn">$</button>
            </div>
          </div>
          <div>
            <div className="mt-1">
              <label>Bonuses</label>
            </div>
            <div className="pay-rate-container">
              <input
                type="number"
                name=""
                id=""
                placeholder="Earnings"
                className="ob-input"
              />
              <button className="ob-btn">$</button>
            </div>
          </div>

          <div>
            <div className="mt-1">
              <label>Director's Fee</label>
            </div>
            <div className="pay-rate-container">
              <input
                type="number"
                name=""
                id=""
                placeholder="Earnings"
                className="ob-input"
              />
              <button className="ob-btn">$</button>
            </div>
          </div>

          <div>
            <div className="mt-1">
              <label>Salary Sacrifice</label>
            </div>
            <div className="pay-rate-container">
              <input
                type="number"
                name=""
                id=""
                placeholder="Earnings"
                className="ob-input"
              />
              <button className="ob-btn">$</button>
            </div>
          </div>

          <div>
            <div className="mt-1">
              <label>Tax</label>
            </div>
            <div className="pay-rate-container">
              <input
                type="number"
                name=""
                id=""
                placeholder="Earnings"
                className="ob-input"
              />
              <button className="ob-btn">$</button>
            </div>
          </div>

          <div>
            <div className="mt-1">
              <label>Super Guarantee</label>
            </div>
            <div className="pay-rate-container">
              <input
                type="number"
                name=""
                id=""
                placeholder="Earnings"
                className="ob-input"
              />
              <button className="ob-btn">$</button>
            </div>
          </div>

          <div>
            <div className="mt-1">
              <label>Employer Contribution</label>
            </div>
            <div className="pay-rate-container">
              <input
                type="number"
                name=""
                id=""
                placeholder="Earnings"
                className="ob-input"
              />
              <button className="ob-btn">$</button>
            </div>
          </div>

          <div>
            <div className="mt-1">
              <label>Reimbursement</label>
            </div>
            <div className="pay-rate-container">
              <input
                type="number"
                name=""
                id=""
                placeholder="Earnings"
                className="ob-input"
              />
              <button className="ob-btn">$</button>
            </div>
          </div>
        </div>

        <div
          onClick={togglePaidLeave}
          className="b-s-title mt-5 flex gap-3 items-center cursor-pointer"
        >
          <div>Paid Leave</div>
          <div>
            {" "}
            {!paidLeave ? (
              <svg
                width="14"
                height="7"
                viewBox="0 0 14 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.292893 0.256282C0.683417 -0.0854272 1.31658 -0.0854272 1.70711 0.256282L7 4.88756L12.2929 0.256282C12.6834 -0.0854272 13.3166 -0.0854272 13.7071 0.256282C14.0976 0.59799 14.0976 1.15201 13.7071 1.49372L7.70711 6.74372C7.31658 7.08543 6.68342 7.08543 6.29289 6.74372L0.292893 1.49372C-0.0976311 1.15201 -0.0976311 0.59799 0.292893 0.256282Z"
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                width="14"
                height="7"
                viewBox="0 0 14 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.7071 6.74372C13.3166 7.08543 12.6834 7.08543 12.2929 6.74372L7 2.11244L1.70711 6.74372C1.31658 7.08543 0.683419 7.08543 0.292895 6.74372C-0.0976295 6.40201 -0.0976295 5.84799 0.292895 5.50628L6.29289 0.256281C6.68342 -0.0854273 7.31658 -0.0854273 7.70711 0.256281L13.7071 5.50628C14.0976 5.84799 14.0976 6.40201 13.7071 6.74372Z"
                  fill="black"
                />
              </svg>
            )}
          </div>
        </div>

        {paidLeave && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            <div>
              <div className="mt-1">
                <label>Defence Leave</label>
              </div>
              <div className="pay-rate-container">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Earnings"
                  className="ob-input"
                />
                <button className="ob-btn">$</button>
              </div>
            </div>
            <div>
              <div className="mt-1">
                <label>Annual Leave</label>
              </div>
              <div className="pay-rate-container">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Earnings"
                  className="ob-input"
                />
                <button className="ob-btn">$</button>
              </div>
            </div>
            <div>
              <div className="mt-1">
                <label>Sick Leave</label>
              </div>
              <div className="pay-rate-container">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Earnings"
                  className="ob-input"
                />
                <button className="ob-btn">$</button>
              </div>
            </div>

            <div>
              <div className="mt-1">
                <label>Long Service Leave</label>
              </div>
              <div className="pay-rate-container">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Earnings"
                  className="ob-input"
                />
                <button className="ob-btn">$</button>
              </div>
            </div>

            <div>
              <div className="mt-1">
                <label>Paid Parental Leave</label>
              </div>
              <div className="pay-rate-container">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Earnings"
                  className="ob-input"
                />
                <button className="ob-btn">$</button>
              </div>
            </div>

            <div>
              <div className="mt-1">
                <label>Worker's Compensation</label>
              </div>
              <div className="pay-rate-container">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Earnings"
                  className="ob-input"
                />
                <button className="ob-btn">$</button>
              </div>
            </div>
          </div>
        )}

        <div className="b-s-title mt-5 flex gap-3 items-center">
          <div>Allowances</div>
          <div>
            <svg
              width="14"
              height="7"
              viewBox="0 0 14 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.292893 0.256282C0.683417 -0.0854272 1.31658 -0.0854272 1.70711 0.256282L7 4.88756L12.2929 0.256282C12.6834 -0.0854272 13.3166 -0.0854272 13.7071 0.256282C14.0976 0.59799 14.0976 1.15201 13.7071 1.49372L7.70711 6.74372C7.31658 7.08543 6.68342 7.08543 6.29289 6.74372L0.292893 1.49372C-0.0976311 1.15201 -0.0976311 0.59799 0.292893 0.256282Z"
                fill="black"
              />
            </svg>
          </div>
        </div>

        <div
          onClick={toggleDeduction}
          className="b-s-title mt-5 flex gap-3 cursor-pointer items-center"
        >
          <div>Deduction</div>
          <div>
            {" "}
            {!deduction ? (
              <svg
                width="14"
                height="7"
                viewBox="0 0 14 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.7071 6.74372C13.3166 7.08543 12.6834 7.08543 12.2929 6.74372L7 2.11244L1.70711 6.74372C1.31658 7.08543 0.683418 7.08543 0.292894 6.74372C-0.0976312 6.40201 -0.0976312 5.84799 0.292894 5.50628L6.29289 0.256281C6.68342 -0.0854275 7.31658 -0.0854275 7.70711 0.256281L13.7071 5.50628C14.0976 5.84799 14.0976 6.40201 13.7071 6.74372Z"
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                width="14"
                height="7"
                viewBox="0 0 14 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.292893 0.256282C0.683417 -0.0854272 1.31658 -0.0854272 1.70711 0.256282L7 4.88756L12.2929 0.256282C12.6834 -0.0854272 13.3166 -0.0854272 13.7071 0.256282C14.0976 0.59799 14.0976 1.15201 13.7071 1.49372L7.70711 6.74372C7.31658 7.08543 6.68342 7.08543 6.29289 6.74372L0.292893 1.49372C-0.0976311 1.15201 -0.0976311 0.59799 0.292893 0.256282Z"
                  fill="black"
                />
              </svg>
            )}
          </div>
        </div>

        {deduction && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            <div>
              <div className="mt-1">
                <label>Pre-Tax Fees</label>
              </div>
              <div className="pay-rate-container">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Earnings"
                  className="ob-input"
                />
                <button className="ob-btn">$</button>
              </div>
            </div>
            <div>
              <div className="mt-1">
                <label>Pre-Tax Workplace Giving</label>
              </div>
              <div className="pay-rate-container">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Earnings"
                  className="ob-input"
                />
                <button className="ob-btn">$</button>
              </div>
            </div>
            <div>
              <div className="mt-1">
                <label>Post-Tax Fees</label>
              </div>
              <div className="pay-rate-container">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Earnings"
                  className="ob-input"
                />
                <button className="ob-btn">$</button>
              </div>
            </div>

            <div>
              <div className="mt-1">
                <label>Post-Tax Workplace Giving</label>
              </div>
              <div className="pay-rate-container">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Earnings"
                  className="ob-input"
                />
                <button className="ob-btn">$</button>
              </div>
            </div>

            <div>
              <div className="mt-1">
                <label>Child Support</label>
              </div>
              <div className="pay-rate-container">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Earnings"
                  className="ob-input"
                />
                <button className="ob-btn">$</button>
              </div>
            </div>

            <div>
              <div className="mt-1">
                <label>Child Support Deductions</label>
              </div>
              <div className="pay-rate-container">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Earnings"
                  className="ob-input"
                />
                <button className="ob-btn">$</button>
              </div>
            </div>
          </div>
        )}

        <div
          onClick={toggleFringeBenefits}
          className="b-s-title mt-5 flex gap-3 cursor-pointer items-center"
        >
          <div>Fringe Benefits</div>
          <div>
            {" "}
            {!fringeBenefits ? (
              <svg
                width="14"
                height="7"
                viewBox="0 0 14 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.7071 6.74372C13.3166 7.08543 12.6834 7.08543 12.2929 6.74372L7 2.11244L1.70711 6.74372C1.31658 7.08543 0.683418 7.08543 0.292894 6.74372C-0.0976312 6.40201 -0.0976312 5.84799 0.292894 5.50628L6.29289 0.256281C6.68342 -0.0854275 7.31658 -0.0854275 7.70711 0.256281L13.7071 5.50628C14.0976 5.84799 14.0976 6.40201 13.7071 6.74372Z"
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                width="14"
                height="7"
                viewBox="0 0 14 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.292893 0.256282C0.683417 -0.0854272 1.31658 -0.0854272 1.70711 0.256282L7 4.88756L12.2929 0.256282C12.6834 -0.0854272 13.3166 -0.0854272 13.7071 0.256282C14.0976 0.59799 14.0976 1.15201 13.7071 1.49372L7.70711 6.74372C7.31658 7.08543 6.68342 7.08543 6.29289 6.74372L0.292893 1.49372C-0.0976311 1.15201 -0.0976311 0.59799 0.292893 0.256282Z"
                  fill="black"
                />
              </svg>
            )}
          </div>
        </div>

        {fringeBenefits && (
          <div className="grid grid-cols-3 gap-3">
            <div>
              <div className="mt-1">
                <label>Fringe Benefits Taxable</label>
              </div>
              <div className="pay-rate-container mt-1">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Earnings"
                  className="ob-input"
                />
                <button className="ob-btn">$</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="my-5 flex justify-center items-center w-full gap-3">
        <button className="emp-details-save-btn">Save</button>
        <button className="emp-details-close-btn">Close</button>
      </div>
    </div>
  );
};
