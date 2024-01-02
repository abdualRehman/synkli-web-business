import { motion } from "framer-motion";
const InviteEmployee = ({ toggleInviteEmployee }) => {
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
              onClick={toggleInviteEmployee}
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
              <div className="title">Invite Your Employee</div>

              <div className="jumbo-dir mt-2">
                Payroll <span className="special-jumbo-text"> &gt; People</span>
              </div>
            </div>
          </div>

          <div className="mx-5 my-2 invite-employee-dates-label text-md">
            Start Date
          </div>
          <div className="invite-employee-dates flex gap-3 mx-5 mt-3">
            <div className="invite-employee-employe">
              <input type="number" placeholder="Day" />
            </div>
            <div className="invite-employee-employe">
              <input type="number" placeholder="Month" />
            </div>
            <div className="invite-employee-employe">
              <input type="number" placeholder="YYYY" />
            </div>
          </div>

          <div className="invite-employee-grid grid grid-cols-2 gap-5 add-ann-form mx-5 mt-3">
            <div>
              <div>
                {" "}
                <label>First Name *</label>{" "}
              </div>
              <div>
                {" "}
                <input type="text" placeholder="First Name" />{" "}
              </div>
              <div className="mt-2">
                {" "}
                <label>Job Title *</label>{" "}
              </div>
              <div>
                {" "}
                <select>
                  <option value="" selected disabled>
                    Job Title
                  </option>
                </select>{" "}
              </div>
            </div>
            <div>
              <div>
                {" "}
                <label>Last Name *</label>{" "}
              </div>
              <div>
                {" "}
                <input type="text" placeholder="Last Name" />{" "}
              </div>
              <div className="mt-2">
                {" "}
                <label>Email Address *</label>{" "}
              </div>
              <div>
                {" "}
                <input
                  type="email"
                  placeholder="Email Address"
                  className="invite-employee-email"
                />{" "}
              </div>
            </div>
          </div>

          <div className="mx-5 mt-5 invite-employee-text text-sm">
            Send an invitation to your employee so they can enter their personal
            tax and bank account details on their own
          </div>
          <div className="mx-5 mt-3 add-ann-form">
            <div className="my-2">
              <label>This employee will appear on the:</label>
            </div>
            <div className="flex gap-8">
              <div className="flex gap-2 items-center">
                <div>
                  {" "}
                  <input type="checkbox" />{" "}
                </div>
                <div className="invite-emp-check-text"> Paypal and roster </div>
              </div>
              <div className="flex gap-2 items-center">
                <div>
                  {" "}
                  <input type="checkbox" />{" "}
                </div>
                <div className="invite-emp-check-text">
                  {" "}
                  Roster only not paypal{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-5 w-full">
            <div className="flex gap-2 justify-center items-center w-full">
              <button className="ad-manualy-btn">Add Details Manualy</button>
              <button className="invite-emp-button">Invite Employee</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InviteEmployee;
