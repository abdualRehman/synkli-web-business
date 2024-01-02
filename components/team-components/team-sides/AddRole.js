import { motion } from "framer-motion";
import "./css/teamDetails.css";
const AddRole = ({ toggleAddRole }) => {
  return (
    <div className="add-p-side grid grid-cols-6 text-black">
      <div className="md:col-span-4 hidden md:block left-side"></div>
      <div className="right-side col-span-6 md:col-span-2">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleAddRole}
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
              <div className="title">Add Role</div>

              <div className="jumbo-dir mt-2">
                Setting &gt; Team{" "}
                <span className="special-jumbo-text"> &gt; Add Role</span>
              </div>
            </div>
          </div>

          <div className="px-5 mt-5">
            <div className="add-role-username">User Name</div>
            <div className="add-role-name mt-2"> name - name</div>
          </div>

          <div>
            <div className="add-service-form">
              <div className="service-form  pl-5">
                <div>
                  <div className="flex gap-5  items-center add-role-check mt-3">
                    <div className="flex items-center">
                      <input type="checkbox" name="" id="" />
                    </div>
                    <div>Services</div>
                  </div>

                  <div className="team-line mr-5"></div>
                </div>

                <div>
                  <div className="flex gap-5  items-center add-role-check ">
                    <div className="flex items-center">
                      <input type="checkbox" name="" id="" />
                    </div>
                    <div>Book Keeping</div>
                  </div>

                  <div className="team-line mr-5"></div>
                </div>

                <div>
                  <div className="flex gap-5  items-center add-role-check ">
                    <div className="flex items-center">
                      <input type="checkbox" name="" id="" />
                    </div>
                    <div>Notes</div>
                  </div>

                  <div className="team-line mr-5"></div>
                </div>

                <div>
                  <div className="flex gap-5  items-center add-role-check ">
                    <div className="flex items-center">
                      <input type="checkbox" name="" id="" />
                    </div>
                    <div>Admin</div>
                  </div>

                  <div className="team-line mr-5"></div>
                </div>

                <div>
                  <div className="flex gap-5  items-center add-role-check ">
                    <div className="flex items-center">
                      <input type="checkbox" name="" id="" />
                    </div>
                    <div>Appointments</div>
                  </div>

                  <div className="team-line mr-5"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="add-service-bottom">
            <button className="add-btn px-10 py-2 cursor-pointer add-role-btn text-white rounded-lg">
              Group Role
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default AddRole;
