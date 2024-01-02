import { motion } from "framer-motion";
import { useState } from "react";

const PayRunDetails = ({ togglePayDetails }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      employee: "John Doe",
      status: "STP done",
      payPeriod: "2023-05-01",
      Gross: "$1148.00",
      tax: "$1148.00",
      super: "$1148.00",
      netPay: "$1148.00",
      annualLeave: "10 days",
      sickLeave: "5 days",
      earnings: "$55000.00",
      amountPaid: "$5000.00",
    },
    {
      id: 2,
      employee: "Jane Smith",
      status: "STP fails",
      payPeriod: "2023-05-01",
      Gross: "$1148.00",
      tax: "$1148.00",
      super: "$1148.00",
      netPay: "$1148.00",
      annualLeave: "12 days",
      sickLeave: "3 days",
      earnings: "$60000.00",
      amountPaid: "$5200.00",
    },
    {
      id: 3,
      employee: "David Johnson",
      status: "STP done",
      payPeriod: "2023-05-01",
      Gross: "$1000.00",
      tax: "$1000.00",
      super: "$1000.00",
      netPay: "$1000.00",
      annualLeave: "15 days",
      sickLeave: "2 days",
      earnings: "$65000.00",
      amountPaid: "$6000.00",
    },
    {
      id: 4,
      employee: "Emily Brown",
      status: "STP fails",
      payPeriod: "2023-05-01",
      Gross: "$1200.00",
      tax: "$1200.00",
      super: "$1200.00",
      netPay: "$1200.00",
      annualLeave: "8 days",
      sickLeave: "4 days",
      earnings: "$50000.00",
      amountPaid: "$4500.00",
    },
  ]);

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
              onClick={togglePayDetails}
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
              <div className="title">Pay Run Details</div>

              <div className="jumbo-dir mt-2">
                Payroll <span className="special-jumbo-text"> &gt; People</span>
              </div>
            </div>
          </div>

          <div className="pay-details-wrapper">
            <div className="pay-run-head grid grid-cols-8 gap-5 w-full px-5 mt-5">
              <div>Employee</div>
              <div>Annual Leave</div>
              <div>Sick Leave</div>
              <div>Earnings</div>
              <div>Tax</div>
              <div>Super</div>
              <div>Net Pay</div>
              Amount Pay
            </div>

            {users.map((member) => (
              <div
                key={member.id}
                className="grid mt-5 pay-details-body grid-cols-8 gap-5 w-full px-5 "
              >
                <div>
                  <div>{member.employee}</div>
                  <div className="flex gap-2">
                    <div>
                      <svg
                        width="18"
                        height="15"
                        viewBox="0 0 36 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          opacity="0.1"
                          width="36"
                          height="30"
                          rx="15"
                          fill="#B695F8"
                        />
                        <path
                          d="M11.875 25C11.3594 25 10.9181 24.8043 10.5512 24.413C10.1837 24.021 10 23.55 10 23V7C10 6.45 10.1837 5.979 10.5512 5.587C10.9181 5.19567 11.3594 5 11.875 5H19.375L25 11V15H23.125V12H18.4375V7H11.875V23H17.5V25H11.875ZM23.4062 17.525L24.4141 18.6L20.7812 22.45V23.5H21.7656L25.3984 19.65L26.3828 20.7L22.3516 25H19.375V21.825L23.4062 17.525ZM26.3828 20.7L23.4062 17.525L24.7656 16.075C24.9375 15.8917 25.1562 15.8 25.4219 15.8C25.6875 15.8 25.9062 15.8917 26.0781 16.075L27.7422 17.85C27.9141 18.0333 28 18.2667 28 18.55C28 18.8333 27.9141 19.0667 27.7422 19.25L26.3828 20.7Z"
                          fill="#B695F8"
                        />
                      </svg>
                    </div>
                    <div>
                      <svg
                        width="18"
                        height="15"
                        viewBox="0 0 36 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          opacity="0.05"
                          width="36"
                          height="30"
                          rx="15"
                          fill="url(#paint0_linear_1639_1818)"
                        />
                        <path
                          d="M27.2088 5.04902C26.8963 5.14667 8.30645 12.6076 8.22051 12.6701C8.07598 12.7717 7.97442 13.049 8.00567 13.2326C8.06426 13.5334 8.05255 13.5295 11.99 15.4357C14.0291 16.424 15.7127 17.2482 15.7322 17.2678C15.7518 17.2873 16.576 18.9709 17.5643 21.01C19.4705 24.9475 19.4666 24.9357 19.7674 24.9943C19.951 25.0256 20.2283 24.924 20.3299 24.7795C20.4315 24.6389 27.9119 5.93964 27.9666 5.70136C28.0018 5.53339 27.9979 5.49433 27.9197 5.34589C27.7752 5.07636 27.494 4.95917 27.2088 5.04902ZM20.49 11.6701L16.0565 16.1037L13.0565 14.6506C10.9705 13.6389 10.0721 13.1818 10.1072 13.1584C10.1775 13.1154 24.8338 7.24433 24.8846 7.24042C24.9041 7.23652 22.9275 9.23261 20.49 11.6701ZM22.8104 15.5021C21.1854 19.5607 19.8455 22.8928 19.8299 22.9084C19.8143 22.9279 19.1502 21.592 18.3494 19.9435L16.8963 16.9435L21.3182 12.5217C23.7518 10.0881 25.744 8.1037 25.7518 8.11152C25.7557 8.11542 24.4354 11.4396 22.8104 15.5021Z"
                          fill="url(#paint1_linear_1639_1818)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_1639_1818"
                            x1="19.7664"
                            y1="0.37257"
                            x2="19.7476"
                            y2="30.0001"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#101828" />
                            <stop offset="0.998509" stop-color="#0D1B37" />
                            <stop offset="1" stop-color="#0A1E46" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_1639_1818"
                            x1="17.9939"
                            y1="25"
                            x2="17.9939"
                            y2="5.01919"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#101828" />
                            <stop offset="1" stop-color="#0A1E46" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div>{member.annualLeave}</div>
                <div>{member.sickLeave}</div>

                <div>{member.earnings}</div>
                <div>{member.tax}</div>
                <div>{member.super}</div>
                <div>{member.netPay}</div>
                <div>{member.amountPaid}</div>
              </div>
            ))}

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

export default PayRunDetails;
